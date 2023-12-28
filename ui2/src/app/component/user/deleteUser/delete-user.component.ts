import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from '../../../service/message/message.service';
import { UserService } from '../../../service/user/user.service';
import { RoleService } from '../../../service/role/role.service';
import { Role } from '../../../model/role';
@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  constructor(
    private location: Location,
    private userService: UserService,
  ) { 
  }

  ngOnInit(): void {
  }

  deleteUser() {
    let errorOrSuccess: any = this.userService.deleteUser();
    errorOrSuccess.subscribe(
      (data: any) => {
        alert("User eliminado");
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