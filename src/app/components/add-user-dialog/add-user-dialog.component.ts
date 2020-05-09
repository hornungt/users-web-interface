import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent implements OnInit {

  model : User = {
    name: null,
    age: null,
    idNum: null
  };

  constructor(
    public dialogRef : MatDialogRef<AddUserDialogComponent>) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.dialogRef.close(this.model);
  }

}
