import { DataserviceService } from './../../services/dataservice.service';
import { Recipe } from './../../shared/recipe';
import { ReadRecipesService } from './../../services/read-recipes.service';
import {  OnInit, OnChanges, Output,EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith, toArray} from 'rxjs/operators';
import { Component } from '@angular/core';
import { IngredieantsService } from '../../services/ingredieants.service';
import { Ingredient } from '../../shared/ingredient';


@Component({
  selector: 'app-home-search',
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.css',],
 
})

export class HomeSearchComponent implements OnInit,OnChanges  {
  recipe:Recipe;
  constructor(private getRecipes:ReadRecipesService,private dataService:DataserviceService,
    private getingredieant:IngredieantsService) {this.recipe=new Recipe() }

  disabled = new FormControl(false);
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
//#### send object to home component ####### 
  @Output() recipeEvent=new EventEmitter<Recipe>()
  sendRecipe(){
    this.recipeEvent.emit(this.recipe)
  }
  //########## send recipe to display page #########
  sendToDisplay(){
    this.dataService.changeRecipe(this.recipe2)    
   }

  ngOnChanges() {
    this.getRecipesNames()
    
  } 
  
  
  recipe2;
 recipesNames:string[];
 recipes:any[];
 recipeReady:boolean=false
  
  testVariable='';
  recipeNamesObjects:any=[{name:''}];
  title;
  photo;
  desicription;
  
  test(){
    console.log(this.myControl.value)
   
  }
  ngOnInit() {
    this.getRecipesNames()       
      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
           );

      this.getRecipes.getRecipes().subscribe(res=>{
      this.recipes=res.json();    
          
         })              
         this.dataService.currentRecipe.subscribe(recipe=>this.recipe2=recipe)
  }
     private _filter(value: string): string[] {
     const filterValue = value.toLowerCase();
     return this.options.filter(option => option.toLowerCase().indexOf(filterValue)==0);
     }
     


  //##### get a ingredient ##############3
  getingredient(){
    if(this.myControl.value.length>=2){            
      this.getingredieant.getINgredientObservable(this.myControl.value).subscribe(res=>{
      let ingredient=<Ingredient>res;
     console.log(ingredient)
    }, error=>{
     alert('An unexpected error occurred')    
   })  
   }else
      alert('Please provide at least two letters')
    if(this.myControl.value==''||this.myControl.value==null)
      alert('Please insert a recipe name')
  }


  cheackrecipeReady(){
    return this.recipeReady;
  }

  //##### get a recipe ##############3
     getARecipe(){
     if(this.myControl.value.length>=2){      
       console.log(this.myControl.value)   
       let recipeArray:Recipe[];   
       this.getRecipes.getRecipe(this.myControl.value).subscribe(res=>{
        recipeArray=res.json();
        this.recipe=recipeArray[0]
        this.recipe2=recipeArray[0]
       console.log(this.recipe._desicription)
       this.recipeReady=true;
       this.title=this.recipe._name;
      this.photo=this.recipe._urlToImg;
       this.desicription=this.recipe._desicription
     }, error=>{
      alert('An unexpected error occurred')    
    })  
    }else
       alert('Please provide at least two letters')
     if(this.myControl.value==''||this.myControl.value==null)
       alert('Please insert a recipe name')
   }
//######## Get recipes names##############
getRecipesNames(){
  this.getRecipes.getRecipesNames().subscribe(
    res=>{
      this.recipesNames=res.json();
      this.options=res.json();
 },
  error=>{
    alert('An unexpected error occurred')
    console.log(error);
  });
  
 }

//######## Get one recipe name ##############

  getArecipeName(searchInput){
  this.getRecipes.getRecipeName(searchInput).subscribe(
     res=>{
       this.recipesNames=res;
  },
   error=>{
     alert('An unexpected error occurred')
     console.log(error);
   });
 }
  
 

  }