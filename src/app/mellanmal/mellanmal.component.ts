import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppError } from '../shared/app-error';
import { NotFoundError } from '../shared/not-found-error';
import { ImageLinks } from '../shared/imageLinks';
import { ReadRecipesService } from '../services/read-recipes.service';
import { Recipe } from '../shared/recipe';
import { BadInput } from '../shared/bad-input';
import { DataserviceService } from '../services/dataservice.service';

@Component({
  selector: 'app-mellanmal',
  templateUrl: './mellanmal.component.html',
  styleUrls: ['./mellanmal.component.css']
})
export class MellanmalComponent implements OnInit {

  imageSources:string[];
  recipesCategories=['Mellanmål']
  recipes:Recipe[];
  recipesNames:any[];
  recipeList;
  recipe:Recipe;
  categoriesMiddag;
  categoriesMellanmal;
  categoriesEfterrett;
  allCategories;
  recipe2

  constructor(private recipeService:ReadRecipesService,private dataService:DataserviceService) { 
    this.recipes=[]
    this.imageSources=new ImageLinks().imageSources;
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
      //########## send recipe to display page #########
  sendToDisplay(reci){
    this.dataService.changeRecipe(reci)  
       
   }
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
      this.allCategories=this.recipes.filter(recipe=>recipe._category).length
      this.recipes=this.recipes.filter(res=>res._category=='Mellanmål')
      this.categoriesMellanmal= this.recipes.filter(recipe=>recipe._category=='Mellanmål').length
      
            
     
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
