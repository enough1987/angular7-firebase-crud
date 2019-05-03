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

  viewDetails(item){
    this.router.navigate(['/details/'+ item.id])
  }

  capitalizeFirstLetter(value){
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  searchByName(){
    this.firebaseService.filter({ name: 'name', value: this.searchValue });
  }

  rangeChange(event){
    this.firebaseService.filter({ name: 'age', value : event.value });
  }

}
