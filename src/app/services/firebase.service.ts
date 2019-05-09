import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private users: BehaviorSubject<any> = new BehaviorSubject<Array<any>>([]);
  public users$: Observable<Array<any>> = this.users.asObservable();
  private filters: User = new User;

  constructor(public db: AngularFirestore) { }

  getUser(userKey) {
    return this.db.collection('users').doc(userKey).snapshotChanges()
  }

  updateUser(user: User) {
    const promise = this.db.collection('users')
                    .doc(user.id).set(
                      Object.assign({}, user)
                    );
    return from(promise);
  }

  deleteUser(userKey: string) {
    const promise = this.db.collection('users')
                    .doc(userKey).delete();
    return from(promise);
  }

  getUsers(filter: (item: any) => boolean = () => true) {
    this.db.collection('users')
      .snapshotChanges()
      .pipe(map((actions) => {
          return actions.map(action => {
            const data = action.payload.doc.data();
            const id = action.payload.doc.id;
            return { id, ...data };
          });
        })
      )
    .subscribe((data) => {
      const filteredData = data.filter(filter);
      this.users.next(filteredData);
    });
  }

  filter(option: {name: string, value: string}) {
    this.filters[option.name] = option.value;
    this.getUsers( (item: { name: string, age: number}): boolean => {
      const name = this.filters.name 
        ? item.name.includes(this.filters.name) 
        : true;
      const age = this.filters.age <= item.age;

      return name && age;
    });
  }

  createUser(value: User) {
    const promise = this.db.collection('users').add({
      name: value.name.toLowerCase(),
      age: value.age
    });
    return from(promise);
  }

}
