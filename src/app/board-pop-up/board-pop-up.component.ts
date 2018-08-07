import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-board-pop-up',
  templateUrl: './board-pop-up.component.html',
  styleUrls: ['./board-pop-up.component.css']
})
export class BoardPopUpComponent implements OnInit {

  constructor(   public dialogRef: MatDialogRef<BoardPopUpComponent>,
                 @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
