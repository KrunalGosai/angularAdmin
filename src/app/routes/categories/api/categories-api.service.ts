import { of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesApiService {

  constructor() { }

  getAllCategories(){
    const categories = data;
    return of(categories)
  }
}

const data = [
  {name:"books",parent:""},
  {name:"story books",parent:"books"},
  {name:"text books",parent:"books"},
  {name:"furniture",parent:""},
  {name:"chair",parent:"furniture"},
  {name:"table",parent:"furniture"},
  {name:"fan",parent:"furniture"},
  {name:"table lamp",parent:"furniture"},
  {name:"flower pot",parent:"furniture"},
  {name:"eletronics",parent:""},
  {name:"tv",parent:"eletronics"},
  {name:"fan",parent:"eletronics"},
  {name:"computer",parent:"eletronics"},
  {name:"laptop",parent:"eletronics"},
  {name:"mobile",parent:"eletronics"},
]
