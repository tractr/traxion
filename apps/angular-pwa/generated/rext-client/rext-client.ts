import {
  AnswerService,
  MessageService,
  OpenQuestionService,
  QuestionService,
  TagService,
  UserService,
  VariableService,
} from './services';

export class RextClient {
  public apiUrl: URL;

  constructor(apiUrl: string | URL) {
    this.apiUrl = new URL(apiUrl.toString());
  }

  private answerService!: AnswerService;

  get answer() {
    if (!this.answerService) {
      this.answerService = new AnswerService(this.apiUrl);
    }

    return this.answerService;
  }

  private messageService!: MessageService;

  get message() {
    if (!this.messageService) {
      this.messageService = new MessageService(this.apiUrl);
    }

    return this.messageService;
  }

  private openQuestionService!: OpenQuestionService;

  get openQuestion() {
    if (!this.openQuestionService) {
      this.openQuestionService = new OpenQuestionService(this.apiUrl);
    }

    return this.openQuestionService;
  }

  private questionService!: QuestionService;

  get question() {
    if (!this.questionService) {
      this.questionService = new QuestionService(this.apiUrl);
    }

    return this.questionService;
  }

  private tagService!: TagService;

  get tag() {
    if (!this.tagService) {
      this.tagService = new TagService(this.apiUrl);
    }

    return this.tagService;
  }

  private userService!: UserService;

  get user() {
    if (!this.userService) {
      this.userService = new UserService(this.apiUrl);
    }

    return this.userService;
  }

  private variableService!: VariableService;

  get variable() {
    if (!this.variableService) {
      this.variableService = new VariableService(this.apiUrl);
    }

    return this.variableService;
  }

}
