import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { VeiculoService } from './../../services/veiculo.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Veiculo, VeiculoI } from './../../models/Veiculo';
import { MatCard } from '@angular/material/card';
import { Router } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';
 
@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.component.html',
  styleUrls: ['./veiculos.component.scss']
})
export class VeiculosComponent implements OnInit {

  veiculos: Array<Veiculo> = []; 
  showModal = false;
  snackbarConfig :MatSnackBarConfig = {
    horizontalPosition: 'right',
    verticalPosition: 'top',
    duration: 3000
 }
  constructor(
    private veiculoService: VeiculoService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getVeiculos()
  }

  getVeiculos() {
    this.veiculoService.getVeiculos().pipe(first()).subscribe((veiculos: Array<VeiculoI>) => {
      this.veiculos = [];
      console.log('resultado',veiculos)
      veiculos.forEach(veiculo => {
        this.veiculos.push(new Veiculo(veiculo))
      })
    },
      (erro) => {
        console.error(erro);
      this.snackbar.open("Erro ao buscar veículos.", '', this.snackbarConfig) 
    }
    )
  }

  deleteVeiculo(id: number) {
    this.veiculoService.deleteVeiculo(id).pipe(first()).subscribe(
      (result)=>{
        this.snackbar.open("Veículo excluído", '', this.snackbarConfig)
      },
      (error) => {
        this.snackbar.open("Erro ao excluir Veículo", '', this.snackbarConfig);
        console.error("Erro", error);
      }
    )
    this.getVeiculos()
  }
  editVeiculo(veiculo: Veiculo) {
    this.veiculoService.setVeiculoToEdit(veiculo);
    this.changePage('edit');
  }

  changePage(page: string) {
    this.router.navigate([page]);
    
  }
}
