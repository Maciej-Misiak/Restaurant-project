import { ObjectId } from "mongodb";

export default class rezerwacja {
    constructor(
        public stolik: string,
        public start: Date,
        public koniec: Date,
        public klient: string,
    ){}
}