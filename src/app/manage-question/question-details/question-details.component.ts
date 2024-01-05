import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor/lib/config';
import { Question } from 'app/models/question.model';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css'],
})
export class QuestionDetailsComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Question,
    private dialogRef: MatDialogRef<QuestionDetailsComponent>,
    private formBuilder: FormBuilder
  ) { }

  questionDetailsForm = this.formBuilder.group({
    question: new FormControl(null, [
      Validators.required,
      Validators.minLength(10),
    ]),
    questionType: new FormControl('1'),
    displayOrder: new FormControl(1),
    mandatory: new FormControl(true),
    active: new FormControl(true),
    optionsArray: this.formBuilder.array([]),
  });

  errorMessage: string = '';

  ngOnInit(): void {
    if (this.data.questionID > -1) {
      this.questionDetailsForm.patchValue({
        question: this.data.question,
        questionType: this.data.questionType.toString(),
        displayOrder: this.data.displayOrder,
        mandatory: this.data.mandatory,
        active: this.data.active,
      });

      const optionsArr = this.data.options.split(',');
      const correctAnsArr = this.data.correctAnswers.split(',');

      for (let index = 0; index < optionsArr.length; index++) {
        const option = optionsArr[index];
        const correctAnswer = correctAnsArr[index] ?? 'false';
        this.addOption(option, correctAnswer === 'true');
      }
    }
  }

  showErrorMessage(fieldName: string) {
    let errors = this.questionDetailsForm.get(fieldName)?.errors;

    if (errors) {

      if (errors['required']) return 'Test description is required';
      if (errors['minlength'])
        return 'Test description must be 5 characters long';
      return '';
    } else return '';
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    defaultFontSize: '4',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['insertImage', 'insertVideo']
    ]
  };

  get options() {
    return this.questionDetailsForm.controls['optionsArray'] as FormArray;
  }

  addOption(optionValue = '', correctAns = false) {
    const optionForm = this.formBuilder.group({
      value: [optionValue, [Validators.required,
      ]],
      correctAnswer: [correctAns],
    });

    this.options.push(optionForm);
  }

  deleteOption(optionIndex: number) {
    this.options.removeAt(optionIndex);
    this.questionDetailsForm.markAsDirty();
  }

  saveQuestion() {
    const optionsData = this.options.controls
      .map((cntrl: any) => cntrl.controls.value.value)
      .join(',');

    let trueCount: number = 0;

    const correctAnswersData = this.options.controls
      .map((cntrl: any) => {
        if (cntrl.controls.correctAnswer.value === true) trueCount++;

        return cntrl.controls.correctAnswer.value;
      })
      .join(',');


    if (
      this.questionDetailsForm.get('questionType')?.value === '1' &&
      trueCount !== 1
    ) {
      this.errorMessage = 'Please select one correct option.';
      return;
    }

    if (
      this.questionDetailsForm.get('questionType')?.value === '2' &&
      trueCount === 0
    ) {
      this.errorMessage = 'Please select atleast one correct option.';
      return;
    }

    this.dialogRef.close({
      question: this.questionDetailsForm.get('question')?.value,
      questionType: Number(this.questionDetailsForm.get('questionType')?.value),
      displayOrder: this.questionDetailsForm.get('displayOrder')?.value,
      mandatory: this.questionDetailsForm.get('mandatory')?.value,
      options: optionsData,
      correctAnswers: correctAnswersData,
      active: this.questionDetailsForm.get('active')?.value,
    });
  }
}
