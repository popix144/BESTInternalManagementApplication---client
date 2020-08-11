import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RoleService } from 'src/app/services/role.service';
import { IRole } from 'src/app/models/role.interface';
import { FormControl } from '@angular/forms';
import { IUser } from 'src/app/models/user.interface';

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

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService) {}

  ngOnInit() {
    this.checked = this.data.user.enabled;
    this.roleService.getAll().subscribe(roles => {
      roles.forEach(role => {
        this.roles.push({id: role.id, name: role.name});
      })
      this.selectedOptions = this.data.user.roles;
      this.formControl = new FormControl(this.selectedOptions);
    });
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
}
