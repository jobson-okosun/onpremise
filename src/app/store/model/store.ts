import { BatteryStatus, IAssessmentPreLoginData, ICandidateItem, ICandidateLoginResponse, ICandidationEndExamResponse, StoreSection } from "./types";

export class StoreDTO { 
    preloginData: null | IAssessmentPreLoginData
    candidatePassport: null | any
    organizationAssets: null | { logo: null | string, hasLogo: boolean }
    loginData: null | ICandidateLoginResponse
    sections: StoreSection[]
    currentSection: null | StoreSection
    currentQuestion: null | ICandidateItem
    currentQuestionIndex: number
    examDuration: number
    platformIsTauri: boolean
    isServerConnected: boolean
    batteryStatus: BatteryStatus
    endExamResponse: ICandidationEndExamResponse
    appIsPinned: boolean
    infridgementMessage: null | string
    exitApplicationMessage: string
    showCloseAppWithPasswordModal: boolean
    drawingAndWritingConfig: {
        layoutFullMode: boolean,
        layoutFullModeWidth: number
        canvasContainerHeight: number,
        roughWorkMode: boolean
    }

    constructor() {
        this.preloginData = null
        this.organizationAssets = null
        this.candidatePassport = null
        this.loginData = null
        this.sections = []
        this.currentSection = null
        this.currentQuestion = null
        this.currentQuestionIndex = 0
        this.examDuration = 0
        this.platformIsTauri = false
        this.isServerConnected = true
        this.appIsPinned = true
        this.drawingAndWritingConfig = { 
            layoutFullMode: true,
            layoutFullModeWidth: 0,
            canvasContainerHeight: 1000,
            roughWorkMode: false
         }
    }
}

export interface StoreType {  
    preloginData: null | IAssessmentPreLoginData,
    organizationAssets: {
        logo: null | string,
        hasLogo: boolean
    },
    loginData: null | ICandidateLoginResponse
}