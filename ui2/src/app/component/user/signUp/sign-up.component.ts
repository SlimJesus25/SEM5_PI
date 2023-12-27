import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from '../../../service/message/message.service';
import { UserService } from '../../../service/user/user.service';
import { RoleService } from '../../../service/role/role.service';
import { Role } from '../../../model/role';
import { PedidoService } from '../../../service/pedido/pedido.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  utente = {name: "", email: "", phoneNumber: "", nif: "", password:""}

  constructor(
    private location: Location,
    private pedidoService: PedidoService,
  ) { 
  }

  ngOnInit(): void {
  }

  criarUtente() {
    let errorOrSuccess: any = this.pedidoService.criarPedido(this.utente);
    errorOrSuccess.subscribe(
      (data: any) => {
        alert("Pedido efetuado com sucesso");
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