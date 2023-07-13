import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiPath } from '../utils/api-path';
import Result from '../interfaces/result';
import { ResultResponse } from '../interfaces/result-response';
import { Observable } from 'rxjs';
import { PageResponse } from '../interfaces/page-response';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private http: HttpClient) { }

  getAll(page: number, size: number): Observable<PageResponse<ResultResponse>> {
    return this.http.get<PageResponse<ResultResponse>>(environment.apiUrl + ApiPath.RESULTS, { params: { page: page, size: size } });
  }

  save(result: Result) {
    return this.http.post(environment.apiUrl + ApiPath.RESULTS, result);
  }
  
}
