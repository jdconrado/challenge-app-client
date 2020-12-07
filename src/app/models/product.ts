export default class Product{
    id?: number;
    title?: string;
    price?: number;
    stock?: number;
    createdAt?: Date;
    updatedAt?: Date;
    category:{
        id?: number,
        name?: string
    };
    userId?: number;
    constructor(){
        this.category= {};
    }
}

export class Filters{
    title?: string;
    categoryId?:number;
    price?: {
        from: number,
        to: number
    };
    stock?: {
        from: number,
        to: number
    };
    page: number;

    constructor(){
        this.page = 0;
    }
}