import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://3.133.150.117:9525/api';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/customers`);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/customers/${id}`);
  }
}
