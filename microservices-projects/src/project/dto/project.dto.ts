export class ProjectDTO {
  readonly title: string;
  readonly description: string;
  readonly category: string;
  readonly img: string;
  readonly userId: string;
  readonly likes: string[];
  readonly isValid: boolean;
  readonly currentState: string;
  readonly comments: Comment[];
  readonly rating: Rating[];
}

export class Comment {
  readonly user: string;
  readonly chat: string;
}

export class Rating {
  readonly user: string;
  readonly rate: number;
}
