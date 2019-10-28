import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { MensagemService } from 'src/app/services/mensagem.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  protected log: string;
  protected pws: string;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    protected msg: MensagemService,
    protected googlePlus: GooglePlus,
    private platform: Platform
  ) {
  }

  ngOnInit() {
  }

  onSubmit(form) {
    this.loginEmail(this.log, this.pws);
  }

  loginEmail(email, pws) {
    this.msg.loading()
    this.afAuth.auth.signInWithEmailAndPassword(email, pws).then(
      res => {
        this.msg.dismiss();
        this.router.navigate(['']);
      },
      erro => {
        this.msg.dismiss();
        this.msg.presentAlert("Ops!", "Usuario não foi localizado!\nTente novamento.");
        //this.log = null;
        this.pws = null;
      })
  }

  loginGoogle() {
    if (!this.platform.is("cordova")) {
      this.loginGoogleWeb()
    } else {
      this.loginGooglePlus()
    }
  }

  //Login Google WEB
  async loginGoogleWeb() {
    await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(
        res => {
          console.log(res);
          this.router.navigate(['']);
        },
        err => console.log(err)
      );
  }

  //Login Google Plus
  async loginGooglePlus() {
    return new Promise((resolve, reject) => {
      this.googlePlus.login({
        'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
        'webClientId': ''
        , // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
        'offline': true // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server    
      }).then(res => {
        const googleCredential = auth.GoogleAuthProvider.credential(res.idToken);
        auth().signInWithCredential(googleCredential)
          .then(response => {
            console.log("Firebase success: " + JSON.stringify(response));
            resolve(response)
            this.router.navigate([""])
          });
      }, err => {
        console.error("Error: ", err)
        reject(err);
      });
    });
  }

  //Logout
  signOut() {
    this.afAuth.auth.signOut();
    if (!this.platform.is('cordova')) {
      this.googlePlus.logout();
    }
  }
}
