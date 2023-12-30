import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../service/user/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  utente = { name: "", phoneNumber: "", nif: "", password: ""}
  data : string [] = [];

  constructor(
    private location: Location,
    private userService: UserService,
  ) {
  }
  
  ngOnInit(): void {
  }

  getUserInfo() : void {
    let userinfo : any = this.userService.getUserInfo();
    userinfo.subscribe(
      (data: any) => {
          this.data[0] = data.name;
          this.data[1] = data.phoneNumber;
          this.data[2] = data.nif;
          this.data[3] = data.password;
      },
      (error: any) => {
        alert(error.error);
      }
    );
  }

  updateUser() {
    let errorOrSuccess: any = this.userService.atualizarUser(this.utente);
    errorOrSuccess.subscribe(
      (data: any) => {
        alert("User atualizado com sucesso");
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