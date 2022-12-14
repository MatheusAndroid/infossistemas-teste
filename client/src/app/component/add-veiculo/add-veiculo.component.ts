import { Component, OnInit } from '@angular/core';
import { Veiculo } from './../../models/Veiculo';
import { VeiculoService } from './../../services/veiculo.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'add-veiculo',
  templateUrl: './add-veiculo.component.html',
  styleUrls: ['./add-veiculo.component.scss']
})
export class AddVeiculoComponent implements OnInit {
  veiculo: Veiculo = new Veiculo({});
  snackbarConfig :MatSnackBarConfig = {
    horizontalPosition: 'right',
    verticalPosition: 'top',
    duration: 3000
 }

  constructor(
    private veiculoService: VeiculoService,
    private snackbar: MatSnackBar,
    private route : Router 
  ) { }

  ngOnInit(): void {

  }
  sendDevice() {
    if (!this.veiculo.marca) {
      this.snackbar.open("Preencha a marca do veículo", '', this.snackbarConfig)
      return;
     }
    if (!this.veiculo.modelo) {
      this.snackbar.open("Preencha o modelo do veículo", '', this.snackbarConfig)
      return;
    }
    if (!this.veiculo.ano) {
      this.snackbar.open("Preencha o ano do veículo", '', this.snackbarConfig)
      return;
    }

    this.veiculoService.addVeiculo(this.veiculo).subscribe(
      (success) => {
        this.snackbar.open("Veículo Registrado", '', this.snackbarConfig);
        this.route.navigate(['home'])
      },
      (error) => {
        this.snackbar.open("Erro ao registrar veículo",'', this.snackbarConfig)
      }
    );
  }
}
