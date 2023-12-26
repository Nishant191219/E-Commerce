export interface signUp{
    name:string,
    email:string,
    password:string
}
export interface login{
    email:string,
    password:string
}
export interface product{
    name:string,
    color:string,
    price:number,
    category:string,
    description:string,
    id:number,
    image:string,
    quantity: undefined | number
}