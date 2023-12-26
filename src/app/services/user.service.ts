import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { login, signUp } from 'src/datatype';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  invalidUserAuth=new EventEmitter<boolean>(false);
  constructor(private http:HttpClient,private router:Router) { }
  userSignUp(data:signUp){
     //console.warn(data);
     this.http.post("http://localhost:3000/users",data,{observe:'response'}).subscribe((result)=>{
      console.warn(result);
      if(result){
        localStorage.setItem('user',JSON.stringify(result.body));
        this.router.navigate(['/'])
      }
      
     })
     
  }
  userLogin(data:login){
     this.http.get<signUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,{observe:'response'}).subscribe((result)=>{
      console.warn(result);
      if(result && result.body?.length){
        this.invalidUserAuth.emit(false);
        //?.length is used to not login with invalid details
        localStorage.setItem('user',JSON.stringify(result.body[0]));
        this.router.navigate(['/']);
      }
      else{
         this.invalidUserAuth.emit(true);
      }
     })
  }
  userReloader(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/']);
    }
  }
}
