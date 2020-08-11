import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEventCoreTeamDialogComponent } from './edit-event-core-team-dialog.component';

describe('EditEventCoreTeamDialogComponent', () => {
  let component: EditEventCoreTeamDialogComponent;
  let fixture: ComponentFixture<EditEventCoreTeamDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEventCoreTeamDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEventCoreTeamDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
