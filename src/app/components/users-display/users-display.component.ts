import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';

@Component({
  selector: 'app-users-display',
  templateUrl: './users-display.component.html',
  styleUrls: ['./users-display.component.css']
})
export class UsersDisplayComponent implements OnInit {

  users: Array<User>;

  constructor(
    public userService: UserService,
    public dialog: MatDialog) {
    this.users = new Array<User>();
  }

  ngOnInit(): void {
  }

  getUsers(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  addUser(): void {
    let addDialog = this.dialog.open(AddUserDialogComponent);
    addDialog.afterClosed().subscribe(result => {
      this.userService.createUser(result).subscribe(user => {
        this.users.push(user);
      },
        error => console.error("failed to create user in API"));
    });
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user.idNum).subscribe(
      n => this.users = this.users.filter(u => u !== user),
      error => console.error(`error deleting ${user.idNum}`));
  }

  editUser(user: User): void {
    this.userService.editUser(user).subscribe(
      n => this.users[this.users.findIndex(u => u.idNum == user.idNum)] = user,
      error => console.error("failed to edit user in API")
    );
  }

}
