

export interface QuestionResponse {
    count:number,
    next:null|number,
    previous: null | number,
    results: [QuestionDetail]
}

export interface QuestionDetail {
    id:Readonly<number>,
    subject:string,
    content:string,
    create_date:string,
    modify_date:string
}