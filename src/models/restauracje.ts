import { ObjectId } from "mongodb";

export default class restauracje {
    constructor(
        public nazwa: string,
        public adres: string,
        public telefon: string,
        public nip: string,
        public email: string,
        public www: string,
        public id?: ObjectId
    ){}
}