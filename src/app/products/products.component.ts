import { map } from 'rxjs/operators';
import { Component, OnInit,TemplateRef  } from '@angular/core';
import { Observable } from 'rxjs';
import { interval } from 'rxjs';
import { ProductsService } from '../_services/products.service';
import { flush } from '@angular/core/testing';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CategoriesComponent } from './../categories/categories.component';
import {NgxPaginationModule} from 'ngx-pagination';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  searchText =''
  searchKey=''
  productList :any
  categoryList : any
  mobileCategoryList : any
  watchesCategoryList : any
  booksCategoryList : any
  showAllProds = true
  showMobiles = false
  showWatches = false
  showBooks = false
  search = false
  
  modalRef: BsModalRef | any;

  modalInfo ={
    name:String,
    description:String,
    image:String,
    price: Number
  }

  allProducts={
    name:String,
    description:String,
    image:String,
    price: Number
  }

  cat= ''
catgory ={
  mobiles : 'mobiles',
  watches: 'watches',
  books: 'books'

}

  Categories =[
    'mobiles' ,
    'watches' ,
    'books'

  ]
  totalLength : any;
  page = 1



  
  constructor(private productServce:ProductsService,private modalService: BsModalService) {  }


  openModal(template: TemplateRef<any>,pinfo:any,size:any) {
    console.log(pinfo);
    size:size
    this.modalRef = this.modalService.show(template);
    this.modalInfo = pinfo
    
    // console.log(this.modalInfo);
    

 }
  ngOnInit(): void {
    this.getAllCategories()
    this.getAllProducts()

    this.productServce.search.subscribe((val:any)=>{
      this.searchKey = val;
    })

  }


getAllCategories(){
  this.productServce.getAllcategories().subscribe((allCats)=>{
    this.categoryList = allCats
  })
}

  getAllProducts(){
    this.productServce.products(this.cat).subscribe((allProds)=>{
      this.productList = allProds
    this.totalLength = allProds.length;

      // console.log(this.productList);
      
      // this.allProducts = this.productArray[0]
      this.showAllProds =true
    })

  }

  getMobilesCategory(){
    console.log(this.Categories);
    
    this.productServce.products(this.catgory.mobiles).subscribe((mobiles)=>{
    // this.productServce.getMobilesCategory().subscribe((mobiles)=>{
      this.mobileCategoryList = mobiles

      console.log(this.mobileCategoryList);
      
      this.showMobiles = true
      this.showAllProds = false
      this.showWatches = false
      this.showBooks = false
      
    })
  }
  getWatchesCategory(){
    this.productServce.products(this.catgory.watches).subscribe((watches)=>{

    // this.productServce.getWatchesCategory().subscribe((watches)=>{
      this.watchesCategoryList = watches
      this.showWatches = true
      this.showAllProds = false
      this.showBooks = false
      this.showMobiles = false
      
    })
  }
  getBooksCategory(){
    this.productServce.products(this.catgory.books).subscribe((books)=>{

    // this.productServce.getBooksCategory().subscribe((books)=>{
      this.booksCategoryList = books
      this.showBooks = true
      this.showAllProds = false
      this.showMobiles = false
      this.showWatches = false

    })

  }


  addToCart(id:any,quantity:number){

    let payload = {
      productId: id,
      quantity,
    };

    this.productServce.addToCart(payload).subscribe(()=>{
      this.getAllProducts()
      alert('product added')
    })
    console.log(id, quantity);
    // console.log(id.name);
}


  
}
