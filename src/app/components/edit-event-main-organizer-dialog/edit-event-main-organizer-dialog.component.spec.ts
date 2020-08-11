import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEventMainOrganizerDialogComponent } from './edit-event-main-organizer-dialog.component';

describe('EditEventMainOrganizerDialogComponent', () => {
  let component: EditEventMainOrganizerDialogComponent;
  let fixture: ComponentFixture<EditEventMainOrganizerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEventMainOrganizerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEventMainOrganizerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
