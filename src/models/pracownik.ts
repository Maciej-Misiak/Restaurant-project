import { ObjectId } from "mongodb";

export default class pracownik {
    constructor(
        public imie: string,
        public nazwisko: string,
        public stanowisko: string,
    ){}
}