import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
declare var $: any;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  loading = false;
  success = '';
  email = '';
  error = '';

  constructor(private usersService:UsersService) { }
  
  ngOnInit(): void {
  }

  forgotPassword(){
    this.loading = true;
    this.usersService.forgotPassword(this.email)
    .subscribe(
      (res:any) => {
        this.loading = false;
        this.success = res.message;
        $('#modal').modal('show');
      },
      (e:any) => {
        this.error = e.error.errors[0];
        this.hideAlert();
        this.loading = false;
      },
    );
  }

  hideAlert(){
    setTimeout(()=>{  this.error = ''; }, 4000);
  }

}
