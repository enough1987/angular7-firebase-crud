import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  exampleForm: FormGroup;
  item: User;
  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'age': [
      { type: 'required', message: 'Age is required.' },
    ]
  };

  constructor(
    public firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.createForm(this.item);
      }
    })
  }

  createForm(item: User) {
    this.exampleForm = this.fb.group({
      name: [item.name, Validators.required],
      age: [item.age, Validators.required]
    });
  }

  onSubmit(id: string, value: User) {
    const user = new User(value.name, +value.age);
    user.id = id;

    this.firebaseService.updateUser(user)
      .subscribe(() => {
          this.router.navigate(['/home']);
      });
  }

  delete(id) {
    this.firebaseService.deleteUser(id)
      .subscribe(() => {
          this.router.navigate(['/home']);
      });
  }

  cancel() {
    this.router.navigate(['/home']);
  }

}
