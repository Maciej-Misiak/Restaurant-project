import { ObjectId } from "mongodb";

export default class stolik {
    constructor(
        public nazwa: string,
        public iloscOsob: string,
        public status: string,
    ){}
}