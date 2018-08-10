import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardPopUpComponent } from './board-pop-up.component';

describe('BoardPopUpComponent', () => {
  let component: BoardPopUpComponent;
  let fixture: ComponentFixture<BoardPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
