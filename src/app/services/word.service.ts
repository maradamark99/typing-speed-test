import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WordService {


  constructor() { }

  getWords(): string[] {
    return ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "lorem",
      "ipsum", "dolor", "sit", "amet", "consectetur", "lorem", "ipsum", "dolor",
      "sit", "amet", "consectetur", "lorem", "ipsum", "dolor", "sit", "amet", "consectetur"];
  }
}
