export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface Feedback {
  name: string;
  email: string;
  message: string;
}
