import { Component, OnInit } from '@angular/core';
import { Veiculo } from './../../models/Veiculo';
import { VeiculoService } from './../../services/veiculo.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

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
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {

  }
  sendDevice() {
    this.veiculoService.addVeiculo(this.veiculo).subscribe(
      (success) => {
        this.snackbar.open("Veículo Registrado", '',this.snackbarConfig)
      },
      (error) => {
        this.snackbar.open("Erro ao registrar veículo",'', this.snackbarConfig)
      }
    );
  }
}
