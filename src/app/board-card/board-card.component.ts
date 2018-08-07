import {Component, Input, OnInit} from '@angular/core';
import {BoardPopUpComponent} from '../board-pop-up/board-pop-up.component';
import {MatDialog} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AppConstants} from '../util/app-constants';
import {UserModel} from '../domain/user-model';
import {UserStory} from '../domain/userStory';
import {UserStoryService} from '../service/user-story.service';

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
              private userStoryService: UserStoryService) {
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
        this.boardItem.id = result.formGroup.controls['id'].value;
        this.boardItem.title = result.formGroup.controls['title'].value;
        this.boardItem.description = result.formGroup.controls['description'].value;
        this.boardItem.status = result.formGroup.controls['status'].value;
        this.boardItem.priority = result.formGroup.controls['priority'].value;
        this.boardItem.estimation = result.formGroup.controls['estimation'].value;

        this.boardItem.userId = result.formGroup.controls['userId'].value;

        this.userStoryService.updateUserStory(this.boardItem).subscribe(
          (response) => console.log('User story with id: ' + this.boardItem.id + ' has been updated '),
          (error) => console.log(error));
      }
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
  }

}
