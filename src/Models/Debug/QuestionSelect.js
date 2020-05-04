import {QuestionTypes} from '../../../src/Models/Debug/QuestionTypes.js';
import {Question} from '../../../src/Models/Debug/Question.js';


class QuestionSelect extends Question {
  getType() {
    return QuestionTypes.SELECT;
  }

  static create(text) {
    return new QuestionSelect(text);
  }
}

export {QuestionSelect};
