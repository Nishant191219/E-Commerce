import { Component, OnInit } from '@angular/core';
//imported router for menuType functionality
import {Router} from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from 'src/datatype';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  menuType:string='default';
  sellerName:string='';
  searchResult:undefined | product[];
  userName:string='';
  cartItems=0;
  constructor(private router:Router,private product:ProductService){}
  ngOnInit(): void {
    this.router.events.subscribe((val:any)=>{
      //console.log(val.url);
      // if(val.url){
      //   if(localStorage.getItem('seller') && val.url.includes('seller')){
      //     console.log("you are in seller area")
      //     this.menuType='seller';

      //     //add logic to show seller Name
      //     if(localStorage.getItem('seller')){
      //       let sellerStore=localStorage.getItem('seller');
      //       let sellerData=sellerStore && JSON.parse(sellerStore)[0];
      //       this.sellerName=sellerData.name
      //     }

      //   }
      //   //addd logic to show user name
      //   else if(localStorage.getItem('user') && val.url.includes('user')){
      //     let userStore=localStorage.getItem('user');
      //     let userData= userStore && JSON.parse(userStore)[0];
      //     this.userName=userData.name;
      //     this.menuType='user';
      //     console.log("inside area");
      //   }
      //   else {
      //     console.log("Outside area");
      //     this.menuType='default';
      //   }
      // }
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
         let sellerStore=localStorage.getItem('seller');
         let sellerData =sellerStore && JSON.parse(sellerStore)[0];
         this.sellerName=sellerData.name;
          this.menuType = 'seller';
        }
        else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName= userData.name;
          this.menuType='user';
          //this.product.getCartList(userData.id);
        }
         else {
          this.menuType = 'default';
        }
      }
    })
    //below is to count no of items in cart
    let cartData2=localStorage.getItem('localCart');
    if(cartData2){
      this.cartItems=JSON.parse(cartData2).length;
    }
    //below is for counting no of items without refreshing the browser
    this.product.cartData1.subscribe((item)=>{
      this.cartItems=item.length
    })
  }
  logout(){
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }
  searchProduct(query:KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      //console.log(element.value) eg=mobiles
      this.product.searchProduct(element.value).subscribe((result)=>{
        console.log(result);
        if(result.length>5){
          result.length=length
        }
        this.searchResult=result;
        console.log(this.searchResult);
      })
    }
  }
  hideSearch(){
    this.searchResult=undefined;
  }
  submitSearch(val:string){
       console.log(val);
       this.router.navigate([`search/${val}`])
  }
  userLogout(){
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth']);
  }

}


