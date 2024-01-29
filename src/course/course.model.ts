export class Course{
    constructor(
        public _id: string,
        public image: string,
        public type: string,
        public title: string,
        public speakers: string[],
        public year: string,
        public duration: string,
        public link: string
    ){}
}