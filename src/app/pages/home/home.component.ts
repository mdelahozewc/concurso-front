import { Component, OnInit } from '@angular/core';
import { PeopleService } from './../../services/people.service';
import { UsersService } from './../../services/users.service';
import * as XLSX from 'xlsx'; 
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loading = false;
  person:any = {
    id:'',
    name:'',
    address:'',
    phone:'',
    user_id:''
  };
  title = '';
  error = '';
  success = '';
  rol = null;
  action = '';
 
  data:any =[];
  pages:any = [];
  user:any = {};

  password = '';
  password_confirm = '';

  value = '';

  /*name of the excel-file which will be downloaded. */ 
  fileName= 'HosterGuest.xlsx'; 

  constructor(
    private people:PeopleService,
    private auth:UsersService
    ) { }
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.rol = this.user.roles[0].id;
    if(this.rol == '2'){
      this.person.user_id = this.user.id;
      this.index('1','10', this.person.user_id);
    }else{
      this.indexAll('1','10');
    }
    
  }

  
  add(){
    this.title = 'Nueva pensión';
    this.person.name = '';
    this.person.address ='';
    this.person.phone = '';
    this.action = 'add'; 
    $('#formModal').modal('show');
  }

  edit(obj){
    this.title = 'Editar pensión';
    this.person.id = obj.id;
    this.person.name = obj.name;
    this.person.address = obj.address;
    this.person.phone = obj.phone;
    this.action = 'edit'; 
  }
 
  index(page,per_page,user_id){
    this.loading = true;
    this.people.index(page,per_page,user_id)
    .subscribe(
      (res:any) => {
        this.loading = false;
        this.data = res.data;
        this.indexPages(res.total);
      },
      (e:any) => {
        this.error = e.error.errors[0];
        this.loading = false;
      },
    );
  }
  indexAll(page,per_page){
    this.loading = true;
    this.people.indexAll(page,per_page,this.value)
    .subscribe(
      (res:any) => {
        this.loading = false;
        this.data = res.data;
        this.indexPages(res.total);
      },
      (e:any) => {
        this.error = e.error.errors[0];
        this.loading = false;
      },
    );
  }
  indexPages(total){
    this.pages.length = 0;
    const length = Math.ceil((total/10));
    for (let index = 0; index < length; index++) {
      this.pages.push((index+1)); 
    }
  }
  showPage(page){
    localStorage.setItem('page',page);
    if(this.rol == '2'){
      this.index(page,'10',this.person.user_id);
    }else{
      this.indexAll(page,'10')
    }
    
  }

  store(){
    this.loading = true;
    this.people.store(this.person)
    .subscribe(
      (res:any) => {
        this.loading = false;
        this.success = res.message;
        $('#formModal').modal('hide');
        $('#successModal').modal('show');
        this.index('1','10', this.person.user_id);
      },
      (e:any) => {
        this.error = e.error.errors[0];
        this.hideAlert();
        this.loading = false;
      },
    );
  }
  update(){
    this.loading = true;
    this.people.update(this.person)
    .subscribe(
      (res:any) => {
        this.loading = false;
        this.success = res.message;
        $('#formModal').modal('hide');
        $('#successModal').modal('show');
        this.index('1','10', this.person.user_id);
      },
      (e:any) => {
        this.error = e.error.errors[0];
        this.hideAlert();
        this.loading = false;
      },
    );
  }

  hideAlert(){
    setTimeout(()=>{  this.error = ''; },3000);
  }
  newPassword(){
    this.password = '';
    this.password_confirm = '';
  }
  updatePassword(){
    this.loading = true;
    const obj = {
      id: this.user.id,
      password: this.password,
      password_confirm: this.password_confirm
    };

    this.auth.updatePassword(obj).subscribe(
      (res:any)=>{
        this.loading = false;
        this.success = res.message;
        $('#passwordModal').modal('hide');
        $('#successModal').modal('show');
      },
      (e:any)=>{
        console.log(e);
        this.error = e.status === 401? e.error.error : e.error.errors[0];
        this.hideAlert();
        this.loading = false;
      }
    );
  }

  checkPeople(id,check){
    const obj = {
      id:id,
      check:check
    };
    console.log(obj);
    this.people.checkPeople(obj).subscribe(
      (res:any)=>{
        let page =  localStorage.getItem('page');
        this.indexAll(page,'10');
      }
    );
  }

  search(){
    this.indexAll('1','10');
  }
  onKey(value){
    this.indexAll('1','10'); 
  }
  
  exportexcel(): void 
    {
       /* table id is passed over here */   
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
			
    }
  
  

}
