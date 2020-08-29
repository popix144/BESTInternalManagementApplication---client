import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeInterestCategoryComponent } from './change-interest-category.component';

describe('ChangeInterestCategoryComponent', () => {
  let component: ChangeInterestCategoryComponent;
  let fixture: ComponentFixture<ChangeInterestCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeInterestCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeInterestCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
