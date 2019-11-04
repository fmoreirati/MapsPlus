import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Produto } from '../model/produto';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    protected firedb: AngularFireDatabase
  ) { }

  save(produto) {
    return this.firedb.list("produtos").push(produto)
  }

  getAll() {
    return this.firedb.list<Produto>("produtos").snapshotChanges()
      .pipe(
        map(
          dados =>
            dados.map(d => ({ key: d.payload.key, ...d.payload.val() }))
        )
      );
  }

  get(id) {
    return this.firedb.object<Produto>("produtos/" + id).valueChanges();
  }

  remover(id) {
    return this.firedb.object("produtos/" + id).remove();
  }

  update(produto, id) {
    return this.firedb.object("produtos/" + id).update(produto)
  }

}
