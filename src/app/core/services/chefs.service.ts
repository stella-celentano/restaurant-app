import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http"
import { Observable } from "rxjs"
import { Chef } from "./../models/chef.model"
import { API_URL } from "./../api"

@Injectable({
  providedIn: 'root'
})
export class ChefsService {

  constructor(private http: HttpClient) { }

  findAllChefs(): Observable<HttpResponse<Chef[]>> {
    return this.http.get<Chef[]>(`${API_URL}/chef/getAllChefs`, { observe: 'response' })
  }

  findChefByName(chefName: String): Observable<HttpResponse<Chef>> {
    return this.http.get<Chef>(`${API_URL}/chef/getOne/${chefName}`, { observe: 'response' })
  }

  createNewChef(body: Chef): Observable<HttpResponse<Chef>> {
    return this.http.post<Chef>(`${API_URL}/chef/createChef`, body, { observe: 'response' })
  }

  validatorUniqueChefName(chefName: string) {
    let myParams = new HttpParams()
    myParams = myParams.append('nome', chefName)
    return this.http.get<any>(`${API_URL}/chef/validarNomechef`, { params: myParams })
  }

  updateChefById(chefID: String, body: Chef): Observable<HttpResponse<Chef>> {
    return this.http.put<Chef>(`${API_URL}/chef/updateChef/${chefID}`, body, { observe: 'response' })
  }

  deleteChefById(chefID: String): Observable<HttpResponse<Chef>> {
    return this.http.delete<Chef>(`${API_URL}/chef/deleteChef/${chefID}`, { observe: 'response' })
  }
}
