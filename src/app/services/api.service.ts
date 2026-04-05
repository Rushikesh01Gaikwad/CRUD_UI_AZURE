import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // GET
  get(endpoint: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${endpoint}`);
  }

  // GET BY ID
  getById(endpoint: string, id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${endpoint}/${id}`);
  }

  // POST
  post(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${endpoint}`, data);
  }

  // PUT
  put(endpoint: string, id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${endpoint}/${id}`, data);
  }

  // DELETE
  delete(endpoint: string, id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${endpoint}/${id}`);
  }
}