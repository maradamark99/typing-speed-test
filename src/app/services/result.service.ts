import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiPath } from '../utils/api-path';
import Result from '../interfaces/result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private http: HttpClient) { }

  getAll(page: number, amount: number) {
    return this.http.get(environment.apiUrl + ApiPath.RESULTS, { params: { page: page, amount: amount } });
  }

  save(result: Result) {
    return this.http.post(environment.apiUrl + ApiPath.RESULTS, result);
  }
  
}
