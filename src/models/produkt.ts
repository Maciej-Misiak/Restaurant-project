import { ObjectId } from "mongodb";

export default class produkt {
    constructor(
        public nazwa: string,
        public cena: number,
        public ilosc: number,
        public jednostkaMiary: string,
    ){}
}