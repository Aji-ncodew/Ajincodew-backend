export class Blog{
    constructor(
        public _id: string, 
        public updateDate:Date, 
        public author:string, 
        public publishDate:Date,
        public description:string,
        public title:string
    ){}
}