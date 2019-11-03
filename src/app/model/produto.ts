export class Produto {
    id: string; 
    nome: string; 
    categoria: string; 
    console: string; 
    descricao: string; 
    quant: number; 
    valor: number; 
    ativo: boolean = true;
    foto:string;
    galeria:string[]=[];
    lat:number;
    lng:number;
}
