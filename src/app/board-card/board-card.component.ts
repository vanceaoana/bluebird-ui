import {Component, Input, OnInit} from '@angular/core';
import {BoardPopUpComponent} from '../board-pop-up/board-pop-up.component';
import {MatDialog} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AppConstants} from '../util/app-constants';
import {RemoveItemDialogComponent} from '../remove-item-dialog/remove-item-dialog.component';
import {UserStory} from '../domain/userStory';
import {UserStoryService} from '../service/user-story.service';
import {BugService} from '../service/bug.service';
import {TaskService} from '../service/task.service';
import {Bug} from '../domain/bug';
import {Task} from '../domain/task';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.css']
})
export class BoardCardComponent implements OnInit {

  @Input() boardItem: any;
  userStory = 'USERSTORY';
  bug = 'BUG';
  task = 'TASK';
  @Input() itemType: string;
  readonly NEW: string = AppConstants.NEW;
  readonly IN_PROGRESS: string = AppConstants.IN_PROGRESS;
  readonly IN_REVIEW: string = AppConstants.IN_REVIEW;
  readonly DONE: string = AppConstants.DONE;
  readonly statusList: string[] = AppConstants.STATUS_LIST;

  constructor(public dialog: MatDialog,
              private formBuilder: FormBuilder,
              private userStoryService: UserStoryService,
              private taskService: TaskService,
              private bugService: BugService,
              private toastr: ToastrService) {
  }

  openDialog(): void {
    const formGroup = this.formBuilder.group({
      id: [this.boardItem.id],
      title: [this.boardItem.title],
      description: [this.boardItem.description],
      priority: [this.boardItem.priority],
      estimation: [this.boardItem.estimation],
      status: [this.boardItem.status],
      userId: [this.boardItem.userId]
    });

    const statusList: string[] = this.statusList;

    const dialogRef = this.dialog.open(BoardPopUpComponent, {
      width: '60%',
      height: '40%',
      minHeight: '460px',
      minWidth: '600px',
      data: {formGroup, statusList}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.boardItem = this.getPopulatedBoardItem(this.boardItem, result);
        if (this.itemType === this.userStory) {
          this.userStoryService.updateUserStory(this.boardItem).subscribe(
            (response) => console.log('User story with id: ' + this.boardItem.id + ' has been updated '),
            (error) => console.log(error));
        }
        if (this.itemType === this.task) {
          this.taskService.updateTask(this.boardItem).subscribe(
            (response) => console.log('Task with id: ' + this.boardItem.id + ' has been updated '),
            (error) => console.log(error));
        }
        if (this.itemType === this.bug) {
          this.bugService.updateBug(this.boardItem).subscribe(
            (response) => console.log('Bug with id: ' + this.boardItem.id + ' has been updated '),
            (error) => console.log(error));
        }

      }
      console.log('The dialog was closed');
    });
  }

  openEmptyDialog(itemType: any): void {
    const formGroup = this.formBuilder.group({
      id: null,
      title: '',
      description: '',
      priority: '',
      estimation: '',
      status: '',
      userId: ''
    });

    const statusList: string[] = this.statusList;

    const dialogRef = this.dialog.open(BoardPopUpComponent, {
      width: '60%',
      height: '40%',
      minHeight: '460px',
      minWidth: '600px',
      data: {formGroup, statusList}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        if (itemType === this.userStory) {
          const newUserStory = this.getNewUserStory(result);
          this.userStoryService.createUserStory(newUserStory);
        }
        if (itemType === this.task) {
          const newTask = this.getNewTask(this.boardItem.id, result);
          this.taskService.createTask(newTask);
        }
        if (itemType === this.bug) {
          const newBug = this.getNewBug(this.boardItem.id, result);
          this.bugService.createBug(newBug);
        }
      }
      console.log('The dialog was closed');
    });
  }

  getPopulatedBoardItem(boardItem, result: any): any {

    boardItem.id = result.formGroup.controls['id'].value;
    boardItem.title = result.formGroup.controls['title'].value;
    boardItem.description = result.formGroup.controls['description'].value;
    boardItem.status = result.formGroup.controls['status'].value;
    boardItem.priority = result.formGroup.controls['priority'].value;
    boardItem.estimation = result.formGroup.controls['estimation'].value;
    boardItem.userId = result.formGroup.controls['userId'].value;
    return boardItem;
  }

  getNewUserStory(result: any): any {
    const boardItem = new UserStory();
    boardItem.title = result.formGroup.controls['title'].value;
    boardItem.description = result.formGroup.controls['description'].value;
    boardItem.status = result.formGroup.controls['status'].value;
    boardItem.priority = result.formGroup.controls['priority'].value;
    boardItem.estimation = result.formGroup.controls['estimation'].value;
    boardItem.userId = result.formGroup.controls['userId'].value;
    return boardItem;
  }

  getNewTask(userStoryId: number, result: any): any {
    const boardItem = new Task();
    boardItem.title = result.formGroup.controls['title'].value;
    boardItem.description = result.formGroup.controls['description'].value;
    boardItem.status = result.formGroup.controls['status'].value;
    boardItem.priority = result.formGroup.controls['priority'].value;
    boardItem.estimation = result.formGroup.controls['estimation'].value;
    boardItem.userStoryId = userStoryId;
    boardItem.userId = result.formGroup.controls['userId'].value;
    return boardItem;
  }

  getNewBug(userStoryId: number, result: any): any {
    const boardItem = new Bug();
    boardItem.title = result.formGroup.controls['title'].value;
    boardItem.description = result.formGroup.controls['description'].value;
    boardItem.status = result.formGroup.controls['status'].value;
    boardItem.priority = result.formGroup.controls['priority'].value;
    boardItem.estimation = result.formGroup.controls['estimation'].value;
    boardItem.userId = result.formGroup.controls['userId'].value;
    boardItem.userStoryId = userStoryId;
    return boardItem;
  }

  openRemoveStoryDialog(itemType): void {
    const type = itemType;
    const name = this.boardItem.title;
    const dialogRef = this.dialog.open(RemoveItemDialogComponent, {
      width: '30%',
      height: '20%',
      minHeight: 170, // assumes px
      data: {
        name,
        type
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.deleteItem(itemType);
    });
  }

  deleteItem(itemType: any): void {
    if (itemType === this.userStory) {
      this.userStoryService.deleteUserStory(this.boardItem.id);
    } else {
      if (itemType === this.bug) {
        this.bugService.deleteBug(this.boardItem);
      } else {
        if (itemType === this.task) {
          this.taskService.deleteTask(this.boardItem);
        }
      }
    }
  }

  ngOnInit() {
  }

}
