import { Component, OnInit } from '@angular/core';
import { UsersService } from "../../services/users.service";
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false;
  email = '';
  password = '';
  error = '';
  ruta:boolean = false;
  constructor(private usersService:UsersService, private router:Router) { }

  ngOnInit(): void {
  }

  logIn(){
    this.loading = true;
    this.usersService.login(this.email,this.password)
    .subscribe(
      (result:any) => {
        this.loading = false;
        localStorage.setItem('isLoggedIn','si');
        localStorage.setItem ('token',String(result.token));
        localStorage.setItem('user',JSON.stringify(result.user));
        this.router.navigate(['/home']);
      },
      (e:any) => {
        this.error = e.error.errors[0];
        this.showAlert();
        this.loading = false;
      },
    );
  }

  showAlert(){
    setTimeout(()=>{  this.error = ''; },3000);
  }

}
