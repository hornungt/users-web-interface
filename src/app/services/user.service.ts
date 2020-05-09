import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http : HttpClient) { }

  public getAllUsers() : Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:8080/users`);
  }

  public createUser(user : User) : Observable<User> {
    return this.http.post<User>("http://localhost:8080/users", user);
  }

  public deleteUser(userId : number) : Observable<User> {
    return this.http.delete<User>(`http://localhost:8080/users/${userId}`);
  }

  // user id should be immutable within the front end
  public editUser(newUserData : User) : Observable<User> {
    return this.http.put<User>(`http://www.localhost:8080/users/${newUserData.idNum}`, newUserData);
  }
}
