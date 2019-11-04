export class Produto {
    id: string; 
    nome: string; 
    descricao: string; 
    categoria:string;
    quant: number; 
    valor: number; 
    ativo: boolean = true;
    foto:string;
    galeria:string[]=[];
    lat:number;
    lng:number;
}
