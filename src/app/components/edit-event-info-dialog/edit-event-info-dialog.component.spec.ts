import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEventInfoDialogComponent } from './edit-event-info-dialog.component';

describe('EditEventInfoDialogComponent', () => {
  let component: EditEventInfoDialogComponent;
  let fixture: ComponentFixture<EditEventInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEventInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEventInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
