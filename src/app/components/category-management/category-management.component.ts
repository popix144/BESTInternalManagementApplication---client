import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { first } from 'rxjs/operators';
import { ICategory } from 'src/app/models/category.interface';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AddCategoryDialogComponent } from '../add-category-dialog/add-category-dialog.component';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent implements OnInit {

  categories: ICategory[] = [];
  showProgressBar: boolean = false;
  newCategoryName: string;

  constructor(private categoryService: CategoryService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
    });
  }

  delete(category: ICategory) {
    this.showProgressBar = true;
    this.categoryService.delete(category.id).subscribe(
      (data) => {
        this.getData();
      }, (error) => {
        this.snackBar.open("Category could not be deleted.");
      }, () => {
        this.showProgressBar = false;
    });
  }

  openSaveCategoryDialog() {
    const dialogRef = this.dialog.open(AddCategoryDialogComponent, {
      width: '300px',
      data: {category: this.newCategoryName}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showProgressBar = true;
        this.newCategoryName = result;
        this.categoryService.save({name: this.newCategoryName}).subscribe(
          (data) => {
            this.getData();
          }, (error) => {
            this.snackBar.open("Category could not be saved.");
            this.showProgressBar = false;
          }, () => {
            this.showProgressBar = false;
        });
      }
    });
  }
}
