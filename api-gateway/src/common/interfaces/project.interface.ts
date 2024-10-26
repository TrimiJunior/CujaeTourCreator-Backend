export interface IProject {
  readonly title: string;
  readonly description: string;
  readonly category: string;
  readonly img: string;
  readonly likes: string[];
  readonly isValid: boolean;
  readonly currentState: string;
}
