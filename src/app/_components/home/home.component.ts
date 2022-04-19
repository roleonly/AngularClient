import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/_services';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  
})
export class HomeComponent implements OnInit {
  loginButton:any;
  registerButton:any;
  LoginForm:any;
  RegisterForm:any
  logoutButton:any;

  constructor(
    public _auth : AuthenticationService,
    private router : Router,
  ) { }

  ngOnInit(): void {
  
   this.loginButton=document.getElementById("loginButton");
   this.registerButton=document.getElementById("registerButton");
    this.LoginForm=document.getElementById("LoginForm");
    this.RegisterForm=document.getElementById("RegisterForm");
    this.logoutButton=document.getElementById("logoutButton");
   

  }

 


  LoginButtonPressed()
  {
    this.LoginForm.classList.remove('hide');
    this.RegisterForm.classList.add('hide');
    this.registerButton.classList.remove('active')
    this.loginButton.classList.add('active')
   
  }
 RegisterButtonPressed()
  {
    this.LoginForm.classList.add('hide');
    this.RegisterForm.classList.remove('hide');
    this.registerButton.classList.add('active')
    this.loginButton.classList.remove('active')
    
  }

  LogoutButtonPressed()
  {
    this._auth.logout();
  }

  Menu1Click()
  {
    this.router.navigate(['/ex_dic_pre']);
  }
  Menu2Click()
  {this.router.navigate(['/ex_dic_map']);}
  Menu3Click()
  {this.router.navigate(['/raster']);}


}
