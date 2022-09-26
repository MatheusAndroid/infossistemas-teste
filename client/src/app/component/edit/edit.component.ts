import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Veiculo } from 'src/app/models/Veiculo';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  
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
    this.veiculo = this.veiculoService.getVeiculoToEdit();
    if (!this.veiculo) {
      this.snackbar.open("Erro ao tentar editar Veículo", '', this.snackbarConfig)
      this.route.navigate(['home'])
    }
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

    this.veiculoService.updateVeiculo(this.veiculo, this.veiculo.id).subscribe(
      (success) => {
        this.snackbar.open("Veículo Atualizado", '', this.snackbarConfig);
        this.route.navigate(['home'])
      },
      (error) => {
        this.snackbar.open("Erro ao atualizar veículo",'', this.snackbarConfig)
      }
    );
  }

}
