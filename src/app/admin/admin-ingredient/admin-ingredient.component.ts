import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient';
import { IngredieantsService } from '../../services/ingredieants.service';
import { Observable } from 'rxjs';
import { startWith,map } from 'rxjs/operators';


@Component({
  selector: 'app-admin-ingredient',
  templateUrl: './admin-ingredient.component.html',
  styleUrls: ['./admin-ingredient.component.css']
})
export class AdminIngredientComponent implements OnInit {
  emptyVlue;
  emptyVlue2;
  createIndredient: FormGroup;
  ingredientNsringsvarden: FormGroup;
  
  ingredient=new Ingredient()
  Naringsvarden;
  Naringsvarde=[];
  naringsObject;
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  myControl = new FormControl();


  constructor( private  ingredientService:IngredieantsService ) {  }
  
  test() {
    console.log(this.createIndredient.get('ingredientNsringsvarden'))
  // console.log(this.createIndredient.status)
  // console.log(this.ingredientName.value)
  // console.log(this.ingredientHuvudgrupp.value)
 //  console.log(this.ingredientNumber.value)
 //  console.log(this.ingredientHuvudgrupp.value)
  // console.log(this.ingredientName.value)

    // this.ingredient.Namn=this.ingredientName.value
     // console.log(this.ingredient.Namn)
  }

  addNNaringsvarde(){   
    
    if(this.NaringsvardeState){
      this.emptyVlue=''      
    this.naringsObject.Namn=this.myControl.value;    
    this.naringsObject.Varde=this.naringsVardeVarde.value;
    this.naringsObject.Enhet=this.naringsVardeEnhet.value;
    this.Naringsvarde.push(this.naringsObject)
   
     this.createIndredient.get('ingredientNsringsvarden').reset()     
     
     this.naringsObject={}
    }else{
     this.emptyVlue='You have to fill out the feilds above'
    }
    console.log(this.Naringsvarde)
    console.log(this.createIndredient.get('ingredientNsringsvarden').status)
  }
  get NaringsvardeState(){
    if(this.myControl.value&&this.naringsVardeVarde.value && this.naringsVardeEnhet.value)
   return true
 }

  get ingredientName() {
    return this.createIndredient.get('ingredientName')
  }
  get naringsVarde() {
    return this.createIndredient.get('naringsVarde')
  }
  get ingredientNumber() {
    return this.createIndredient.get('ingredientNumber')
  }

  get ingredientViktGram() {
    return this.createIndredient.get('ingredientViktGram')
  }

  get ingredientHuvudgrupp() {
    return this.createIndredient.get('ingredientHuvudgrupp')
  }

  get naringsVardeNamn() {
    return this.createIndredient.get('ingredientNsringsvarden.naringsVardeNamn')
  }
  get naringsVardeVarde() {
    return this.createIndredient.get('ingredientNsringsvarden.naringsVardeVarde')
  }
  get naringsVardeEnhet() {
    return this.createIndredient.get('ingredientNsringsvarden.naringsVardeEnhet')
  } 

  ngOnInit() {
    this.getNaringsVardeNames()
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );          

    this.ingredient=new Ingredient()
    this.Naringsvarden = {}, this.Naringsvarde = [],this.naringsObject={}
    this.createIndredient = new FormGroup({
      ingredientName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      ingredientNumber: new FormControl('', (Validators.required)),
      ingredientViktGram: new FormControl('', (Validators.required)),
      ingredientHuvudgrupp: new FormControl('', (Validators.required)),
      
      ingredientNsringsvarden: new FormGroup({
        naringsVardeNamn: new FormControl('',Validators.required),
        naringsVardeVarde: new FormControl('', Validators.required),
        naringsVardeEnhet: new FormControl('', Validators.required),
      })
    })
  }

 //#### filter method for NaringsVarde names autocomplete    
 private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();
  // return this.options.filter(option => option.toLowerCase().includes(filterValue));
  return this.options.filter(option => option.toLowerCase().
    indexOf(filterValue) == 0);
}

  //######## Get NaringsVarde names ##############
 getNaringsVardeNames() {
  this.ingredientService.getNaringsvardeNames().subscribe(
    res => {      
      this.options = res.json();
    },
    error => {
      alert('An unexpected error occurred')
      console.log(error);
    });
}  

  saveIngredient() {    
    this.ingredientService.createIngredient(this.ingredient).subscribe(      
      (res) => {        
       console.log(this.ingredient ) ;
       
      });
  }

//#### remove an nutritional value 
removedNutritionalValue(naringsvatde){
  for(let naring of this.Naringsvarde){
    if(naringsvatde.Namn==naring.Namn){
     const index = this.Naringsvarde.indexOf(naring, 0);        
       this.Naringsvarde.splice(index, 1);       
    }
  }
}


  createIngredient() {
   if(this.ingredientName.valid && this.ingredientNumber.valid && this.ingredientViktGram.valid
     && this.ingredientHuvudgrupp.valid && this.Naringsvarde.length>0 ){
      this.ingredient.Namn=this.ingredientName.value
      this.ingredient.Nummer=this.ingredientNumber.value
      this.ingredient.ViktGram=this.ingredientViktGram.value
      this.ingredient.Huvudgrupp=this.ingredientHuvudgrupp.value
      this.ingredient.Naringsvarden.Naringsvarde=this.Naringsvarde
      

      this.ingredientService.createIngredient(this.ingredient).subscribe(      
        (res) => {        
         console.log(this.ingredient ) ;
         
        });

      console.log(this.ingredient)
     }else{
       this.emptyVlue2='You have to fill out above fields'
     }
   
  }

  
}
