import { Component } from '@angular/core';
import { ChatgptService } from './services/chatgpt.service';
import { BardService } from './services/bard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  gptQuestionAnswer: any = [];
  geminiQuestionAnswer: any = [];
  inputQuery: string = '';
  gptFlag: boolean = false;
  bardFlag: boolean = false;
  loadingGPT: boolean = false;
  loadingBard: boolean = false;
  
  constructor(private chatgptService: ChatgptService,
              private bardService: BardService) { }

  clear(){
    if(this.gptFlag && this.bardFlag){
      this.inputQuery = '';
    }
  }

  submitQuery(){
    this.gptFlag = false;
    this.bardFlag = false;
    this.loadingGPT = true;
    this.loadingBard = true;
    this.chatgptService.queryGPT(this.inputQuery).subscribe(response => {
      this.gptQuestionAnswer.unshift({
        'question': this.inputQuery,
        'answer': response.response
      });
      this.chatgptService.updateData(this.gptQuestionAnswer);
      this.loadingGPT = false;
      this.gptFlag = true;
      this.clear();
    });

    this.bardService.queryGemini(this.inputQuery).subscribe(response => {
      this.geminiQuestionAnswer.unshift({
        'question': this.inputQuery,
        'answer': response.response
      });
      this.bardService.updateData(this.geminiQuestionAnswer);
      this.loadingBard = false;
      this.bardFlag = true;
      this.clear();
    });
  }
}
