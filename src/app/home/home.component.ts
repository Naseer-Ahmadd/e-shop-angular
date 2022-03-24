import { Router } from '@angular/router';
import { TokenStorageService } from './../_services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable ,forkJoin, fromEvent,} from 'rxjs';
import { ProductsService } from './../_services/products.service';
import { take , map} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  isLoggedIn = false
  username = ''
  items :any;
  itemLength:any
  size = 5
  page=1
  prevbtn = false
  nextbtn = true


  constructor(private tokenStorage: TokenStorageService,private router: Router, private productservice:ProductsService) { }

  ngOnInit(): void {
    this.getData();

    this.isLoggedIn = !!this.tokenStorage.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorage.getUser();
      this.username = user.username; 
    }
    if(!this.isLoggedIn){
      alert('authenticate failed')
      this.router.navigateByUrl('')
    }
  }


   getData() {
    this.productservice.getData(this.page,this.size).subscribe((data) => {
      this.items = data    
      this.itemLength = this.items.length
      console.log('totL',this.itemLength);
      
    });
  }


  onscroll(type:string) {
    if(type == 'next'){
          // console.log('length',this.items.length);
          this.page +=  1; 
          this.prevbtn = true
        
          if( this.items.length <5 && this.items.length >0  ){
            this.nextbtn = false
            this.page -=  1; 
          }
          // console.log('next',this.page ,'size',this.size);
    }
    else{
          this.page -=  1;  
          if(this.page == 1){
            this.prevbtn = false
          }
          if(this.items.length>0){
            this.nextbtn = true
          }
          // console.log('prev',this.page);
    }
    this.getData();  
  }
}
