import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient';
import { IngredieantsService } from '../../services/ingredieants.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Recipe } from '../../shared/recipe';
import { ReadRecipesService } from '../../services/read-recipes.service';
import { DataserviceService } from '../../services/dataservice.service';


@Component({
  selector: 'app-admin-recipe',
  templateUrl: './admin-recipe.component.html',
  styleUrls: ['./admin-recipe.component.css']
})
export class AdminRecipeComponent implements OnInit {
  constructor(private ingredieantService: IngredieantsService ,
    private recipeService:ReadRecipesService,private dataService:DataserviceService) { 
    this.recipe=new Recipe();this.ingredient=new Ingredient()}
    log(){
      console.log(this.options)
     
    }
    addInstruction(){        
      this.recipe.setInstruction(this.recipeInstruction)
      this.recipeInstruction=''
    }
    nameStatus:boolean;
     checkRecipeName():boolean{
       return this.nameStatus?this.recipeName=='':this.recipeName!=''
     }

      instructionStatus:boolean;
     checkInstruction():boolean{       
       if(this.recipe._instructions.length==0)
       return true;
     }
 


  myControl = new FormControl();
  ingredient: Ingredient;
  ingredients;
  recipe:Recipe;
  ////######Form variables #########

  options: string[] = [];
  filteredOptions: Observable<string[]>;  
  favoriteSeason: string;
  categories: string[] = ['Efterrätt', 'Middag', 'Mellanmål'];
  recipeName:string;
  recipeCategory:string;
  recipeInstruction:string;
  ingredientUnits:number;
  ingredientUnitInGrams:number;
  imageLink:string;
  description:string;
  recipe2;
  ////###### get recipe name from user ######
  saveRecipe() {    
    this.recipeService.createRecipe(this.recipe).subscribe(      
      (res) => {        
       console.log(this.recipe ) ;

       // console.log(this.reci)
      });

  }


  sendToDisplay(reci){
    this.dataService.changeRecipe(reci)    
       }
  logRecipe(){
    this.recipe.name=this.recipeName
    this.recipe.category=this.recipeCategory
    this.recipe.persons=1
    this.recipe.urlToImg=this.imageLink
    this.recipe.desicription=this.description
    this.saveRecipe();
    this.sendToDisplay(this.recipe)
    
  }
  
  addIngredient(){
    this.getingredient2()
       this.ingredient.unit=this.ingredientUnits
        this.ingredient.unitEquivalentInGram=this.ingredientUnitInGrams     
   
              }
   submit(x){
     if(!x.dirty)  
       console.log('no data')
     
      // console.log(x)
     }

  ngOnInit() {
    this.getIngredientsNames()
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
      this.dataService.currentRecipe.subscribe(recipe=>this.recipe2=recipe)
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
   // return this.options.filter(option => option.toLowerCase().includes(filterValue));
   return this.options.filter(option => option.toLowerCase().
   indexOf(filterValue)==0 );
   
  }
  
  //######## Get ingredients names ##############
  getIngredientsNames() {
    this.ingredieantService.getIngredientsNames().subscribe(
      res => {
        //this.recipesNames = res.json();
        this.options = res.json();
      },
      error => {
        alert('An unexpected error occurred')
        console.log(error);
      });

  }


  test() {
    let str: string;
    let ingName: string = String(this.myControl.value)
    if (ingName.includes('%')) {
      console.log(ingName + '  has   ok')
    } else {
      console.log('no')
    }
    /*
    Naringsvarden:
Naringsvarde: Array(7)
0: {Namn: "Summa enkelomättade fettsyror", Varde: 28.8}
1: {Namn: "Summa fleromättade fettsyror", Varde: 2.76}
2: {Namn: "Summa mättade fettsyror", Varde: 35.8}
3: {Namn: "Protein", Varde: 7}
4: {Namn: "Kolhydrater", Varde: 0}
5: {Namn: "Salt", Varde: 0.03}
6: {Namn: "Energi (kcal)", Varde: 656}
    */
  }


 //##### get an ingredient ##############
  getingredient2() {
   if(!this.checkIngredientInRecipe()){     
    
    let str: string;
    let ingName: string = String(this.myControl.value)
    if (ingName.length >= 2) {
      str = ingName
      //### fix % char in url address ######
      if (ingName.includes("%")) {
        str = ingName.replace(/%/g,"%25")
      }
      this.ingredieantService.getINgredientObservable(str).subscribe(res => {
        let ingredientDB = <Ingredient>res;
      //  console.log(ingredientDB)       
        this.ingredient=ingredientDB   
         
        this.ingredient.unit=this.ingredientUnits
        this.ingredient.unitEquivalentInGram=this.ingredientUnitInGrams
          console.log(this.ingredient) 
      //console.log(this.ingredientUnits)
      //console.log(this.ingredientUnitInGrams)
      this.calculateNarings()
       this.recipe.setIngredient(this.ingredient)   
        //  console.log(ingredientDB)    
       //console.log(this.recipe.ingredients)
      }, error => {
        alert('An unexpected error occurred here is')
      })
    }
  }else{
    return
  }
}
  checkIngredientInRecipe():boolean{
    let ingName: string = String(this.myControl.value)
    if(ingName==''||ingName==' ')
    return true
    for(let ingre of this.recipe.ingredients){
      if(ingName==ingre.Namn)
      return true
    }
  }
  calculateNarings(){
    let naring=this.ingredient.Naringsvarden.Naringsvarde
    console.log(naring)
    for(let newVal of naring){
       newVal.Varde=newVal.Varde*(this.ingredient.unitEquivalentInGram*this.ingredient.unit)/100 
      }
   
  }
  
}
