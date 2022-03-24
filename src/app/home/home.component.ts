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

  obsArray: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  items$: Observable<any> = this.obsArray.asObservable();
  items :any;
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
      this.router.navigateByUrl('')
    }
  }


   getData() {
    this.productservice.getData(this.page,this.size).subscribe((data) => {
      // this.obsArray.next(data);
      this.items = data

      // console.log(this.items);
      
      // console.log(data);
      
    });

   
    // const content = document.querySelector('.items');
    // const scroll$ = fromEvent(content!, 'scroll').pipe(map(() => { return content!.scrollTop; }));

    // scroll$.subscribe((scrollPos) => {
    //   let limit = content!.scrollHeight - content!.clientHeight;
    //   if (scrollPos === limit) {
    //     this.currentPage += this.pageSize;
    //     forkJoin([this.items$.pipe(take(1)), this.productservice.getData(this.currentPage, this.pageSize)]).subscribe((data: Array<Array<any>>) => {
    //       const newArr = [...data[0], ...data[1]];
    //       this.obsArray.next(newArr);
    //     });
    //   }
    // });
  }


  onscroll(type:string) {

    if(this.page == 1  ) {
      this.prevbtn = false
    } 
     
    if(type == 'next'){
console.log('length',this.items.length);

      this.page +=  1; 

      if( this.items.length <5 && this.items.length >0  ){

        this.nextbtn = false
        this.page -=  1; 

      }
      
    

    console.log('next',this.page ,'size',this.size);
    }
    else{
    this.page -=  1;  
    if(this.page == 1){
      this.prevbtn = true
      // this.nextbtn = true
    }
    if(this.items.length>0){
      this.nextbtn = true
    }
    
    
    console.log('prev',this.page);


    }
    
    this.getData();  
    
  }
}
