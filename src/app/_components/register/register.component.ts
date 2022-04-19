import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models';
import { AuthenticationService } from 'src/app/_services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  RegisterForm : FormGroup;
  returnUrl : string;
  constructor(
    private fb : FormBuilder,
    private route: ActivatedRoute,
    private router : Router,
    private _auth : AuthenticationService
    ) {}

    ngOnInit(): void {
      this.createForm();
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
get f(){
    return this.RegisterForm.value;
  }

  createForm(){
    this.RegisterForm = this.fb.group({
      username : ['',[Validators.required]],
      password : ['',[Validators.required]]
    })
  }

  async submit(){
    const {username,password} = this.f;
    this._auth.Register(username,password).subscribe(
      ()=> {this.router.navigate(['/home']);
    
    
  }
    );
  }
}