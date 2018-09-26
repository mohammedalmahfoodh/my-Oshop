import { BadInput } from './../../shared/bad-input';
import { AppError } from './../../shared/app-error';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ReadRecipesService } from '../../services/read-recipes.service';
import { NotFoundError } from '../../shared/not-found-error';
import { Recipe } from '../../shared/recipe';
import { DataserviceService } from '../../services/dataservice.service';

@Component({
  selector: 'app-home-recipes',
  templateUrl: './home-recipes.component.html',
  styleUrls: ['./home-recipes.component.css']
})
export class HomeRecipesComponent implements OnInit {
  recipesCategories=['Middag','Efterrätt','Mellanmål']
  recipes:Recipe[];
  recipesNames:any[];
  recipeList;
  recipe:Recipe;
  categoriesMiddag;
  categoriesMellanmal;
  categoriesEfterrett;
  allCategories;
  recipe2;

  constructor(private recipeService:ReadRecipesService,private dataService:DataserviceService) { this.recipes=[]}
  

  //########## send recipe to display page #########
  sendToDisplay(reci){
    this.dataService.changeRecipe(reci)    
   }
  
   logRecipes(){
     //console.log(this.categoriesMellanmål)
   }
  deleteRecipe(name){
    this.recipeService.deleteRecipe(name).subscribe(response=>{
      console.log('deleted ok');
    },
    (error:AppError)=>{
      if(error instanceof NotFoundError)
      alert('This recipe allready deleted');
      else{
        //throw error to catch it in global ErrorHandler if exists in our app module 
        alert('An unexpected error occurred.');
      }
    })}
    
    createRecipe(recipe){
      this.recipeService.createRecipe(recipe).subscribe(response=>{
        console.log('created ok');
      },
      (error:AppError)=>{
        if(error instanceof BadInput){
        //this.form.setErrors(error.originalError);
        }        
        else {alert('An unexpected error occurred')}
        
      })}
      
  ngOnInit() {
    this.getRecipes()
    this.getRecipesNames()
    this.dataService.currentRecipe.subscribe(recipe=>this.recipe2=recipe)
     
}



//######## Get recipes ##############
getRecipes(){
  this.recipeService.getRecipes().subscribe(
    res=>{
      this.recipes=res.json();
      this.categoriesMiddag= this.recipes.filter(recipe=>recipe._category=='Middag').length
      this.categoriesMellanmal=this.recipes.filter(recipe=>recipe._category=='Mellanmål').length
      this.categoriesEfterrett=this.recipes.filter(recipe=>recipe._category=='Efterrätt').length      
      this.allCategories=this.recipes.filter(recipe=>recipe._category).length
  },
  error=>{
    alert('An unexpected error occurred')
    console.log(error);
  });
}
//######## Get recipes names##############
getRecipesNames(){
 this.recipeService.getRecipesNames().subscribe(
    res=>{
      this.recipesNames=res;
 },
  error=>{
    alert('An unexpected error occurred')
    console.log(error);
  });
}



}
