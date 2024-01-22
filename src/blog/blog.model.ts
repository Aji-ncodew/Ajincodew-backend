export class blog{
    constructor(
        public id: string, 
        public updateDate:Date, 
        public author:string, 
        public publishDate:Date,
        public description:string,
        public title:string
    ){}
}