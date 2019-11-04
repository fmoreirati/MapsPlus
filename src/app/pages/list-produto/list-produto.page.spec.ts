import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProdutoPage } from './list-produto.page';

describe('ListProdutoPage', () => {
  let component: ListProdutoPage;
  let fixture: ComponentFixture<ListProdutoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProdutoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProdutoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
