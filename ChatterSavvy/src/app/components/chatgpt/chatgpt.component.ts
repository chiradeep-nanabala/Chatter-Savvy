import { Component, OnInit } from '@angular/core';
import { ChatgptService } from 'src/app/services/chatgpt.service';

@Component({
  selector: 'app-chatgpt',
  templateUrl: './chatgpt.component.html',
  styleUrls: ['./chatgpt.component.css']
})
export class ChatgptComponent implements OnInit {

  questionAnswer: any = [];

  constructor(private chatgptService: ChatgptService) { }

  ngOnInit(): void {
    this.chatgptService.data$.subscribe((data) => {
      this.questionAnswer = data;
    });
  }
}
