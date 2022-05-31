import { ObjectId } from "mongodb";

export default class danie {
    constructor(
        public nazwa: string,
        public cena: number,
        public kategoria: string,
    ){}
}