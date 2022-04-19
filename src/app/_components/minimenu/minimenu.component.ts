import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-minimenu',
  templateUrl: './minimenu.component.html',
  styleUrls: ['./minimenu.component.css']
})
export class MinimenuComponent implements OnInit {
  logoutButton:any;
  homeButton:any;
  constructor(
    
    public _auth : AuthenticationService,
    private router : Router,
    ) { }

  ngOnInit(): void {
    this.logoutButton=document.getElementById("logoutButton");
    this.logoutButton=document.getElementById("logoutButton");

  }






  LogoutButtonPressed()
  {
    this._auth.logout();
    this.router.navigate(['/home']);
  }
HomeButtonPressed()
{

  this.router.navigate(['/home']);
}

}
