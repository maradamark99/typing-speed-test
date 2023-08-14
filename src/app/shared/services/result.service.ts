import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiPath } from '../utils/api-path';
import { Observable, retry } from 'rxjs';
import { Page } from '../interfaces/page';
import { PageOptions } from '../interfaces/page-options';
import PaginationUtil from '../utils/pagination-util';
import { ResultResponse } from '../types/result-response';
import { ResultRequest } from '../types/result-request';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private http: HttpClient) { }

  getAll(pageOptions: Partial<PageOptions>): Observable<Page<ResultResponse>> {
    const params = PaginationUtil.processPageOptionParams(pageOptions);
    return this.http.get<Page<ResultResponse>>(environment.apiUrl + ApiPath.RESULTS, { params }).pipe(retry(3));
  }

  save(result: ResultRequest) {
    return this.http.post(environment.apiUrl + ApiPath.RESULTS, result);
  }
  
}
