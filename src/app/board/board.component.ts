import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {UserModel} from '../domain/user-model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  users: UserModel[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe((response: UserModel[]) => this.users = response);
  }

}
