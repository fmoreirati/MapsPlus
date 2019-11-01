import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProdutoPage } from './add-produto.page';

describe('AddProdutoPage', () => {
  let component: AddProdutoPage;
  let fixture: ComponentFixture<AddProdutoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProdutoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProdutoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
