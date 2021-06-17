export enum SubjectCategory
{
    userExperiencesAndStories="UserExperiencesAndStories",
    aboutKhamsat="AboutKhamsat",
    notFoundService="NotFoundService",
    modelsImplemented="ModelsImplemented"
}
export class KhamsatCommunity {
    constructor(
        public ID:number,
        public Content:String, 
        public Title:String,
        public Subject:SubjectCategory,
        public Comments:String,
        public UserID:number,


    ){}
}