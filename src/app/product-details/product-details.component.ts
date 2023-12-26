import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from 'src/datatype';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  productData: undefined|product;
  productQuantity:number=0;
  removeItem=false;
  constructor(private activeRoute:ActivatedRoute,private product:ProductService){}
  ngOnInit(): void {
     let productId=this.activeRoute.snapshot.paramMap.get('productId');
     console.log(productId);
     productId && this.product.getProduct(productId).subscribe((result)=>{
      console.log(result);
         this.productData=result;
     })
     //below code is for remove items from cart
     let cartData=localStorage.getItem('localCart');
     if(productId && cartData){
      let items=JSON.parse(cartData);
      items=items.filter((item:product)=>{productId==item.id.toString()})
      if(items.length){//items.length >0
          this.removeItem=true;
      }
      else{//items are not present in cart
        this.removeItem=false
      }
     }
  }
  handleQuantity(val:string){
    if(this.productQuantity<20 && val==='plus'){
      this.productQuantity=this.productQuantity+1;
    }else if(this.productQuantity>0 && val==='min'){
      this.productQuantity=this.productQuantity-1;
    }
  }
  addTocart(){
    if(this.productData){
      this.productData.quantity=this.productQuantity;
      //quantity property is added in product of datatype to count number
      //console.log(this.productData)
      if(!localStorage.getItem('user')){
        this.product.localAddToCart(this.productData);
        this.removeItem=true;
      }
    }
  }
  removeToCart(productId:number){
    this.product.removeItemFromCart(productId);
    //below is for toggle addToCart and removeToCard functionality
    this.removeItem=false;
  }

}
