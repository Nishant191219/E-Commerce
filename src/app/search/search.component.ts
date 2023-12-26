import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from 'src/datatype';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  searchResult:undefined|product[];
  constructor(private activateRoute:ActivatedRoute, private product:ProductService){}
  ngOnInit(){
    let query1=this.activateRoute.snapshot.paramMap.get('query')
    console.log(query1);
    query1 && this.product.searchProduct(query1).subscribe((result)=>{
        this.searchResult=result;
    })
  }
}
