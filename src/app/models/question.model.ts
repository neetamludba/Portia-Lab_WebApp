export interface Question {
  questionID: number;
  testID: number;
  question: string;
  questionType: number;
  displayOrder: number;
  mandatory: boolean;
  options: string;
  correctAnswers: string;
  active: boolean;
}
