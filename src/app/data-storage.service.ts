import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  animals: Array<any> = [
    { name: 'Dog', value: 'dog' },
    { name: 'Cat', value: 'cat' },
    { name: 'Hamster', value: 'hamster' }
  ];
  cities = ['Bydgoszcz', 'Warszawa', 'Krakow'];
  genders = ['Male','Female'];
  constructor() { }
}
