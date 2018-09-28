


export class Ingredient {
    Naringsvarden:{ Naringsvarde:any[]}
    constructor(){   this.Naringsvarden={Naringsvarde:[]}        }
    Nummer:string;
    Namn:string;
    n
    units:number;
    unitEquivalentInGrams:number;
    ViktGram:string;
    Huvudgrupp:string;
    
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