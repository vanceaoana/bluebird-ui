import {Component, Input, OnInit} from '@angular/core';
import {BoardPopUpComponent} from '../board-pop-up/board-pop-up.component';
import {MatDialog} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AppConstants} from '../util/app-constants';

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

  constructor(public dialog: MatDialog, private formBuilder: FormBuilder) {
  }

  openDialog(): void {
    let formGroup = this.formBuilder.group({
      id: [this.boardItem.id],
      title: [this.boardItem.title],
      description: [this.boardItem.description],
      priority: [this.boardItem.priority],
      estimation: [this.boardItem.estimation],
      status: [this.boardItem.status],
      userId: [this.boardItem.userId]
    });
    const dialogRef = this.dialog.open(BoardPopUpComponent, {
      width: '60%',
      height: '40%',
      minHeight: '460px',
      minWidth: '600px',
      data: {formGroup, statusList: this.statusList}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
  }

}
