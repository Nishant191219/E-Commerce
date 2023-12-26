import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from 'src/datatype';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  pProducts:undefined|product[];
  constructor(private product:ProductService){}
  ngOnInit(){
    this.product.popularProducts().subscribe((result)=>{
      console.log(result);
      this.pProducts=result;
    })
  }
}
