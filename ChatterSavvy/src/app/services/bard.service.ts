import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BardService {

  private chatGPTUrl = 'http://127.0.0.1:8000/api/';  // Replace with your actual backend URL
  private dataSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  // Observable to which components can subscribe
  data$ = this.dataSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Method to update the data
  updateData(newData: string): void {
    this.dataSubject.next(newData);
  }

  // Example of a POST request to ChatGPT API with input text
  queryGemini(inputText: string): Observable<any> {
    const data = { input_text: inputText };
    return this.http.post<any>(this.chatGPTUrl + 'bard/', data);
  }  
}
