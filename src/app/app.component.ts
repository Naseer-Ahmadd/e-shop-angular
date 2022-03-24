import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { ProductsService } from './_services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title='authSystem'
  isLoggedIn = false;
 
  username?: string;
  searchText =''
  productList: any;
  public searchTerm: string =''
  
  cat = 'books'
  constructor(private tokenStorageService: TokenStorageService,private router:Router,private productServce:ProductsService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();

      this.username = user.username;
      this.router.navigateByUrl('/home')
      // window.location.reload()
    }
    
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }


  getAllProducts(){
    this.productServce.products(this.cat).subscribe((allProds)=>{
      this.productList = allProds
      // this.allProducts = this.productArray[0]
      // this.showAllProds =true
    })

  }

  search(event: any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    // console.log(this.searchTerm);
    this.productServce.search.next(this.searchTerm);
  }
}
