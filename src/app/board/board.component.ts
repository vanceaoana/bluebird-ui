import {Component, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {UserModel} from '../domain/user-model';
import {UserStory} from '../domain/userStory';
import {UserStoryService} from '../service/user-story.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  users: UserModel[] = [];

  userStories: UserStory[] = [];

  constructor(private userService: UserService, private userStoryService: UserStoryService) {
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe((response: UserModel[]) => this.users = response);
    this.userStoryService.getAllUserStories().subscribe((response: UserStory[]) => this.userStories = response);
  }

}
