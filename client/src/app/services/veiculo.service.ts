import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Veiculo } from '../models/Veiculo';
import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  url = environment.endpoint;
  path = 'veiculos';
  uri = `${this.url}${this.path}`;

  veiculoToEdit?: Veiculo

  constructor(
    private httpClient: HttpClient,
  ) { }
  
  getVeiculos(): Observable<any>{
    return this.httpClient.get(this.uri);
  }
  getVeiculo(id: number) {
    return this.httpClient.get(this.uri+'/'+id);
  }
  addVeiculo(body: any) {
    return this.httpClient.post(this.uri, body);
  }
  updateVeiculo(body: any, id: any) {
    return this.httpClient.put(`${this.uri}/${id}`, body);
  }
  deleteVeiculo(id: any) {
    return this.httpClient.delete(`${this.uri}/${id}`); 
  }

  setVeiculoToEdit(v: Veiculo) {
    this.veiculoToEdit = v;
  }
  getVeiculoToEdit(): Veiculo{
    return this.veiculoToEdit!;
  }
}
