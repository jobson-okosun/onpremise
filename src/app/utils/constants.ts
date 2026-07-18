import { SystemCheckItem } from "../services/system-check/system-check";

export const MINIMUM_REASONABLE_DOWNLOAD_SPEED = 0.6
export const MINIMUM_REASONABLE_DOWNLOAD_SPEED_OFFSET = 0.4
export const NETWORK_RETRY_INTERVAL = 120_000 // 2 minutes

export const APP_VERSION = '0.5.8'
export const APP_BRANDING = {
  logo: 'EXPryLogoHor.png'
  // logo: 'jamb-logo.jpg',
}
export const DRAWING_AND_WRITING_BRUSH_COLORS = ['#000000', '#007aff', '#34c759']
export const SLIDES = [
  {
    title: 'Timer',
    description: 'Helps you keep track of attempted, unattempted, and revisited questions.',
    image: 'guide/02.png',
    animation: 'animate__fadeIn'
  },
  {
    title: 'Network status',
    description: 'Shows the status of your network connection during the exam.',
    image: 'guide/15.png',
    animation: 'animate__slideInDown'
  },
  {
    title: 'Network disconnection',
    description: 'Alerts you if your network gets disconnected during the exam.',
    image: 'guide/13.png',
    animation: 'animate__fadeIn'
  },
  {
    title: 'Need a calculator?',
    description: 'Click the calculator icon to open a basic calculator.',
    image: 'guide/03.png',
    animation: 'animate__slideInDown'
  },
  {
    title: 'Font size?',
    description: 'Adjust the font size for easier reading during the exam.',
    image: 'guide/04.png',
    animation: 'animate__fadeIn'
  },
  {
    title: 'Question Progress',
    description: 'Helps you monitor your progress, showing attempted and unattempted questions.',
    image: 'guide/05.png',
    animation: 'animate__slideInDown'
  },
  {
    title: 'Question numbering',
    description: 'Displays question numbers for easier navigation through the exam.',
    image: 'guide/08.png',
    animation: 'animate__slideInDown'
  },
  {
    title: 'Question layout',
    description: 'Shows the layout of each question for a better overview.',
    image: 'guide/11.png',
    animation: 'animate__fadeIn'
  },
  {
    title: 'Subject selection',
    description: 'Select the subjects you want to attempt in the exam.',
    image: 'guide/05.png',
    animation: 'animate__slideInDown'
  },
  {
    title: 'Clear selection',
    description: 'Clears your current subject selections if needed.',
    image: 'guide/14.png',
    animation: 'animate__slideInDown'
  },
  {
    title: 'All subject attempts',
    description: 'Shows your attempt status across all subjects.',
    image: 'guide/09.png',
    animation: 'animate__fadeIn'
  },
  {
    title: 'Current subject attempts',
    description: 'Shows your attempt status for the current subject.',
    image: 'guide/07.png',
    animation: 'animate__slideInDown'
  },
  {
    title: 'Submit Exam',
    description: 'Click the submit button to finalize and submit your exam.',
    image: 'guide/12.png',
    animation: 'animate__fadeIn'
  },
  {
    title: 'Navigation system',
    description: 'Use the navigation tools to move between questions easily.',
    image: 'guide/06.png',
    animation: 'animate__slideInDown'
  },
  {
    title: 'Keyboard shortcuts',
    description: 'Use keyboard shortcuts to navigate and select options efficiently.',
    image: 'guide/10.png',
    animation: 'animate__fadeIn'
  }
];
export const SYSTEM_DEFAULT_CHECKS: SystemCheckItem[] = [
  {
    id: 'internet',
    label: 'Internet Connection',
    description: 'Checking if you are connected to the internet...',
    status: 'pending',
    critical: true,
  },
  {
    id: 'webrtc',
    label: 'Video Streaming',
    description: 'Checking if video streaming is supported...',
    status: 'pending',
    critical: true,
  },
  {
    id: 'mediaDevices',
    label: 'Camera & Microphone',
    description: 'Checking if camera and microphone are available...',
    status: 'pending',
    critical: true,
  },
  {
    id: 'speed',
    label: 'Download Speed',
    description: 'Checking your download speed...',
    status: 'pending',
    critical: false,
  },
  {
    id: 'upload',
    label: 'Upload Speed',
    description: 'Checking your upload speed...',
    status: 'pending',
    critical: true,
  },
  {
    id: 'latency',
    label: 'Response Time (Latency)',
    description: 'Checking how fast your connection responds...',
    status: 'pending',
    critical: false,
  },
  {
    id: 'screen',
    label: 'Screen Size',
    description: 'Checking your display size...',
    status: 'pending',
    critical: false,
  },
]
