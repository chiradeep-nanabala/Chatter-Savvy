import { Component, OnInit } from '@angular/core';
import { BardService } from 'src/app/services/bard.service';
import { ChatgptService } from 'src/app/services/chatgpt.service';

@Component({
  selector: 'app-bard',
  templateUrl: './bard.component.html',
  styleUrls: ['./bard.component.css']
})
export class BardComponent implements OnInit {

  questionAnswer: any = [];

  constructor(private bardService: BardService) { }

  ngOnInit(): void {
    this.bardService.data$.subscribe((data) => {
      this.questionAnswer = data;
    });
  }
}
