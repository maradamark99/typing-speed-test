import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiPath } from '../utils/api-path';
import { Difficulty } from '../interfaces/difficulty'

@Injectable({
  providedIn: 'root'
})
export class DifficultyService {

  constructor(private readonly http: HttpClient) { }

  getAll(): Observable<Difficulty[]> {
    return this.http.get<Difficulty[]>(environment.apiUrl + ApiPath.DIFFICULTY);
  }
}
