import { VirtualTimeScheduler } from 'rxjs';
import { User } from './user.model';

export class Tweet {
  id: number;
  date: Date = new Date()
  user: User;
  text: string;

  constructor(id: number, date: Date, user: User, text: string) {
    this.id = id;
    this.date = date;
    this.user = user;
    this.text = text;
  }

}
