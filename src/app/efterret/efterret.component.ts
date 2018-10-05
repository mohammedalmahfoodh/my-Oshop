import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BadInput } from '../shared/bad-input';
import { AppError } from '../shared/app-error';
import { NotFoundError } from '../shared/not-found-error';
import { ImageLinks } from '../shared/imageLinks';
import { ReadRecipesService } from '../services/read-recipes.service';
import { Recipe } from '../shared/recipe';
import { DataserviceService } from '../services/dataservice.service';

@Component({
  selector: 'app-efterret',
  templateUrl: './efterret.component.html',
  styleUrls: ['./efterret.component.css']
})
export class EfterretComponent implements OnInit {

  imageSources:string[];
  recipesCategories=['Efterrätt']
  recipes:Recipe[];
  recipesNames:any[];
  recipeList;
  recipe:Recipe;
  categoriesMiddag;
  categoriesMellanmal;
  categoriesEfterrett;
  allCategories;
  recipe2;
  constructor(private recipeService:ReadRecipesService,private dataService:DataserviceService) { 
    this.recipes=[]
    this.imageSources=new ImageLinks().imageSources;
  }
  test(item){console.log(item)}
  @Output() recipeEvent=new EventEmitter<Recipe>()
  sendRecipe(item){    
    this.recipeService.getRecipe(item.name).subscribe(res=>{
     this.recipeList=res.json()
     this.recipe=this.recipeList[0]
     console.log(this.recipe)
     this.recipeEvent.emit(this.recipe)
    }, error=>{
      alert('An unexpected error occurred')    
    }) 
   
  }
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
  this.recipeService.getRecipesEfterret().subscribe(
    res=>{
      this.recipes=res.json();      
      this.categoriesEfterrett= this.recipes.length              
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
