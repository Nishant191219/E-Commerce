import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { product } from 'src/datatype';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  //below cartData1 is taken without refreshing the browser items should be counted
  cartData1=new EventEmitter<product[]|[]>();
  constructor(private http:HttpClient) { }
  addProduct(data:any){
    //console.warn("service is called");
    return this.http.post("http://localhost:3000/product",data);
  }
  productList(){
    //return this.http.get<any[]>("http://localhost:3000/product");
    //OR
    return this.http.get<product[]>("http://localhost:3000/product");
    //IMP any is written instead of product bz API will return data of type product actually
  }
  deleteProductItem(id:number){
    return this.http.delete(`http://localhost:3000/product/${id}`);
  }
  getProduct(id:string){
    return this.http.get<product>(`http://localhost:3000/product/${id}`);
  }
  updateProduct(product:product){
     return this.http.put<product>(`http://localhost:3000/product/${product.id}`,product);
  }
  popularProducts(){
    return this.http.get<product[]>("http://localhost:3000/product?_limit=5");
  }
  searchProduct(query: string) {
    return this.http.get<product[]>(`http://localhost:3000/product?q=${query}`);
  }
  localAddToCart(data:product){
      let cartData=[];
      let localCart=localStorage.getItem('localCart');
      //if block execute no item is present in localcart
      if(!localCart){
        localStorage.setItem('localCart',JSON.stringify([data]));
      }
      //else block executes when already some item are present in cart
      else {
        //console.warn('else part');
        cartData=JSON.parse(localCart);
        cartData.push(data);
        localStorage.setItem('localCart',JSON.stringify(cartData));
      }
      //below cartData1 is taken without refreshing the browser items should be counted
      this.cartData1.emit(cartData);
      //cartData1 has latest data
  }
  removeItemFromCart(productId:number){
    let cartData=localStorage.getItem('localCart');
    if(cartData){
      let items:product[]=JSON.parse(cartData);
      items=items.filter((item:product)=>productId!==item.id);
      console.warn(items);
      localStorage.setItem('localCart',JSON.stringify(items));
      this.cartData1.emit(items);
    }

  }

}
