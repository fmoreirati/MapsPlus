import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { Usuario } from '../model/usuario';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  constructor(
    protected firedb: AngularFirestore,
    protected afAuth: AngularFireAuth
  ) { }

  save(usuario) {
    return this.afAuth.auth.createUserWithEmailAndPassword(usuario.email, usuario.pws)
      .then(
        res => {
          usuario.email = null;
          usuario.pws = null;
          return this.firedb.collection("usuarios").doc(res.user.uid).set({
            //uid: usuario.uid,
            nome: usuario.nome,
            //email:usuario.email,
            //pws:usuario.pws,
            tel: usuario.tel,
            ativo: usuario.ativo,
            foto: usuario.foto,
            galeria: usuario.galeria,
            lat: usuario.lat,
            lng: usuario.lng
          }).catch(
            ()=> this.afAuth.auth.currentUser.delete()
          );
        },
        erro => {
          console.log(erro);
          this.afAuth.auth.currentUser.delete();
        }
      )
  }

  getAll() {
    return this.firedb.collection<Usuario>("usuarios").snapshotChanges()
      .pipe(
        map(
          dados =>
            dados.map(d => ({ key: d.payload.doc.id, ...d.payload.doc.data() }))
        )
      );
  }

  get(id) {
    return this.firedb.collection("usuarios").doc<Usuario>(id).valueChanges();
  }

  remover(id) {
    return this.firedb.collection("usuarios").doc(id).delete();
  }

  update(usuario, id) {
    return this.firedb.collection("usuarios").doc(id).update(usuario)
  }

  getCurenteUser() {
    return this.afAuth.auth.currentUser
  }

}