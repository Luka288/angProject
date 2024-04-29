import { Component, OnInit, inject } from '@angular/core';
import { FetchProductsService } from '../shared/services/fetch-products.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../shared/interfaces';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export default class ProductPageComponent implements OnInit{

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = this.route.snapshot.params['id'];
      this.productLoad(id);
    })
  }

  readonly productInf: Product[] = []

  constructor(private route: ActivatedRoute, private productFetch: FetchProductsService){
  }

  productLoad(_id: String){
    this.productFetch.loadProductByID(_id).subscribe((prod) => {
      this.productInf.push(prod)
      console.log(this.productInf)
    })
  }
}