import {Component, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {UserModel} from '../domain/user-model';
import {UserStory} from '../domain/userStory';
import {UserStoryService} from '../service/user-story.service';
import {Bug} from '../domain/bug';
import {Task} from '../domain/task';
import {TaskService} from '../service/task.service';
import {BugService} from '../service/bug.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  users: UserModel[] = [];

  userStories: UserStory[] = [];

  task: Task[] = [];

  bugs: Bug[] = [];

  newStatus = 'NEW';
  inProgressStatus = 'IN_PROGRESS';
  inReviewStatus = 'IN_REVIEW';
  doneStatus = 'DONE';

  constructor(private userService: UserService, private userStoryService: UserStoryService,
              private taskService: TaskService, private bugService: BugService) {
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe((response: UserModel[]) => this.users = response);
    this.userStoryService.getAllUserStories().subscribe((response: UserStory[]) => this.userStories = response);

    this.userStoryService.removeUserStory.subscribe(userStoryId => {
      const indexOfUserStory = this.userStories.findIndex(userStory => userStory.id === userStoryId);
      this.userStories.splice(indexOfUserStory, 1);
    });

    this.userStoryService.addUserStory.subscribe(newUserStory => {
      this.userStories.push(newUserStory);
    });

    this.taskService.removeTask.subscribe( task => {
      const userStoryToModify = this.userStories.find(userStory => userStory.id === task.userStoryId);
      const indexOfTask = userStoryToModify.taskList.findIndex(task1 => task1.id === task.id);
      userStoryToModify.taskList.splice(indexOfTask, 1);
    });

    this.bugService.removeBug.subscribe( bug => {
      const userStoryToModify = this.userStories.find(userStory => userStory.id === bug.userStoryId);
      const indexOfBug = userStoryToModify.bugList.findIndex(bug1 => bug1.id === bug.id);
      userStoryToModify.bugList.splice(indexOfBug, 1);
    });

    this.taskService.addTask.subscribe(newTask => {
      const userStoryToModify = this.userStories.find(userStory => userStory.id === newTask.userStoryId);
      userStoryToModify.taskList.push(newTask);
    });

    this.bugService.addBug.subscribe(newBug => {
      const userStoryToModify = this.userStories.find(userStory => userStory.id === newBug.userStoryId);
      userStoryToModify.bugList.push(newBug);
    });
    // this.bugService.getAllUserStories().subscribe((response: UserStory[]) => this.userStories = response);
    // this.taskService.getAllUserStories().subscribe((response: UserStory[]) => this.userStories = response);
  }

}
