import { APP_BRANDING, APP_VERSION } from "../../utils/constants";
import { BatteryStatus, IAssessmentPreLoginData, ICandidateItem, ICandidateLoginResponse, ICandidationEndExamResponse, StoreSection } from "./types";

export class StoreDTO { 
    preloginData: null | IAssessmentPreLoginData
    candidatePassport: null | any
    organizationAssets: null | { 
        logo: null | string, 
        hasLogo: boolean, 
        defaultLogo: string,
        currentYear: string,
        showBranding: boolean 
        version: string
    }
    currentRoute: { 
        title?: string, 
        url?: string, 
        queryParams?: { [key: string]: any } 
    }
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
        this.organizationAssets = { 
            logo: '',
            hasLogo: false,
            defaultLogo: APP_BRANDING.logo,
            showBranding: true,
            currentYear: new Date().getFullYear().toString(),
            version: APP_VERSION
        },
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