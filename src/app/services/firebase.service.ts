import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'minimatch';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private users: BehaviorSubject<any> = new BehaviorSubject<Array<any>>([]);
  public users$: Observable<Array<any>> = this.users.asObservable();
  private filters: { name?: String, age?: Number } = { name: '', age: 0 };

  constructor(public db: AngularFirestore) { }

  getUser(userKey) {
    return this.db.collection('users').doc(userKey).snapshotChanges()
  }

  updateUser(userKey, value) {
    return this.db.collection('users').doc(userKey).set(value);
  }

  deleteUser(userKey) {
    return this.db.collection('users').doc(userKey).delete();
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

  filter(option) {
    this.filters[option.name] = option.value;
    this.getUsers( (item): boolean => {
      const name = this.filters.name 
        ? item.name.includes(this.filters.name) 
        : true;
      const age = this.filters.age <= item.age;

      return name && age;
    });

  }

  createUser(value) {
    return this.db.collection('users').add({
      name: value.name.toLowerCase(),
      age: parseInt(value.age)
    });
  }

}
