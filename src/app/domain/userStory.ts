import {Bug} from './bug';
import {Task} from './task';

export class UserStory {
  id: number;
  title: string;
  description: string;
  priority: number;
  estimation: number;
  status: string;
  userId: number;

  bugList: Bug[];
  taskList: Task[];
}
