import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

declare var $: any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  error = '';
  success = '';
  signup:any = {
        name:'',
          dni:'',
        phone:'',
        email:'',
     password:'',
     password_confirm:'',
  };
  loading = false;
  constructor(
    private usersService:UsersService,
    ) { }

  ngOnInit(): void {
  }

  signUp(){
    this.loading = true;
    this.usersService.signup(this.signup)
    .subscribe(
      (res:any)=>{
        this.loading = false;
        this.success = res.message;
        $('#modal').modal('show');
      },
      (e:any)=>{
        this.loading = false;
        this.error = e.error.errors[0];   
        this.hideAlert(); 
      }
    );
  }

  hideAlert(){
    setTimeout(()=>{  this.error = ''; }, 4000);
  }

}
