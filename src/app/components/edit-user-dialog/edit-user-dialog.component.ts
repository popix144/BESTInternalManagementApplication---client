import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RoleService } from 'src/app/services/role.service';
import { IRole } from 'src/app/models/role.interface';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {

  roles: IRole[] = [];
  checked: boolean;
  selectedOptions: IRole[];
  formControl: FormControl;
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
  
  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService) {}

    get designInput() { return this.editSkillsForm.get('design'); }
    get frInput() { return this.editSkillsForm.get('fr'); }
    get hrInput() { return this.editSkillsForm.get('hr'); }
    get itInput() { return this.editSkillsForm.get('it'); }
    get prInput() { return this.editSkillsForm.get('pr'); }

  ngOnInit() {
    this.checked = this.data.user.enabled;
    this.roleService.getAll().subscribe(roles => {
      roles.forEach(role => {
        this.roles.push({id: role.id, name: role.name});
      })
      this.selectedOptions = this.data.user.roles;
      this.formControl = new FormControl(this.selectedOptions);
    });
    if (this.data.user.userCategories.length == 0) {
      this.data.user.userCategories = [{categoryName: 'Design', grade: 0}, {categoryName: 'PR', grade: 0}, 
      {categoryName: 'FR', grade: 0}, {categoryName: 'HR', grade: 0}, {categoryName: 'IT', grade: 0}];
    }
    this.data.user.userCategories.forEach(userCategory => {
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
    })
    this.onChanges();
  }

  onSelectedOptionsChange() {
    this.data.user.roles = this.formControl.value;
  }

  onSlideChange() {
    this.checked = !this.checked;
    this.data.user.enabled = this.checked;
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  comparator(r1: IRole, r2: IRole) {
    return r1 && r2 && r1.id === r2.id;
  }

  onChanges(): void {
    this.designInput.valueChanges.subscribe(value => {
      this.data.user.userCategories.forEach(userCategory => {
        if(userCategory.categoryName === 'Design')
          userCategory.grade = value;
      });
    });
    this.prInput.valueChanges.subscribe(value => {
      this.data.user.userCategories.forEach(userCategory => {
        if(userCategory.categoryName === 'PR')
          userCategory.grade = value;
      });
    });
    this.itInput.valueChanges.subscribe(value => {
      this.data.user.userCategories.forEach(userCategory => {
        if(userCategory.categoryName === 'IT')
          userCategory.grade = value;
      });
    });
    this.frInput.valueChanges.subscribe(value => {
      this.data.user.userCategories.forEach(userCategory => {
        if(userCategory.categoryName === 'FR')
          userCategory.grade = value;
      });
    });
    this.hrInput.valueChanges.subscribe(value => {
      this.data.user.userCategories.forEach(userCategory => {
        if(userCategory.categoryName === 'HR')
          userCategory.grade = value;
      });
    });
  }
}
