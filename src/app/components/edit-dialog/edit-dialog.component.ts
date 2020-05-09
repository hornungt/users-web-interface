import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  model: User;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.model = data.user as User;
     }

  ngOnInit(): void {
  }

  // close the edit dialog, confirming edits
  confirm(): void {
    this.dialogRef.close(this.model);
  }

  // close the edit dialog, canceling edits
  cancel(): void {
    this.dialogRef.close();
  }

}
