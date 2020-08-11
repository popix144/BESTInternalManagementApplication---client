import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmUsersDialogComponent } from './confirm-users-dialog.component';

describe('ConfirmUsersDialogComponent', () => {
  let component: ConfirmUsersDialogComponent;
  let fixture: ComponentFixture<ConfirmUsersDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmUsersDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmUsersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
