import { ObjectId } from "mongodb";

export default class zamowienie {
    constructor(
        public pracownik: string,
        public pozycje: string,
        public status: string,
        public stolik: string,
        public kwota: number,
    ){}
}