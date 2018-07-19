import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.css']
})
export class BoardCardComponent implements OnInit {

  @Input() boardItem: any;

  constructor() {
  }

  ngOnInit() {
  }

}
