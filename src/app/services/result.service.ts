import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiPath } from '../utils/api-path';
import Result from '../interfaces/result';
import { ResultResponse } from '../interfaces/result-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private http: HttpClient) { }

  getAll(page: number, size: number): Observable<ResultResponse[]> {
    return this.http.get<ResultResponse[]>(environment.apiUrl + ApiPath.RESULTS, { params: { page: page, size: size } });
  }

  save(result: Result) {
    return this.http.post(environment.apiUrl + ApiPath.RESULTS, result);
  }
  
}
