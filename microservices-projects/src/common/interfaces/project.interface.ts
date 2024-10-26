interface IComment {
  user: string;
  chat: string;
}

interface IRating {
  user: string;
  rate: number;
}

export interface IProject extends Document {
  title: string;
  description: string;
  category: string;
  img: string;
  userId: string;
  likes: string[];
  isValid: boolean;
  currentState: string;
  comments: IComment[];
  rating: IRating[];
}
