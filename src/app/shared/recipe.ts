import { Ingredient } from "./ingredient";


export class Recipe {

   _name: string;
   _persons: number
  _category: string
   _instructions: string[]
   _desicription: string
   _ingredients: Ingredient[]
   _urlToImg: string;
 
  constructor(){
    this._instructions=[]
    this._ingredients=[]
  }
  /////######## getters #############
  get name(): string {
    return this._name;
  }
  get persons(): number {
    return this._persons;
  }
  get category(): string {
    return this._category;
  }
  get instructions(): string[] {
    return this._instructions;
  }
  get desicription(): string {
    return this._desicription;
  }
  get ingredients(): Ingredient[] {
    return this._ingredients;
  }
  get urlToImg(): string {
    return this._urlToImg;
  }
 
//######## setters ##################

set name(name:string) {
   this._name=name;
}
set persons(persons:number) {
  this._persons=persons;
}

set category(category:string) {
  this._category=category;
}
setInstruction(instruction:string) {
  this._instructions.push(instruction);
}
setIngredient(ingredient:Ingredient) {
  this._ingredients.push(ingredient);
}
set urlToImg(url:string) {
  this._urlToImg=url;
}
set desicription(description:string) {
  this._desicription=description;
}



}