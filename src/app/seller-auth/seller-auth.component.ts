import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {
   showLogin=false;
   authError:string="";
   constructor(private seller:SellerService, private router:Router){}
   ngOnInit():void{
    this.seller.reloadSeller();
   }
   signUp(data:object):void{
     //console.log(data);

    //  this.seller.userSignUp(data).subscribe((result)=>{
    //   //console.warn(result);
    //   if(result){
    //     this.router.navigate(['seller-home']);
    //   }
    //  })

    //auth guard
     this.seller.userSignUp(data);
   }
   login(data:any){
    //console.log(data);
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError)=>{
         if(isError){
             this.authError="Email or password is not correct";
         }
    })
   }
   openLogin(){
     this.showLogin=true;
   }
   openSignUp(){
    this.showLogin=false;
  }
}
