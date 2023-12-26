import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { login, signUp } from 'src/datatype';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit{
  showLogin:boolean=true;
  authError:string='';
  ngOnInit(){
    this.user.userReloader()
  }
  constructor(private user:UserService){}
  signUp(data:signUp){
    //console.warn(data);
    this.user.userSignUp(data);
    
  }
  login(data:login){
    //console.log(data);
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result)=>{
      if(result){
         this.authError="Please Enter a valid Credential"
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
