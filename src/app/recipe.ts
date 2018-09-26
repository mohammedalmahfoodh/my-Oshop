import { Naringsvarde } from "./Naringsvarde";

export interface Recipe{
    id: string ;
     nummer: number ;
    namn:string ;
     viktGram:number;
    huvudGrupp:string;
     naringsvarde:Naringsvarde[];
}