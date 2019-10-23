import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

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
        'webClientId': '186913403094-50qktnjbemgnu2sa27u69uujps5ljvtu.apps.googleusercontent.com'
        , // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
        'offline': true // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server    
      }).then(res => {
        const googleCredential = firebase.auth.GoogleAuthProvider
          .credential(res.idToken);
        firebase.auth().signInWithCredential(googleCredential)
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

  /*  
     async loginGooglePlus() {
       this.googlePlus.login({
          'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
          'webClientId': 'webClientId.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
          'offline': true // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
        })
          .then(
            user => {
              console.log(user)
            },
            err => {
              console.log(err)
            }
          ); 
     }
   
     loginGoogleWEB() {
       this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
         .then(
           res => {
             console.log(res);
             //this.uid = res.user.uid;
             this.router.navigate(['/']);
           }
         );
     }
   
     //----------------------------------------------
     googleLogin() {
       if (this.platform.is('cordova')) {
         this.nativeGoogleLogin();
       } else {
         this.webGoogleLogin();
       }
     }
   
     async nativeGoogleLogin(): Promise<any> {
       try {
         const googlePlus = await this.googlePlus.login({
           'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
           'webClientId': 'webClientId.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
           'offline': true // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
         })
         return await this.afAuth.auth.signInWithCredential(
           firebase.auth.GoogleAuthProvider.credential(googlePlus.idToken)
         )
       } catch (err) {
         console.log(err);
       }
     }
   
   
     async webGoogleLogin(): Promise<void> {
       try {
         const provider = new firebase.auth.GoogleAuthProvider();
         const credencial = await this.afAuth.auth.signInWithPopup(provider);
       } catch (err) {
         console.log(err);
       }
     }
   
     signOut() {
       this.afAuth.auth.signOut();
       if (this.platform.is('cordova')) {
         this.googlePlus.logout();
       }
     }
     googleLogin(): Promise<any> {
  return new Promise((resolve, reject) => { 
      this.googlePlus.login({
        'webClientId': '5351366995-npuh9q89gaoiagoc4jssqck26gorj7hh.apps.googleusercontent.com',
        'offline': true
      }).then( res => {
              const googleCredential = firebase.auth.GoogleAuthProvider
                  .credential(res.idToken);
              firebase.auth().signInWithCredential(googleCredential)
            .then( response => {
                console.log("Firebase success: " + JSON.stringify(response));
                resolve(response)
            });
      }, err => {
          console.error("Error: ", err)
          reject(err);
      });
    });
    }
    */