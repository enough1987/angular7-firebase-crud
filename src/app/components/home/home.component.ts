import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, Params } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ageValue: number = 0;
  searchValue: string = "";
  items: Observable<Array<any>> = this.firebaseService.users$;

  constructor(
    public firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.firebaseService.getUsers()
  }

  viewDetails(id: number){
    this.router.navigate(['/details/'+ id])
  }

  searchByName(value){
    this.firebaseService.filter({ name: 'name', value });
  }

  rangeChange(value){
    this.firebaseService.filter({ name: 'age', value });
  }

}
