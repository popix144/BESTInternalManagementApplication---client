import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { IDesiredUserCategories } from 'src/app/models/desiredUserCategory.interface';

@Component({
  selector: 'app-change-interest-category',
  templateUrl: './change-interest-category.component.html',
  styleUrls: ['./change-interest-category.component.css']
})
export class ChangeInterestCategoryComponent implements OnInit {

  desiredUserCategories: IDesiredUserCategories[] = [];
  editSkillsForm: FormGroup = new FormGroup({
    design: new FormControl('', [
        Validators.required
    ]),
    it: new FormControl('', [
      Validators.required
    ]),
    fr: new FormControl('', [
      Validators.required
    ]),
    hr: new FormControl('', [
      Validators.required
    ]),
    pr: new FormControl('', [
      Validators.required
    ])
  });

  constructor(private userService: UserService) {}

  get designInput() { return this.editSkillsForm.get('design'); }
  get frInput() { return this.editSkillsForm.get('fr'); }
  get hrInput() { return this.editSkillsForm.get('hr'); }
  get itInput() { return this.editSkillsForm.get('it'); }
  get prInput() { return this.editSkillsForm.get('pr'); }

  ngOnInit() {
    this.userService.getByToken().subscribe(user => {
      console.log(user);
      if (user.desiredUserCategories.length > 0) {
        this.desiredUserCategories = user.desiredUserCategories;
      } else {
        this.desiredUserCategories = [{categoryName: 'Design', grade: 0}, {categoryName: 'PR', grade: 0}, 
        {categoryName: 'FR', grade: 0}, {categoryName: 'HR', grade: 0}, {categoryName: 'IT', grade: 0}];
      }
      this.desiredUserCategories.forEach(userCategory => {
        switch (userCategory.categoryName) {
            case 'Design':
              this.designInput.setValue(userCategory.grade);
              break;
            case 'PR':
              this.prInput.setValue(userCategory.grade);
              break;
            case 'IT':
              this.itInput.setValue(userCategory.grade);
              break;
            case 'FR':
              this.frInput.setValue(userCategory.grade);
              break;
            case 'HR':
              this.hrInput.setValue(userCategory.grade);
              break;
        }
      });
    });
    this.onChanges();
  }


  onChanges(): void {
    this.designInput.valueChanges.subscribe(value => {
      value = Number(value);
      this.desiredUserCategories.forEach(userCategory => {
        if(userCategory.categoryName === 'Design')
          userCategory.grade = value;
      });
    });
    this.prInput.valueChanges.subscribe(value => {
      value = Number(value);
      this.desiredUserCategories.forEach(userCategory => {
        if(userCategory.categoryName === 'PR')
          userCategory.grade = value;
      });
    });
    this.itInput.valueChanges.subscribe(value => {
      value = Number(value);
      this.desiredUserCategories.forEach(userCategory => {
        if(userCategory.categoryName === 'IT')
          userCategory.grade = value;
      });
    });
    this.frInput.valueChanges.subscribe(value => {
      value = Number(value);
      this.desiredUserCategories.forEach(userCategory => {
        if(userCategory.categoryName === 'FR')
          userCategory.grade = value;
      });
    });
    this.hrInput.valueChanges.subscribe(value => {
      value = Number(value);
      this.desiredUserCategories.forEach(userCategory => {
        if(userCategory.categoryName === 'HR')
          userCategory.grade = value;
      });
    });
  }

  onSubmit() {
    this.userService.updateDesiredUserCategories(this.desiredUserCategories).subscribe();
  }
}
