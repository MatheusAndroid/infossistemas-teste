import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  url = environment.endpoint;
  path = 'veiculos';
  uri = `${this.url}${this.path}`

  constructor(
    private httpClient: HttpClient,
  ) { }
  
  getVeiculos(): Observable<any>{
    return this.httpClient.get(this.uri);
  }
  getVeiculo() {
    
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
}
