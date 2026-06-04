export interface Resume {
    id : string
    fileName  : string
    content : string
    uploadedAt : Date
}

export interface AnalysisResult {
    resumeId : string
    score : number
    feedback : string
    strengths : string[]
    improvements : string []
    createdAt : Date
}