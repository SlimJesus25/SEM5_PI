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


  constructor(
    private location: Location,
    private userService: UserService,
  ) {
  }
  
  ngOnInit(): void {
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