import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '../question-base';
import { QuestionControlService } from '../question-control.service';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers: [ QuestionControlService, QuestionService ],
})
export class DynamicFormComponent implements OnInit {

  constructor(
    private qcs: QuestionControlService,
    private questionService: QuestionService,
  ) {
  }

  ngOnInit(): void {
    this.getQuestions();
    this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[]);
  }

  getQuestions(): void {
    this.questionService.getQuestions().subscribe(questions => this.questions = questions);
  }

  questions: QuestionBase<string>[] | null = [];

  form!: FormGroup;
  payLoad = '';

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }

}
