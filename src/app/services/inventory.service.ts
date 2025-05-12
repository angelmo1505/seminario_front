import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private apiUrl = 'http://3.133.150.117:9525/api';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/inventory`);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/inventory/${id}`);
  }

  create(inventory: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/inventory`, inventory);
  }

  update(id: any, inventory: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/inventory/${id}`, inventory);
  }

  search(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/inventory/search?searchTerm=${query}`);
  }

  searchByName(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/searchName?name=${name}`);
  }
}
