import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from 'src/app/model/produto';

@Component({
  selector: 'app-list-produto',
  templateUrl: './list-produto.page.html',
  styleUrls: ['./list-produto.page.scss'],
})
export class ListProdutoPage implements OnInit {

  protected produtos: Produto[];

  constructor(
    protected produtoService: ProdutoService
  ) { }

  ngOnInit() {
    this.produtoService.getAll().subscribe(
      res => {
        this.produtos = res
      }
    )
  }

}
