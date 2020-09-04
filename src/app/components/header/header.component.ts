import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UsersService } from './../../services/users.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  email = '';
  message = '';
  constructor(private router:Router, private userService:UsersService) { }

  ngOnInit(): void {
  }


  logut() {
      this.userService.logut().subscribe(
        (result:any) => {
            localStorage.clear();
            this.router.navigate(['/login']);
        }
      );
  }

}
