

import { SlideshowModule } from 'ng-simple-slideshow';
import { ImageLinks } from './../shared/imageLinks';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReadRecipesService } from '../services/read-recipes.service';
import { Recipe } from '../shared/recipe';
import { DataserviceService } from '../services/dataservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  imageLinks:any[];
  imageSources:string[];
  recipes;
  displayrecipeDetails:boolean=false
  nutritionalValues;
  recipe;
  message:string="hello"
  height='70%';
   imgUrl:string='https://img.koket.se/media/krabbelurer2.jpg';
  constructor(private httpService:ReadRecipesService,private dataService:DataserviceService) {    
   // this.recipe=new Recipe()
    this.imageSources=new ImageLinks().imageSources;    
   }
   ///#### receive recipe from search #########
   receiveRecipe($event){
     this.displayrecipeDetails=true
    this.recipe=$event
    
    //this.nutritionalValues=this.recipe.ingredients.Naringsvarden.Naringsvarde;
    console.log(this.recipe._ingredients[0].Naringsvarden.Naringsvarde)
   }
   displayNarings(){
     console.log(this.recipe)
   }
   checkTrue():boolean{
   return this.displayrecipeDetails
   }
  ngOnInit() {
    this.httpService.getRecipes().subscribe(res=>{
      this.recipes=res.json();
      
    })   
      
  }
   
updateRecipe(){
  
}

}
