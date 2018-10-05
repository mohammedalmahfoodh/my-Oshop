import { Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, NgForm } from '@angular/forms';
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

  //#### constructor ##########
  constructor(private ingredieantService: IngredieantsService,
    private recipeService: ReadRecipesService, private dataService: DataserviceService) {
    this.recipe = new Recipe(); this.ingredient = new Ingredient()
  }

  ///##### ngOnInit method #########
  ngOnInit() {
    this.getIngredientsNames()
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    this.dataService.currentRecipe.subscribe(recipe => this.recipe2 = recipe)
  }

  //#### filter method for ingredients names autocomplete    
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    // return this.options.filter(option => option.toLowerCase().includes(filterValue));
    return this.options.filter(option => option.toLowerCase().
      indexOf(filterValue) == 0);
  }

  ///###### Variables #######

  @ViewChild('form')recipeForm:NgForm;
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  myControl = new FormControl();
  recipe: Recipe;
  recipeInstruction: string;
  url: any;
  ingredient: Ingredient;
  categories: string[] = ['Efterrätt', 'Middag', 'Mellanmål'];
  recipe2;
  ingredientUnits: number;
  ingredientUnitInGrams: number;
  ingredients;

  //### submit form ####3
  onSubmit(){
    this.recipe.name=this.recipeForm.controls.name.value;
    this.recipe.category = this.recipeForm.controls.category.value;
    this.recipe.persons = 1
   if(this.recipe._urlToImg=='')
       this.recipe._urlToImg=this.url
       this.recipe.desicription = this.recipeForm.controls.description.value;
    this.saveRecipe();
    this.sendToDisplay(this.recipe)   
   // console.log(this.recipeForm)
   // console.log(this.recipe)
  }
  resetForm(){
    this.recipeForm.reset();  

  }
//### add and track instructions state ##########
  addInstruction() {
    this.recipe.setInstruction(this.recipeForm.controls.instruction.value)
    this. recipeInstruction=''
  }
  instructionStatus: boolean;
  checkInstruction(): boolean {
    if (this.recipe._instructions && this.recipe._instructions.length > 0)
      return true;
  }

////###### add ingredients #########
  addIngredient() {
    this.getingredient2()
    this.ingredient.unit = this.recipeForm.controls.units.value
    this.ingredient.unitEquivalentInGram = this.recipeForm.controls.unitEquivalentInGrams.value

  }
  //#### remove an ingredient 
  removeIngredient(ingreduent){
     for(let ingr of this.recipe.ingredients){
       if(ingreduent.Namn==ingr.Namn){
        const index = this.recipe.ingredients.indexOf(ingr, 0);        
          this.recipe.ingredients.splice(index, 1);       
       }
     }
  }
  
  //##### get an ingredient ##############
  getingredient2() {
    if (!this.checkIngredientInRecipe()) {
      let str: string;
      let ingName: string = String(this.myControl.value)
      if (ingName.length >= 2) {
        str = ingName
        //### fix % char in url address ######
        if (ingName.includes("%")) {
          str = ingName.replace(/%/g, "%25")
        }
        this.ingredieantService.getINgredientObservable(str).subscribe(res => {
          let ingredientDB = <Ingredient>res;               
          this.ingredient = ingredientDB
          this.ingredient.unit = this.ingredientUnits
          this.ingredient.unitEquivalentInGram = this.ingredientUnitInGrams                    
          this.calculateNarings()
          this.recipe.setIngredient(this.ingredient)     
          this.myControl.setValue('')
          this.recipeForm.controls.units.setValue('')
          this.recipeForm.controls.unitEquivalentInGrams.setValue('')
          console.log(this.recipe.ingredients)
        }, error => {
          alert('An unexpected error occurred here is')
        })
      }
    } else {
      return
    }
  }
  
  //###### check if an ingredient is already exists in recipe #######
  checkIngredientInRecipe(): boolean {
    let ingName: string = String(this.myControl.value)
    if (ingName == '' || ingName == ' ')
      return true
    for (let ingre of this.recipe.ingredients) {
      if (ingName == ingre.Namn)
        return true
    }
  }
  ////####### calculate nutritional values according to units and unit in gram gathered from user
  calculateNarings() {
    let naring = this.ingredient.Naringsvarden.Naringsvarde
   // console.log(naring)
    for (let newVal of naring) {
      newVal.Varde = newVal.Varde * (this.ingredient.unitEquivalentInGram * this.ingredient.unit) / 100
      newVal.Varde=newVal.Varde.toFixed(2)
    }
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

 
  imageLinkStatus: boolean;
  setImageLink() {
    this.recipe._urlToImg=this.recipeForm.controls.imageLink.value
    this.url=''
    if(this.recipe._urlToImg!='')
      this.imageLinkStatus=true
  }  
//##### browse computer for uploading a fhoto
  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = (<FileReader>event.target).result;
         this.recipe._urlToImg=''
        this.imageLinkStatus=true
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  //###### post a recipe #####
  saveRecipe() {
    this.recipeService.createRecipe(this.recipe).subscribe(
      (res) => {
        console.log(this.recipe);

      });
  }
  ///###### send object of the recipe to success rout
  sendToDisplay(reci) {
    this.dataService.changeRecipe(reci)
  }
  
  
  
 
  
  
  
  
 

  
 

}
