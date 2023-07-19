import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiPath } from '../utils/api-path';
import ResultRequest from '../interfaces/result-request';
import { ResultResponse } from '../interfaces/result-response';
import { Observable, retry } from 'rxjs';
import { Page } from '../interfaces/page';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private http: HttpClient) { }

  getAll(page: number, size: number): Observable<Page<ResultResponse>> {
    return this.http.get<Page<ResultResponse>>(environment.apiUrl + ApiPath.RESULTS, { params: { page: page, size: size } }).pipe(retry(3));
  }

  save(result: ResultRequest) {
    return this.http.post(environment.apiUrl + ApiPath.RESULTS, result);
  }
  
}
