import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from '../../../service/message/message.service';
import { UserService } from '../../../service/user/user.service';
import { RoleService } from '../../../service/role/role.service';
import { Role } from '../../../model/role';
@Component({
  selector: 'app-registar-user',
  templateUrl: './registar-user.component.html',
  styleUrls: ['./registar-user.component.css']
})
export class RegistarUserComponent implements OnInit {

  user = {name: "", email: "", phoneNumber: "",  password:"", roleId:0}
  roles: Role[] = [];

  constructor(
    private location: Location,
    private userService: UserService,
    private roleService : RoleService
  ) { 
    this.roleService.getAllRoles().subscribe(roles => this.roles = roles);
    console.log(this.roles);
  }

  ngOnInit(): void {
  }

  criarUser() {
    let errorOrSuccess: any = this.userService.criarUser(this.user);
    errorOrSuccess.subscribe(
      (data: any) => {
        alert("User criado");
      },

      (error: any) => {
        alert(error.error);
      }
    );

    return errorOrSuccess;
  }

  goBack(): void {
    this.location.back();
  }
}