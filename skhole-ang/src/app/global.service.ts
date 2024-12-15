import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  setName(value: string): void {
    localStorage.setItem('globalName', value);
  }

  getName(): string {
    return localStorage.getItem('globalName') || '';
  }

  setId(value: string):void{
    localStorage.setItem('globalId', value);
  }

  getId(): string {
    return localStorage.getItem('globalId') || '';
  }
}
