import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  @Input()
  userData: User;

  @Output("delete")
  deleteEmitter: EventEmitter<User> = new EventEmitter();

  @Output("edit")
  editEmitter: EventEmitter<User> = new EventEmitter();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  confirmDelete(): void {
    // create confirmation dialog
    let confirmDialog = this.dialog.open(ConfirmationDialogComponent,
      {
        maxWidth: "30vw",
        data:
        {
          confirmText: "Delete",
          cancelText: "Cancel",
          msg: "This data will be lost forever."
        }
      }
    );
    // if the dialog returned true, send delete signal
    confirmDialog.afterClosed().subscribe(res => {
      if (res) {
        this.deleteEmitter.emit(this.userData);
      }
    });
  }

  openEditDialog(): void {
    // create Edit Dialog
    let editDialog = this.dialog.open(EditDialogComponent,
      {
        maxWidth: "30vw",
        data:
        {
          // pass in copy of userData
          // if userData is passed through, each field is edited
          // concurrently with the corresponding field in the edit dialog
          // in realtime
          user: {
            idNum: this.userData.idNum,
            name: this.userData.name,
            age: this.userData.age
          } as User
        }
      }
    );

    // if the edit was confirmed, edit the user data
    editDialog.afterClosed().subscribe(user => {
      if (user) {
        this.editEmitter.emit(user);
      }
    });
  }

}
