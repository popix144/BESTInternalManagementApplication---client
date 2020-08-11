import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionManagementComponent } from './position-management.component';

describe('PositionManagementComponent', () => {
  let component: PositionManagementComponent;
  let fixture: ComponentFixture<PositionManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
