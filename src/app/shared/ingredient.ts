import { Naring } from "./narig";

export class Ingredient {
    constructor(){}
    Nummer:number;
    Namn:string;
    units:number;
    unitEquivalentInGrams:number;
    ViktGram:string;
    Huvudgrupp:string;
    Naringsvarden:{
        Naringsvarde:Naring[]}
        get unit (){
         return this.units;
        }
        get unitEquivalentInGram (){
            return this.unitEquivalentInGrams;
           }
        set unit(unit:number) {
            this.units=unit;
         }
         set unitEquivalentInGram(unitingram:number) {
            this.unitEquivalentInGrams=unitingram;
         }

}