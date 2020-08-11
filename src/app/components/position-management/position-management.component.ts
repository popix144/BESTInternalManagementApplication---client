import { Component, OnInit } from '@angular/core';
import { IPosition } from 'src/app/models/position.interface';
import { PositionService } from 'src/app/services/position.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AddPositionDialogComponent } from '../add-position-dialog/add-position-dialog.component';

@Component({
  selector: 'app-position-management',
  templateUrl: './position-management.component.html',
  styleUrls: ['./position-management.component.css']
})
export class PositionManagementComponent implements OnInit {

  positions: IPosition[] = [];
  showProgressBar: boolean = false;
  newPositionName: string;

  constructor(private positionService: PositionService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.positionService.getAll().subscribe(positions => {
      this.positions = positions;
    });
  }

  delete(position: IPosition) {
    this.showProgressBar = true;
    this.positionService.delete(position.id).subscribe(
      (data) => {
        this.getData();
      }, (error) => {
        this.snackBar.open("Position could not be deleted.");
      }, () => {
        this.showProgressBar = false;
    });
  }

  openSavePositionDialog() {
    const dialogRef = this.dialog.open(AddPositionDialogComponent, {
      width: '300px',
      data: {category: this.newPositionName}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showProgressBar = true;
        this.newPositionName = result;
        this.positionService.save({name: this.newPositionName}).subscribe(
          (data) => {
            this.getData();
          }, (error) => {
            this.snackBar.open("Position could not be saved.");
            this.showProgressBar = false;
          }, () => {
            this.showProgressBar = false;
        });
      }
    });
  }
}
