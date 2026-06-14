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



export const preloginData = {
  "name": "Unified Tertiary Entrance Exam",
  "description": "A standardized assessment covering English, Mathematics and General Knowledge.",
  "login_field": "Registration Number",
  "id": "ASSESS-2025-001",
  "unique_id": "UTEE-2025-AB12",
  "passport_location": "https://media.licdn.com/dms/image/v2/C4D03AQFuOnZBeYu3Eg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1659926808385?e=2147483647&v=beta&t=cJY8qk_AJcEdxVilVITtFXiQqUpZo8vostjYfkT3MR8",
  "delivery_method": "ON_PREMISE_NO_SECURE_BROWSER"
}

export const loginData = {
  "candidate_data": {
    "name": "John doe. paul",
    "id": "CAND-10023",
    "minutes_left": 89,
    "seconds_left": 45,
    "login_field_value": "JD87392",
    "section_ids": [
      "SEC-ENG-1",
      "SEC-MATH-2"
    ],
    "login_times": [],
    "passport": "https://cdn.example.com/passports/john_doe.png"
  },
  "sections_overview": [
    {
      "duration": 40,
      "name": "English Language",
      "total_questions": 5
    },
    {
      "duration": 45,
      "name": "Mathematics",
      "total_questions": 3
    }
  ],
  "assessment_data": {
    "name": "Unified Tertiary Entrance Exam",
    "start_exam_instruction": "Read the instructions carefully before answering.",
    "end_exam_instruction": "Ensure you have reviewed your answers before submitting.",
    "duration_minutes": 120,
    "display_all_sections_at_once": false,
    "instruction_read_time_sec": 120,
    "warn_end_of_reading_time_sec": 30,
    "auto_save_sec": 15,
    "inactivity_waring_sec": 4,
    "warn_unattempted_questions": true,
    "end_exam_confirmation": true,
    "allow_end_exam_after_xquestions": 0,
    "preserve_section_order": true,
    "font_size": "DEFAULT",
    "compensatory_time_value": 10,
    "exam_type": 'EXAMALPHA'
  },
  "sections_questions": [
    {
      "id": "SEC-ENG-1",
      "name": "BIOLOGY",
      "section_settings": {
        "minutes_left": 40,
        "seconds_left": 0,
        "duration_in_minutes": 40,
        "shuffle_items": false,
        "shuffle_options": true,
        "allow_calculator": false,
        "shuffle_blocks": false,
        "prevent_navigation_to_attempted_items": false,
        "section_instruction": "Answer all questions."
      },
      "question_blocks": [
        {
          "id": 101,
          "index": 1,
          "block_type": "SINGLE_QUESTIONS",
          "total_questions": 3,
          "items": [
            {
              "id": "ENG-Q9",
              "stimulus": "Which word is a noun?",
              "options": [
                { "label": "Run", "value": "run" },
                { "label": "Beauty", "value": "beauty" },
                { "label": "Quickly", "value": "quickly" },
                { "label": "Blue", "value": "blue" }
              ],
              "item_type": "MCQ",
              "responses": [],
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Q91",
              "stimulus": "Which word is a noun?",
              "options": [
                { "label": "Run", "value": "run" },
                { "label": "Beauty", "value": "beauty" },
                { "label": "Quickly", "value": "quickly" },
                { "label": "Blue", "value": "blue" }
              ],
              "item_type": "MCQ",
              "responses": [],
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Q913",
              "stimulus": "Which word is a noun?",
              "options": [
                { "label": "Run", "value": "run" },
                { "label": "Beauty", "value": "beauty" },
                { "label": "Quickly", "value": "quickly" },
                { "label": "Blue", "value": "blue" }
              ],
              "item_type": "MCQ",
              "responses": [],
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Q9131",
              "stimulus": "Which word is a noun?",
              "options": [
                { "label": "Run", "value": "run" },
                { "label": "Beauty", "value": "beauty" },
                { "label": "Quickly", "value": "quickly" },
                { "label": "Blue", "value": "blue" }
              ],
              "item_type": "MCQ",
              "responses": [],
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Q9132",
              "stimulus": "Which word is a noun?",
              "options": [
                { "label": "Run", "value": "run" },
                { "label": "Beauty", "value": "beauty" },
                { "label": "Quickly", "value": "quickly" },
                { "label": "Blue", "value": "blue" }
              ],
              "item_type": "MCQ",
              "responses": [],
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Q91321",
              "stimulus": "Which word is a noun?",
              "options": [
                { "label": "Run", "value": "run" },
                { "label": "Beauty", "value": "beauty" },
                { "label": "Quickly", "value": "quickly" },
                { "label": "Blue", "value": "blue" }
              ],
              "item_type": "MCQ",
              "responses": [],
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Q913212",
              "stimulus": "Which word is a noun?",
              "options": [
                { "label": "Run", "value": "run" },
                { "label": "Beauty", "value": "beauty" },
                { "label": "Quickly", "value": "quickly" },
                { "label": "Blue", "value": "blue" }
              ],
              "item_type": "MCQ",
              "responses": [],
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Q9132122",
              "stimulus": "Which word is a noun?",
              "options": [
                { "label": "Run", "value": "run" },
                { "label": "Beauty", "value": "beauty" },
                { "label": "Quickly", "value": "quickly" },
                { "label": "Blue", "value": "blue" }
              ],
              "item_type": "MCQ",
              "responses": [],
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Q92",
              "stimulus": "Which word is a noun?",
              "options": [
                { "label": "Run", "value": "run" },
                { "label": "Beauty", "value": "beauty" },
                { "label": "Quickly", "value": "quickly" },
                { "label": "Blue", "value": "blue" }
              ],
              "item_type": "MCQ",
              "responses": [],
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Q93",
              "stimulus": "Which word is a noun?",
              "options": [
                { "label": "Run", "value": "run" },
                { "label": "Beauty", "value": "beauty" },
                { "label": "Quickly", "value": "quickly" },
                { "label": "Blue", "value": "blue" }
              ],
              "item_type": "MCQ",
              "responses": [],
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Q94",
              "stimulus": "Which word is a noun?",
              "options": [
                { "label": "Run", "value": "run" },
                { "label": "Beauty", "value": "beauty" },
                { "label": "Quickly", "value": "quickly" },
                { "label": "Blue", "value": "blue" }
              ],
              "item_type": "MCQ",
              "responses": [],
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Q95",
              "stimulus": "Which word is a noun?",
              "options": [
                { "label": "Run", "value": "run" },
                { "label": "Beauty", "value": "beauty" },
                { "label": "Quickly", "value": "quickly" },
                { "label": "Blue", "value": "blue" }
              ],
              "item_type": "MCQ",
              "responses": [],
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Q96",
              "stimulus": "Which word is a noun?",
              "options": [
                { "label": "Run", "value": "run" },
                { "label": "Beauty", "value": "beauty" },
                { "label": "Quickly", "value": "quickly" },
                { "label": "Blue", "value": "blue" }
              ],
              "item_type": "MCQ",
              "responses": [],
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Q97",
              "stimulus": "Which word is a noun?",
              "options": [
                { "label": "Run", "value": "run" },
                { "label": "Beauty", "value": "beauty" },
                { "label": "Quickly", "value": "quickly" },
                { "label": "Blue", "value": "blue" }
              ],
              "item_type": "MCQ",
              "responses": [],
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Q98",
              "stimulus": "Which word is a noun?",
              "options": [
                { "label": "Run", "value": "run" },
                { "label": "Beauty", "value": "beauty" },
                { "label": "Quickly", "value": "quickly" },
                { "label": "Blue", "value": "blue" }
              ],
              "item_type": "MCQ",
              "responses": [],
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Q99",
              "stimulus": "Which word is a noun?",
              "options": [
                { "label": "Run", "value": "run" },
                { "label": "Beauty", "value": "beauty" },
                { "label": "Quickly", "value": "quickly" },
                { "label": "Blue", "value": "blue" }
              ],
              "item_type": "MCQ",
              "responses": [],
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Q110",
              "stimulus": "Which word is a noun?",
              "options": [
                { "label": "Run", "value": "run" },
                { "label": "Beauty", "value": "beauty" },
                { "label": "Quickly", "value": "quickly" },
                { "label": "Blue", "value": "blue" }
              ],
              "item_type": "MCQ",
              "responses": [],
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Q111",
              "stimulus": "Which word is a noun?",
              "options": [
                { "label": "Run", "value": "run" },
                { "label": "Beauty", "value": "beauty" },
                { "label": "Quickly", "value": "quickly" },
                { "label": "Blue", "value": "blue" }
              ],
              "item_type": "MCQ",
              "responses": [],
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Q112",
              "stimulus": "Which word is a noun?",
              "options": [
                { "label": "Run", "value": "run" },
                { "label": "Beauty", "value": "beauty" },
                { "label": "Quickly", "value": "quickly" },
                { "label": "Blue", "value": "blue" }
              ],
              "item_type": "MCQ",
              "responses": [],
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Q113",
              "stimulus": "Which word is a noun?",
              "options": [
                { "label": "Run", "value": "run" },
                { "label": "Beauty", "value": "beauty" },
                { "label": "Quickly", "value": "quickly" },
                { "label": "Blue", "value": "blue" }
              ],
              "item_type": "MCQ",
              "responses": [],
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Q114",
              "stimulus": "Which word is a noun?",
              "options": [
                { "label": "Run", "value": "run" },
                { "label": "Beauty", "value": "beauty" },
                { "label": "Quickly", "value": "quickly" },
                { "label": "Blue", "value": "blue" }
              ],
              "item_type": "MCQ",
              "responses": [],
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Q115",
              "stimulus": "Which word is a noun?",
              "options": [
                { "label": "Run", "value": "run" },
                { "label": "Beauty", "value": "beauty" },
                { "label": "Quickly", "value": "quickly" },
                { "label": "Blue", "value": "blue" }
              ],
              "item_type": "MCQ",
              "responses": [],
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              id: 'ENG-Qasfasfa8',
              stimulus: "Which of the following words are coordinating conjunctions?",
              options: [
                { label: 'For', value: 'for' },
                { label: 'Although', value: 'although' },
                { label: 'Nor', value: 'nor' },
                { label: 'Because', value: 'because' },
              ],
              item_type: 'MRQ',
              responses: [],
              max_responses: 1,
              image_data: { image: '', width: null, height: null },
              drawing_writing_split_type: 'NONE',
              revisit: false,
            },
            {
              id: 'ENG-Q1asafaWD2',
              stimulus: "The word 'ostracize' means to welcome someone warmly into a group.",
              options: [
                { label: 'True', value: 'true' },
                { label: 'False', value: 'false' }
              ],
              item_type: 'TRUE_FALSE',
              responses: [],
              max_responses: 1,
              image_data: { image: '', width: null, height: null },
              drawing_writing_split_type: 'NONE',
              revisit: false,
            },
            {
              id: 'ENG-Q1safsfa4',
              stimulus: 'Is the word "ephemeral" used to describe something that lasts for a very long time?',
              options: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' }
              ],
              item_type: 'YES_NO',
              responses: [],
              max_responses: 1,
              image_data: { image: '', width: null, height: null },
              drawing_writing_split_type: 'NONE',
              revisit: false,
            },
            {
              "id": "ENG-SUM-1112",
              "stimulus": "The rapid rise of digital media has significantly changed the way people consume news and information. In the past, individuals relied heavily on newspapers and scheduled television broadcasts for updates on world events. Today, however, information is available instantly on smartphones, social platforms, and online publications. While this shift has increased accessibility, it has also introduced new challenges. One major concern is the spread of {{response}}, which can mislead the public and create widespread {{response}}. Another issue is the pressure placed on traditional news organizations to deliver content quickly rather than {{response}} ensuring accuracy. As a result, journalists often face tight deadlines and intense {{response}} from online creators who publish content without undergoing the same editorial processes.\n\nTo address these challenges, educators argue that teaching media literacy is essential. Media literacy helps students understand how information is {{response}}, how it spreads, and how to evaluate its reliability. For example, learners are encouraged to question the {{response}} of a source, check for supporting {{response}}, and compare information across multiple {{response}}. With these skills, individuals can better distinguish trustworthy reports from misleading ones.\n\nDespite the difficulties brought about by the digital age, experts believe that the transformation of media also offers significant {{response}}. Audiences now have the chance to engage with news in interactive ways, participate in {{response}}, and access diverse viewpoints from around the world. Ultimately, the future of journalism may depend on society’s ability to balance the benefits of instant information with the need for critical and responsible {{response}}.",
              "item_type": "CLOZE_DROPDOWN",
              "responses": ["", "", "", "", "", "", "", "", "", "", ""],
              "max_responses": 10,
              "passage_stimulus": "",
              "image_data": { "image": "", "width": null, "height": null },
              "response_positions": [
                { "x": 25, "y": 18 },
                { "x": 40, "y": 25 },
                { "x": 52, "y": 32 },
                { "x": 60, "y": 42 },
                { "x": 40, "y": 55 },
                { "x": 45, "y": 62 },
                { "x": 50, "y": 68 },
                { "x": 55, "y": 74 },
                { "x": 65, "y": 82 },
                { "x": 70, "y": 88 },
                { "x": 70, "y": 88 }
              ],
              "possible_responses": [
                {
                  "responses": [
                    { "label": "misinformation", "value": "misinformation" },
                    { "label": "advertising", "value": "advertising" },
                    { "label": "technology", "value": "technology" }
                  ]
                },
                {
                  "responses": [
                    { "label": "confusion", "value": "confusion" },
                    { "label": "clarity", "value": "clarity" },
                    { "label": "accuracy", "value": "accuracy" }
                  ]
                },
                {
                  "responses": [
                    { "label": "carefully", "value": "carefully" },
                    { "label": "rarely", "value": "rarely" },
                    { "label": "publicly", "value": "publicly" }
                  ]
                },
                {
                  "responses": [
                    { "label": "competition", "value": "competition" },
                    { "label": "collaboration", "value": "collaboration" },
                    { "label": "curiosity", "value": "curiosity" }
                  ]
                },
                {
                  "responses": [
                    { "label": "created", "value": "created" },
                    { "label": "shared", "value": "shared" },
                    { "label": "edited", "value": "edited" }
                  ]
                },
                {
                  "responses": [
                    { "label": "credibility", "value": "credibility" },
                    { "label": "length", "value": "length" },
                    { "label": "tone", "value": "tone" }
                  ]
                },
                {
                  "responses": [
                    { "label": "evidence", "value": "evidence" },
                    { "label": "comments", "value": "comments" },
                    { "label": "opinions", "value": "opinions" }
                  ]
                },
                {
                  "responses": [
                    { "label": "outlets", "value": "outlets" },
                    { "label": "platforms", "value": "platforms" },
                    { "label": "channels", "value": "channels" }
                  ]
                },
                {
                  "responses": [
                    { "label": "opportunities", "value": "opportunities" },
                    { "label": "problems", "value": "problems" },
                    { "label": "dangers", "value": "dangers" }
                  ]
                },
                {
                  "responses": [
                    { "label": "discussion", "value": "discussion" },
                    { "label": "entertainment", "value": "entertainment" },
                    { "label": "consumption", "value": "consumption" }
                  ]
                },
                {
                  "responses": [
                    { "label": "discussion-1", "value": "discussion-1" },
                    { "label": "entertainment-1", "value": "entertainment-1" },
                    { "label": "consumption-1", "value": "consumption-1" }
                  ]
                }
              ],
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-SUM-112",
              "stimulus": "The rapid rise of digital media has significantly changed the way people consume news and information. In the past, individuals relied heavily on newspapers and scheduled television broadcasts for updates on world events. Today, however, information is available instantly on smartphones, social platforms, and online publications. While this shift has increased accessibility, it has also introduced new challenges. One major concern is the spread of {{response}}, which can mislead the public and create widespread {{response}}. Another issue is the pressure placed on traditional news organizations to deliver content quickly rather than {{response}} ensuring accuracy. As a result, journalists often face tight deadlines and intense {{response}} from online creators who publish content without undergoing the same editorial processes.\n\nTo address these challenges, educators argue that teaching media literacy is essential. Media literacy helps students understand how information is {{response}}, how it spreads, and how to evaluate its reliability. For example, learners are encouraged to question the {{response}} of a source, check for supporting {{response}}, and compare information across multiple {{response}}. With these skills, individuals can better distinguish trustworthy reports from misleading ones.\n\nDespite the difficulties brought about by the digital age, experts believe that the transformation of media also offers significant {{response}}. Audiences now have the chance to engage with news in interactive ways, participate in {{response}}, and access diverse viewpoints from around the world. Ultimately, the future of journalism may depend on society’s ability to balance the benefits of instant information with the need for critical and responsible {{response}}.",
              "item_type": "CLOZE_TEXT",
              "responses": ["", "", "", "", "", "", "", "", "", "", ""],
              "max_responses": 10,
              "passage_stimulus": "",
              "image_data": { "image": "", "width": null, "height": null },
              "response_positions": [
                { "x": 25, "y": 18 },
                { "x": 40, "y": 25 },
                { "x": 52, "y": 32 },
                { "x": 60, "y": 42 },
                { "x": 40, "y": 55 },
                { "x": 45, "y": 62 },
                { "x": 50, "y": 68 },
                { "x": 55, "y": 74 },
                { "x": 65, "y": 82 },
                { "x": 70, "y": 88 },
                { "x": 70, "y": 88 }
              ],
              "possible_responses": [
                {
                  "responses": [
                    { "label": "misinformation", "value": "misinformation" },
                    { "label": "advertising", "value": "advertising" },
                    { "label": "technology", "value": "technology" }
                  ]
                },
                {
                  "responses": [
                    { "label": "confusion", "value": "confusion" },
                    { "label": "clarity", "value": "clarity" },
                    { "label": "accuracy", "value": "accuracy" }
                  ]
                },
                {
                  "responses": [
                    { "label": "carefully", "value": "carefully" },
                    { "label": "rarely", "value": "rarely" },
                    { "label": "publicly", "value": "publicly" }
                  ]
                },
                {
                  "responses": [
                    { "label": "competition", "value": "competition" },
                    { "label": "collaboration", "value": "collaboration" },
                    { "label": "curiosity", "value": "curiosity" }
                  ]
                },
                {
                  "responses": [
                    { "label": "created", "value": "created" },
                    { "label": "shared", "value": "shared" },
                    { "label": "edited", "value": "edited" }
                  ]
                },
                {
                  "responses": [
                    { "label": "credibility", "value": "credibility" },
                    { "label": "length", "value": "length" },
                    { "label": "tone", "value": "tone" }
                  ]
                },
                {
                  "responses": [
                    { "label": "evidence", "value": "evidence" },
                    { "label": "comments", "value": "comments" },
                    { "label": "opinions", "value": "opinions" }
                  ]
                },
                {
                  "responses": [
                    { "label": "outlets", "value": "outlets" },
                    { "label": "platforms", "value": "platforms" },
                    { "label": "channels", "value": "channels" }
                  ]
                },
                {
                  "responses": [
                    { "label": "opportunities", "value": "opportunities" },
                    { "label": "problems", "value": "problems" },
                    { "label": "dangers", "value": "dangers" }
                  ]
                },
                {
                  "responses": [
                    { "label": "discussion", "value": "discussion" },
                    { "label": "entertainment", "value": "entertainment" },
                    { "label": "consumption", "value": "consumption" }
                  ]
                },
                {
                  "responses": [
                    { "label": "discussion-1", "value": "discussion-1" },
                    { "label": "entertainment-1", "value": "entertainment-1" },
                    { "label": "consumption-1", "value": "consumption-1" }
                  ]
                }
              ],
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-SUM-11-2",
              "stimulus": "The rapid rise of digital media has significantly changed the way people consume news and information. In the past, individuals relied heavily on newspapers and scheduled television broadcasts for updates on world events. Today, however, information is available instantly on smartphones, social platforms, and online publications. While this shift has increased accessibility, it has also introduced new challenges. One major concern is the spread of {{response}}, which can mislead the public and create widespread {{response}}. Another issue is the pressure placed on traditional news organizations to deliver content quickly rather than {{response}} ensuring accuracy. As a result, journalists often face tight deadlines and intense {{response}} from online creators who publish content without undergoing the same editorial processes.\n\nTo address these challenges, educators argue that teaching media literacy is essential. Media literacy helps students understand how information is {{response}}, how it spreads, and how to evaluate its reliability. For example, learners are encouraged to question the {{response}} of a source, check for supporting {{response}}, and compare information across multiple {{response}}. With these skills, individuals can better distinguish trustworthy reports from misleading ones.\n\nDespite the difficulties brought about by the digital age, experts believe that the transformation of media also offers significant {{response}}. Audiences now have the chance to engage with news in interactive ways, participate in {{response}}, and access diverse viewpoints from around the world. Ultimately, the future of journalism may depend on society’s ability to balance the benefits of instant information with the need for critical and responsible {{response}}.",
              "item_type": "CLOZE_RADIO",
              "responses": ["", "", "", "", "", "", "", "", "", "", ""],
              "max_responses": 10,
              "passage_stimulus": "",
              "image_data": { "image": "", "width": null, "height": null },
              "response_positions": [
                { "x": 25, "y": 18 },
                { "x": 40, "y": 25 },
                { "x": 52, "y": 32 },
                { "x": 60, "y": 42 },
                { "x": 40, "y": 55 },
                { "x": 45, "y": 62 },
                { "x": 50, "y": 68 },
                { "x": 55, "y": 74 },
                { "x": 65, "y": 82 },
                { "x": 70, "y": 88 },
                { "x": 70, "y": 88 }
              ],
              "possible_responses": [
                {
                  "responses": [
                    { "label": "misinformation", "value": "misinformation" },
                    { "label": "advertising", "value": "advertising" },
                    { "label": "technology", "value": "technology" }
                  ]
                },
                {
                  "responses": [
                    { "label": "confusion", "value": "confusion" },
                    { "label": "clarity", "value": "clarity" },
                    { "label": "accuracy", "value": "accuracy" }
                  ]
                },
                {
                  "responses": [
                    { "label": "carefully", "value": "carefully" },
                    { "label": "rarely", "value": "rarely" },
                    { "label": "publicly", "value": "publicly" }
                  ]
                },
                {
                  "responses": [
                    { "label": "competition", "value": "competition" },
                    { "label": "collaboration", "value": "collaboration" },
                    { "label": "curiosity", "value": "curiosity" }
                  ]
                },
                {
                  "responses": [
                    { "label": "created", "value": "created" },
                    { "label": "shared", "value": "shared" },
                    { "label": "edited", "value": "edited" }
                  ]
                },
                {
                  "responses": [
                    { "label": "credibility", "value": "credibility" },
                    { "label": "length", "value": "length" },
                    { "label": "tone", "value": "tone" }
                  ]
                },
                {
                  "responses": [
                    { "label": "evidence", "value": "evidence" },
                    { "label": "comments", "value": "comments" },
                    { "label": "opinions", "value": "opinions" }
                  ]
                },
                {
                  "responses": [
                    { "label": "outlets", "value": "outlets" },
                    { "label": "platforms", "value": "platforms" },
                    { "label": "channels", "value": "channels" }
                  ]
                },
                {
                  "responses": [
                    { "label": "opportunities", "value": "opportunities" },
                    { "label": "problems", "value": "problems" },
                    { "label": "dangers", "value": "dangers" }
                  ]
                },
                {
                  "responses": [
                    { "label": "discussion", "value": "discussion" },
                    { "label": "entertainment", "value": "entertainment" },
                    { "label": "consumption", "value": "consumption" }
                  ]
                },
                {
                  "responses": [
                    { "label": "discussion-1", "value": "discussion-1" },
                    { "label": "entertainment-1", "value": "entertainment-1" },
                    { "label": "consumption-1", "value": "consumption-1" }
                  ]
                }
              ],
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Q6",
              "stimulus": "What is the antonym of 'Brave'?",
              "options": [
                { "label": "Courageous", "value": "courageous" },
                { "label": "Fearful", "value": "fearful" },
                { "label": "Bold", "value": "bold" },
                { "label": "Daring", "value": "daring" }
              ],
              "item_type": "DRAWING_AND_WRITING",
              "background_type": "LINE",
              "responses": [],
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Qf6",
              "stimulus": "What is the antonym of 'Brave'?",
              "options": [
                { "label": "Courageous", "value": "courageous" },
                { "label": "Fearful", "value": "fearful" },
                { "label": "Bold", "value": "bold" },
                { "label": "Daring", "value": "daring" }
              ],
              "item_type": "SHORT_TEXT",
              "background_type": "GRID",
              "responses": [],
              "max_words": 5,
              "max_length": 100,
              "allow_paste": false,
              "allow_copy": false,
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Qfjd6",
              "stimulus": "What is the antonym of 'Brave'?",
              "options": [
                { "label": "Courageous", "value": "courageous" },
                { "label": "Fearful", "value": "fearful" },
                { "label": "Bold", "value": "bold" },
                { "label": "Daring", "value": "daring" }
              ],
              "item_type": "ESSAY_RICH_TEXT",
              "background_type": "GRID",
              "responses": [],
              "max_words": 5,
              "max_length": 100,
              "allow_paste": false,
              "allow_copy": false,
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Qfffj6",
              "stimulus": "What is the antonym of 'Brave'?",
              "options": [
                { "label": "Courageous", "value": "courageous" },
                { "label": "Fearful", "value": "fearful" },
                { "label": "Bold", "value": "bold" },
                { "label": "Daring", "value": "daring" }
              ],
              "item_type": "ESSAY_PLAIN_TEXT",
              "background_type": "GRID",
              "responses": [],
              "max_words": null,
              "max_length": 100,
              "allow_paste": false,
              "allow_copy": false,
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Qfj6",
              "stimulus": "<p><strong>Match each country with its correct capital city by dragging the options on the right to align with the stems on the left.</strong></p>",
              "stems": [
                "<p><strong>1. France</strong></p>",
                "<p><strong>2. Japan</strong></p>",
                "<p><strong>3. Canada</strong></p>",
                "<p><strong>4. Brazil</strong></p>"
              ],
              "options": [
                { "label": "<p>Tokyo</p>", "value": "tokyo" },
                { "label": "<p>Ottawa</p>", "value": "ottawa" },
                { "label": "<p>Brasília</p>", "value": "brasilia" },
                { "label": "<p>Paris</p>", "value": "paris" }
              ],
              "item_type": "ASSOCIATION",
              "background_type": "GRID",
              "responses": [],
              "max_words": 5,
              "max_length": 100,
              "allow_paste": false,
              "allow_copy": false,
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Qffdfj6",
              "stimulus": "<p><strong>Match each country with its correct capital city by dragging the options on the right to align with the stems on the left.</strong></p>",
              "stems": [
                "<p><strong>1. France</strong></p>",
                "<p><strong>2. Japan</strong></p>",
                "<p><strong>3. Canada</strong></p>",
                "<p><strong>4. Brazil</strong></p>"
              ],
              "options": [
                { "label": "<p>Tokyo</p>", "value": "tokyo" },
                { "label": "<p>Ottawa</p>", "value": "ottawa" },
                { "label": "<p>Brasília</p>", "value": "brasilia" },
                { "label": "<p>Paris</p>", "value": "paris" }
              ],
              "item_type": "ORDER_LIST",
              "background_type": "GRID",
              "responses": [],
              "max_words": 5,
              "max_length": 100,
              "allow_paste": false,
              "allow_copy": false,
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-IMG-MAP-001",
              "stimulus": "<p><strong>Study the map carefully. Then drag the correct labels from the options below into the empty boxes on the image.</strong></p>",
              "passage_stimulus": "<p>This map highlights four major geographical features in Africa. Your task is to correctly identify each location by placing the appropriate label into the matching box on the image.</p>",

              "item_type": "CLOZE_TEXT_IMAGE",
              "background_type": "IMAGE",

              "image_data": {
                "image": "pngtree-map-of-nigeria-stylized-png-image_10468519.png",
                "width": 1026,
                "height": 1083
              },

              "response_positions": [
                { "x": 22, "y": 30 },
                { "x": 63, "y": 28 },
                { "x": 28, "y": 72 },
                { "x": 70, "y": 75 }
              ],

              "stems": [
                "<p>1. Nile River</p>",
                "<p>2. Sahara Desert</p>",
                "<p>3. Congo Rainforest</p>",
                "<p>4. Kalahari Desert</p>"
              ],

              "options": [
                { "label": "<p>Nile River</p>", "value": "nile_river" },
                { "label": "<p>Sahara Desert</p>", "value": "sahara_desert" },
                { "label": "<p>Congo Rainforest</p>", "value": "congo_rainforest" },
                { "label": "<p>Kalahari Desert</p>", "value": "kalahari_desert" }
              ],

              "responses": [],

              "max_words": 5,
              "max_length": 50,
              "allow_paste": false,
              "allow_copy": false,
              "max_responses": 1,

              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-IMG-MAP-002",
              "stimulus": "<p><strong>Study the map carefully. Then drag the correct labels from the options below into the empty boxes on the image.</strong></p>",
              "passage_stimulus": "<p>This map highlights four major geographical features in Africa. Your task is to correctly identify each location by placing the appropriate label into the matching box on the image.</p>",

              "item_type": "CLOZE_DROPDOWN_IMAGE",
              "background_type": "IMAGE",

              "image_data": {
                "image": "pngtree-map-of-nigeria-stylized-png-image_10468519.png",
                "width": 402,
                "height": 361
              },

              "response_positions": [
                { "x": 22, "y": 30 },
                { "x": 63, "y": 28 },
                { "x": 28, "y": 72 },
                { "x": 70, "y": 75 }
              ],

              "possible_responses": [
                {
                  "responses": [
                    { "label": "misinformation", "value": "misinformation" },
                    { "label": "advertising", "value": "advertising" },
                    { "label": "technology", "value": "technology" }
                  ]
                },
                {
                  "responses": [
                    { "label": "confusion", "value": "confusion" },
                    { "label": "clarity", "value": "clarity" },
                    { "label": "accuracy", "value": "accuracy" }
                  ]
                },
                {
                  "responses": [
                    { "label": "carefully", "value": "carefully" },
                    { "label": "rarely", "value": "rarely" },
                    { "label": "publicly", "value": "publicly" }
                  ]
                },
                {
                  "responses": [
                    { "label": "competition", "value": "competition" },
                    { "label": "collaboration", "value": "collaboration" },
                    { "label": "curiosity", "value": "curiosity" }
                  ]
                },
                {
                  "responses": [
                    { "label": "created", "value": "created" },
                    { "label": "shared", "value": "shared" },
                    { "label": "edited", "value": "edited" }
                  ]
                },
                {
                  "responses": [
                    { "label": "credibility", "value": "credibility" },
                    { "label": "length", "value": "length" },
                    { "label": "tone", "value": "tone" }
                  ]
                },
                {
                  "responses": [
                    { "label": "evidence", "value": "evidence" },
                    { "label": "comments", "value": "comments" },
                    { "label": "opinions", "value": "opinions" }
                  ]
                },
                {
                  "responses": [
                    { "label": "outlets", "value": "outlets" },
                    { "label": "platforms", "value": "platforms" },
                    { "label": "channels", "value": "channels" }
                  ]
                },
                {
                  "responses": [
                    { "label": "opportunities", "value": "opportunities" },
                    { "label": "problems", "value": "problems" },
                    { "label": "dangers", "value": "dangers" }
                  ]
                },
                {
                  "responses": [
                    { "label": "discussion", "value": "discussion" },
                    { "label": "entertainment", "value": "entertainment" },
                    { "label": "consumption", "value": "consumption" }
                  ]
                },
                {
                  "responses": [
                    { "label": "discussion-1", "value": "discussion-1" },
                    { "label": "entertainment-1", "value": "entertainment-1" },
                    { "label": "consumption-1", "value": "consumption-1" }
                  ]
                }
              ],

              "options": [
                { "label": "<p>Nile River</p>", "value": "nile_river" },
                { "label": "<p>Sahara Desert</p>", "value": "sahara_desert" },
                { "label": "<p>Congo Rainforest</p>", "value": "congo_rainforest" },
                { "label": "<p>Kalahari Desert</p>", "value": "kalahari_desert" }
              ],

              "responses": [],

              "max_words": 5,
              "max_length": 50,
              "allow_paste": false,
              "allow_copy": false,
              "max_responses": 1,

              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-IMG-MAP-003",
              "stimulus": "<p><strong>Study the map carefully. Then drag the correct labels from the options below into the empty boxes on the image.</strong></p>",
              "passage_stimulus": "<p>This map highlights four major geographical features in Africa. Your task is to correctly identify each location by placing the appropriate label into the matching box on the image.</p>",

              "item_type": "IMAGE_DRAG_AND_DROP",
              "background_type": "IMAGE",

              "image_data": {
                "image": "pngtree-map-of-nigeria-stylized-png-image_10468519.png",
                "width": 402,
                "height": 361
              },

              "response_positions": [
                { "x": 22, "y": 30 },
                { "x": 63, "y": 28 },
                { "x": 28, "y": 72 },
                { "x": 70, "y": 75 }
              ],

              "possible_responses": [
                {
                  "responses": [
                    { "label": "misinformation", "value": "misinformation" },
                    { "label": "advertising", "value": "advertising" },
                    { "label": "technology", "value": "technology" }
                  ]
                },
                {
                  "responses": [
                    { "label": "confusion", "value": "confusion" },
                    { "label": "clarity", "value": "clarity" },
                    { "label": "accuracy", "value": "accuracy" }
                  ]
                },
                {
                  "responses": [
                    { "label": "carefully", "value": "carefully" },
                    { "label": "rarely", "value": "rarely" },
                    { "label": "publicly", "value": "publicly" }
                  ]
                },
                {
                  "responses": [
                    { "label": "competition", "value": "competition" },
                    { "label": "collaboration", "value": "collaboration" },
                    { "label": "curiosity", "value": "curiosity" }
                  ]
                },
                {
                  "responses": [
                    { "label": "created", "value": "created" },
                    { "label": "shared", "value": "shared" },
                    { "label": "edited", "value": "edited" }
                  ]
                },
                {
                  "responses": [
                    { "label": "credibility", "value": "credibility" },
                    { "label": "length", "value": "length" },
                    { "label": "tone", "value": "tone" }
                  ]
                },
                {
                  "responses": [
                    { "label": "evidence", "value": "evidence" },
                    { "label": "comments", "value": "comments" },
                    { "label": "opinions", "value": "opinions" }
                  ]
                },
                {
                  "responses": [
                    { "label": "outlets", "value": "outlets" },
                    { "label": "platforms", "value": "platforms" },
                    { "label": "channels", "value": "channels" }
                  ]
                },
                {
                  "responses": [
                    { "label": "opportunities", "value": "opportunities" },
                    { "label": "problems", "value": "problems" },
                    { "label": "dangers", "value": "dangers" }
                  ]
                },
                {
                  "responses": [
                    { "label": "discussion", "value": "discussion" },
                    { "label": "entertainment", "value": "entertainment" },
                    { "label": "consumption", "value": "consumption" }
                  ]
                },
                {
                  "responses": [
                    { "label": "discussion-1", "value": "discussion-1" },
                    { "label": "entertainment-1", "value": "entertainment-1" },
                    { "label": "consumption-1", "value": "consumption-1" }
                  ]
                }
              ],

              "options": [
                { "label": "<p>Nile River</p>", "value": "nile_river" },
                { "label": "<p>Sahara Desert</p>", "value": "sahara_desert" },
                { "label": "<p>Congo Rainforest</p>", "value": "congo_rainforest" },
                { "label": "<p>Kalahari Desert</p>", "value": "kalahari_desert" }
              ],

              "responses": [],

              "max_words": 5,
              "max_length": 50,
              "allow_paste": false,
              "allow_copy": false,
              "max_responses": 1,

              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "SCI-CM-301",
              "item_type": "CHOICE_MATRIX",
              "passage_stimulus": "",
              "stimulus": "<p><strong>For each statement below, choose whether it is <em>True</em> or <em>False</em>.</strong></p>",
              "stems": [
                "<p>Solar energy is considered a renewable resource.</p>",
                "<p>Wind turbines generate electricity without producing carbon emissions.</p>",
                "<p>Fossil fuels are classified as renewable sources of energy.</p>",
                "<p>Hydropower plants use the movement of water to create electricity.</p>"
              ],
              "options": [
                { "label": "<p>True</p>", "value": "true" },
                { "label": "<p>False</p>", "value": "false" }
              ],
              "responses": [],
              "drawing_writing_split_type": "NONE",
              "revisit": false
            }

          ],
          "passages": []
        },
        {
          "id": 102,
          "index": 2,
          "block_type": "PASSAGES",
          "total_questions": 2,
          "items": [],
          "passages": [
            {
              "id": "ENG-PASS-1",
              "stimulus": "Climate change is caused primarily by greenhouse gases...",
              "items": [
                {
                  "id": "ENG-P1-Q1",
                  "stimulus": "According to the passage, what is the main cause of climate change?",
                  "options": [
                    {
                      "label": "Natural cycles",
                      "value": "natural"
                    },
                    {
                      "label": "Human activities",
                      "value": "human"
                    },
                    {
                      "label": "Volcanoes",
                      "value": "volcano"
                    }
                  ],
                  "item_type": "MCQ",
                  "responses": [],
                  "max_responses": 1,
                  "image_data": {
                    "image": "",
                    "width": null,
                    "height": null
                  },
                  "drawing_writing_split_type": "NONE",
                  "revisit": false
                },
                {
                  "id": "ENG-P1-Q2",
                  "stimulus": "What is the author’s tone?",
                  "options": [
                    {
                      "label": "Critical",
                      "value": "critical"
                    },
                    {
                      "label": "Neutral",
                      "value": "neutral"
                    },
                    {
                      "label": "Praising",
                      "value": "praising"
                    }
                  ],
                  "item_type": "MCQ",
                  "responses": [],
                  "max_responses": 1,
                  "image_data": {
                    "image": "",
                    "width": null,
                    "height": null
                  },
                  "drawing_writing_split_type": "NONE",
                  "revisit": false
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "SEC-ENG-2",
      "name": "CHEMISTRY",
      "section_settings": {
        "minutes_left": 40,
        "seconds_left": 0,
        "duration_in_minutes": 45,
        "shuffle_items": false,
        "shuffle_options": true,
        "allow_calculator": false,
        "shuffle_blocks": false,
        "prevent_navigation_to_attempted_items": false,
        "section_instruction": "Answer all questions."
      },
      "question_blocks": [
        {
          "id": 101,
          "index": 1,
          "block_type": "SINGLE_QUESTIONS",
          "total_questions": 3,
          "items": [
            {
              "id": "ENG-Q9",
              "stimulus": "Which word is a noun?",
              "options": [
                { "label": "Run", "value": "run" },
                { "label": "Beauty", "value": "beauty" },
                { "label": "Quickly", "value": "quickly" },
                { "label": "Blue", "value": "blue" }
              ],
              "item_type": "MCQ",
              "responses": [],
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              id: 'ENG-Qasfasfa8',
              stimulus: "Which of the following words are coordinating conjunctions?",
              options: [
                { label: 'For', value: 'for' },
                { label: 'Although', value: 'although' },
                { label: 'Nor', value: 'nor' },
                { label: 'Because', value: 'because' },
              ],
              item_type: 'MRQ',
              responses: [],
              max_responses: 1,
              image_data: { image: '', width: null, height: null },
              drawing_writing_split_type: 'NONE',
              revisit: false,
            },
            {
              id: 'ENG-Q1asafaWD2',
              stimulus: "The word 'ostracize' means to welcome someone warmly into a group.",
              options: [
                { label: 'True', value: 'true' },
                { label: 'False', value: 'false' }
              ],
              item_type: 'TRUE_FALSE',
              responses: [],
              max_responses: 1,
              image_data: { image: '', width: null, height: null },
              drawing_writing_split_type: 'NONE',
              revisit: false,
            },
            {
              id: 'ENG-Q1safsfa4',
              stimulus: 'Is the word "ephemeral" used to describe something that lasts for a very long time?',
              options: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' }
              ],
              item_type: 'YES_NO',
              responses: [],
              max_responses: 1,
              image_data: { image: '', width: null, height: null },
              drawing_writing_split_type: 'NONE',
              revisit: false,
            },
            {
              "id": "ENG-SUM-1112",
              "stimulus": "The rapid rise of digital media has significantly changed the way people consume news and information. In the past, individuals relied heavily on newspapers and scheduled television broadcasts for updates on world events. Today, however, information is available instantly on smartphones, social platforms, and online publications. While this shift has increased accessibility, it has also introduced new challenges. One major concern is the spread of {{response}}, which can mislead the public and create widespread {{response}}. Another issue is the pressure placed on traditional news organizations to deliver content quickly rather than {{response}} ensuring accuracy. As a result, journalists often face tight deadlines and intense {{response}} from online creators who publish content without undergoing the same editorial processes.\n\nTo address these challenges, educators argue that teaching media literacy is essential. Media literacy helps students understand how information is {{response}}, how it spreads, and how to evaluate its reliability. For example, learners are encouraged to question the {{response}} of a source, check for supporting {{response}}, and compare information across multiple {{response}}. With these skills, individuals can better distinguish trustworthy reports from misleading ones.\n\nDespite the difficulties brought about by the digital age, experts believe that the transformation of media also offers significant {{response}}. Audiences now have the chance to engage with news in interactive ways, participate in {{response}}, and access diverse viewpoints from around the world. Ultimately, the future of journalism may depend on society’s ability to balance the benefits of instant information with the need for critical and responsible {{response}}.",
              "item_type": "CLOZE_DROPDOWN",
              "responses": ["", "", "", "", "", "", "", "", "", "", ""],
              "max_responses": 10,
              "passage_stimulus": "",
              "image_data": { "image": "", "width": null, "height": null },
              "response_positions": [
                { "x": 25, "y": 18 },
                { "x": 40, "y": 25 },
                { "x": 52, "y": 32 },
                { "x": 60, "y": 42 },
                { "x": 40, "y": 55 },
                { "x": 45, "y": 62 },
                { "x": 50, "y": 68 },
                { "x": 55, "y": 74 },
                { "x": 65, "y": 82 },
                { "x": 70, "y": 88 },
                { "x": 70, "y": 88 }
              ],
              "possible_responses": [
                {
                  "responses": [
                    { "label": "misinformation", "value": "misinformation" },
                    { "label": "advertising", "value": "advertising" },
                    { "label": "technology", "value": "technology" }
                  ]
                },
                {
                  "responses": [
                    { "label": "confusion", "value": "confusion" },
                    { "label": "clarity", "value": "clarity" },
                    { "label": "accuracy", "value": "accuracy" }
                  ]
                },
                {
                  "responses": [
                    { "label": "carefully", "value": "carefully" },
                    { "label": "rarely", "value": "rarely" },
                    { "label": "publicly", "value": "publicly" }
                  ]
                },
                {
                  "responses": [
                    { "label": "competition", "value": "competition" },
                    { "label": "collaboration", "value": "collaboration" },
                    { "label": "curiosity", "value": "curiosity" }
                  ]
                },
                {
                  "responses": [
                    { "label": "created", "value": "created" },
                    { "label": "shared", "value": "shared" },
                    { "label": "edited", "value": "edited" }
                  ]
                },
                {
                  "responses": [
                    { "label": "credibility", "value": "credibility" },
                    { "label": "length", "value": "length" },
                    { "label": "tone", "value": "tone" }
                  ]
                },
                {
                  "responses": [
                    { "label": "evidence", "value": "evidence" },
                    { "label": "comments", "value": "comments" },
                    { "label": "opinions", "value": "opinions" }
                  ]
                },
                {
                  "responses": [
                    { "label": "outlets", "value": "outlets" },
                    { "label": "platforms", "value": "platforms" },
                    { "label": "channels", "value": "channels" }
                  ]
                },
                {
                  "responses": [
                    { "label": "opportunities", "value": "opportunities" },
                    { "label": "problems", "value": "problems" },
                    { "label": "dangers", "value": "dangers" }
                  ]
                },
                {
                  "responses": [
                    { "label": "discussion", "value": "discussion" },
                    { "label": "entertainment", "value": "entertainment" },
                    { "label": "consumption", "value": "consumption" }
                  ]
                },
                {
                  "responses": [
                    { "label": "discussion-1", "value": "discussion-1" },
                    { "label": "entertainment-1", "value": "entertainment-1" },
                    { "label": "consumption-1", "value": "consumption-1" }
                  ]
                }
              ],
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-SUM-112",
              "stimulus": "The rapid rise of digital media has significantly changed the way people consume news and information. In the past, individuals relied heavily on newspapers and scheduled television broadcasts for updates on world events. Today, however, information is available instantly on smartphones, social platforms, and online publications. While this shift has increased accessibility, it has also introduced new challenges. One major concern is the spread of {{response}}, which can mislead the public and create widespread {{response}}. Another issue is the pressure placed on traditional news organizations to deliver content quickly rather than {{response}} ensuring accuracy. As a result, journalists often face tight deadlines and intense {{response}} from online creators who publish content without undergoing the same editorial processes.\n\nTo address these challenges, educators argue that teaching media literacy is essential. Media literacy helps students understand how information is {{response}}, how it spreads, and how to evaluate its reliability. For example, learners are encouraged to question the {{response}} of a source, check for supporting {{response}}, and compare information across multiple {{response}}. With these skills, individuals can better distinguish trustworthy reports from misleading ones.\n\nDespite the difficulties brought about by the digital age, experts believe that the transformation of media also offers significant {{response}}. Audiences now have the chance to engage with news in interactive ways, participate in {{response}}, and access diverse viewpoints from around the world. Ultimately, the future of journalism may depend on society’s ability to balance the benefits of instant information with the need for critical and responsible {{response}}.",
              "item_type": "CLOZE_TEXT",
              "responses": ["", "", "", "", "", "", "", "", "", "", ""],
              "max_responses": 10,
              "passage_stimulus": "",
              "image_data": { "image": "", "width": null, "height": null },
              "response_positions": [
                { "x": 25, "y": 18 },
                { "x": 40, "y": 25 },
                { "x": 52, "y": 32 },
                { "x": 60, "y": 42 },
                { "x": 40, "y": 55 },
                { "x": 45, "y": 62 },
                { "x": 50, "y": 68 },
                { "x": 55, "y": 74 },
                { "x": 65, "y": 82 },
                { "x": 70, "y": 88 },
                { "x": 70, "y": 88 }
              ],
              "possible_responses": [
                {
                  "responses": [
                    { "label": "misinformation", "value": "misinformation" },
                    { "label": "advertising", "value": "advertising" },
                    { "label": "technology", "value": "technology" }
                  ]
                },
                {
                  "responses": [
                    { "label": "confusion", "value": "confusion" },
                    { "label": "clarity", "value": "clarity" },
                    { "label": "accuracy", "value": "accuracy" }
                  ]
                },
                {
                  "responses": [
                    { "label": "carefully", "value": "carefully" },
                    { "label": "rarely", "value": "rarely" },
                    { "label": "publicly", "value": "publicly" }
                  ]
                },
                {
                  "responses": [
                    { "label": "competition", "value": "competition" },
                    { "label": "collaboration", "value": "collaboration" },
                    { "label": "curiosity", "value": "curiosity" }
                  ]
                },
                {
                  "responses": [
                    { "label": "created", "value": "created" },
                    { "label": "shared", "value": "shared" },
                    { "label": "edited", "value": "edited" }
                  ]
                },
                {
                  "responses": [
                    { "label": "credibility", "value": "credibility" },
                    { "label": "length", "value": "length" },
                    { "label": "tone", "value": "tone" }
                  ]
                },
                {
                  "responses": [
                    { "label": "evidence", "value": "evidence" },
                    { "label": "comments", "value": "comments" },
                    { "label": "opinions", "value": "opinions" }
                  ]
                },
                {
                  "responses": [
                    { "label": "outlets", "value": "outlets" },
                    { "label": "platforms", "value": "platforms" },
                    { "label": "channels", "value": "channels" }
                  ]
                },
                {
                  "responses": [
                    { "label": "opportunities", "value": "opportunities" },
                    { "label": "problems", "value": "problems" },
                    { "label": "dangers", "value": "dangers" }
                  ]
                },
                {
                  "responses": [
                    { "label": "discussion", "value": "discussion" },
                    { "label": "entertainment", "value": "entertainment" },
                    { "label": "consumption", "value": "consumption" }
                  ]
                },
                {
                  "responses": [
                    { "label": "discussion-1", "value": "discussion-1" },
                    { "label": "entertainment-1", "value": "entertainment-1" },
                    { "label": "consumption-1", "value": "consumption-1" }
                  ]
                }
              ],
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-SUM-11-2",
              "stimulus": "The rapid rise of digital media has significantly changed the way people consume news and information. In the past, individuals relied heavily on newspapers and scheduled television broadcasts for updates on world events. Today, however, information is available instantly on smartphones, social platforms, and online publications. While this shift has increased accessibility, it has also introduced new challenges. One major concern is the spread of {{response}}, which can mislead the public and create widespread {{response}}. Another issue is the pressure placed on traditional news organizations to deliver content quickly rather than {{response}} ensuring accuracy. As a result, journalists often face tight deadlines and intense {{response}} from online creators who publish content without undergoing the same editorial processes.\n\nTo address these challenges, educators argue that teaching media literacy is essential. Media literacy helps students understand how information is {{response}}, how it spreads, and how to evaluate its reliability. For example, learners are encouraged to question the {{response}} of a source, check for supporting {{response}}, and compare information across multiple {{response}}. With these skills, individuals can better distinguish trustworthy reports from misleading ones.\n\nDespite the difficulties brought about by the digital age, experts believe that the transformation of media also offers significant {{response}}. Audiences now have the chance to engage with news in interactive ways, participate in {{response}}, and access diverse viewpoints from around the world. Ultimately, the future of journalism may depend on society’s ability to balance the benefits of instant information with the need for critical and responsible {{response}}.",
              "item_type": "CLOZE_RADIO",
              "responses": ["", "", "", "", "", "", "", "", "", "", ""],
              "max_responses": 10,
              "passage_stimulus": "",
              "image_data": { "image": "", "width": null, "height": null },
              "response_positions": [
                { "x": 25, "y": 18 },
                { "x": 40, "y": 25 },
                { "x": 52, "y": 32 },
                { "x": 60, "y": 42 },
                { "x": 40, "y": 55 },
                { "x": 45, "y": 62 },
                { "x": 50, "y": 68 },
                { "x": 55, "y": 74 },
                { "x": 65, "y": 82 },
                { "x": 70, "y": 88 },
                { "x": 70, "y": 88 }
              ],
              "possible_responses": [
                {
                  "responses": [
                    { "label": "misinformation", "value": "misinformation" },
                    { "label": "advertising", "value": "advertising" },
                    { "label": "technology", "value": "technology" }
                  ]
                },
                {
                  "responses": [
                    { "label": "confusion", "value": "confusion" },
                    { "label": "clarity", "value": "clarity" },
                    { "label": "accuracy", "value": "accuracy" }
                  ]
                },
                {
                  "responses": [
                    { "label": "carefully", "value": "carefully" },
                    { "label": "rarely", "value": "rarely" },
                    { "label": "publicly", "value": "publicly" }
                  ]
                },
                {
                  "responses": [
                    { "label": "competition", "value": "competition" },
                    { "label": "collaboration", "value": "collaboration" },
                    { "label": "curiosity", "value": "curiosity" }
                  ]
                },
                {
                  "responses": [
                    { "label": "created", "value": "created" },
                    { "label": "shared", "value": "shared" },
                    { "label": "edited", "value": "edited" }
                  ]
                },
                {
                  "responses": [
                    { "label": "credibility", "value": "credibility" },
                    { "label": "length", "value": "length" },
                    { "label": "tone", "value": "tone" }
                  ]
                },
                {
                  "responses": [
                    { "label": "evidence", "value": "evidence" },
                    { "label": "comments", "value": "comments" },
                    { "label": "opinions", "value": "opinions" }
                  ]
                },
                {
                  "responses": [
                    { "label": "outlets", "value": "outlets" },
                    { "label": "platforms", "value": "platforms" },
                    { "label": "channels", "value": "channels" }
                  ]
                },
                {
                  "responses": [
                    { "label": "opportunities", "value": "opportunities" },
                    { "label": "problems", "value": "problems" },
                    { "label": "dangers", "value": "dangers" }
                  ]
                },
                {
                  "responses": [
                    { "label": "discussion", "value": "discussion" },
                    { "label": "entertainment", "value": "entertainment" },
                    { "label": "consumption", "value": "consumption" }
                  ]
                },
                {
                  "responses": [
                    { "label": "discussion-1", "value": "discussion-1" },
                    { "label": "entertainment-1", "value": "entertainment-1" },
                    { "label": "consumption-1", "value": "consumption-1" }
                  ]
                }
              ],
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Q6",
              "stimulus": "What is the antonym of 'Brave'?",
              "options": [
                { "label": "Courageous", "value": "courageous" },
                { "label": "Fearful", "value": "fearful" },
                { "label": "Bold", "value": "bold" },
                { "label": "Daring", "value": "daring" }
              ],
              "item_type": "DRAWING_AND_WRITING",
              "background_type": "LINE",
              "responses": [],
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Qf6",
              "stimulus": "What is the antonym of 'Brave'?",
              "options": [
                { "label": "Courageous", "value": "courageous" },
                { "label": "Fearful", "value": "fearful" },
                { "label": "Bold", "value": "bold" },
                { "label": "Daring", "value": "daring" }
              ],
              "item_type": "SHORT_TEXT",
              "background_type": "GRID",
              "responses": [],
              "max_words": 5,
              "max_length": 100,
              "allow_paste": false,
              "allow_copy": false,
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Qfjd6",
              "stimulus": "What is the antonym of 'Brave'?",
              "options": [
                { "label": "Courageous", "value": "courageous" },
                { "label": "Fearful", "value": "fearful" },
                { "label": "Bold", "value": "bold" },
                { "label": "Daring", "value": "daring" }
              ],
              "item_type": "ESSAY_RICH_TEXT",
              "background_type": "GRID",
              "responses": [],
              "max_words": 5,
              "max_length": 100,
              "allow_paste": false,
              "allow_copy": false,
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Qfffj6",
              "stimulus": "What is the antonym of 'Brave'?",
              "options": [
                { "label": "Courageous", "value": "courageous" },
                { "label": "Fearful", "value": "fearful" },
                { "label": "Bold", "value": "bold" },
                { "label": "Daring", "value": "daring" }
              ],
              "item_type": "ESSAY_PLAIN_TEXT",
              "background_type": "GRID",
              "responses": [],
              "max_words": null,
              "max_length": 100,
              "allow_paste": false,
              "allow_copy": false,
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Qfj6",
              "stimulus": "<p><strong>Match each country with its correct capital city by dragging the options on the right to align with the stems on the left.</strong></p>",
              "stems": [
                "<p><strong>1. France</strong></p>",
                "<p><strong>2. Japan</strong></p>",
                "<p><strong>3. Canada</strong></p>",
                "<p><strong>4. Brazil</strong></p>"
              ],
              "options": [
                { "label": "<p>Tokyo</p>", "value": "tokyo" },
                { "label": "<p>Ottawa</p>", "value": "ottawa" },
                { "label": "<p>Brasília</p>", "value": "brasilia" },
                { "label": "<p>Paris</p>", "value": "paris" }
              ],
              "item_type": "ASSOCIATION",
              "background_type": "GRID",
              "responses": [],
              "max_words": 5,
              "max_length": 100,
              "allow_paste": false,
              "allow_copy": false,
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Qffdfj6",
              "stimulus": "<p><strong>Match each country with its correct capital city by dragging the options on the right to align with the stems on the left.</strong></p>",
              "stems": [
                "<p><strong>1. France</strong></p>",
                "<p><strong>2. Japan</strong></p>",
                "<p><strong>3. Canada</strong></p>",
                "<p><strong>4. Brazil</strong></p>"
              ],
              "options": [
                { "label": "<p>Tokyo</p>", "value": "tokyo" },
                { "label": "<p>Ottawa</p>", "value": "ottawa" },
                { "label": "<p>Brasília</p>", "value": "brasilia" },
                { "label": "<p>Paris</p>", "value": "paris" }
              ],
              "item_type": "ORDER_LIST",
              "background_type": "GRID",
              "responses": [],
              "max_words": 5,
              "max_length": 100,
              "allow_paste": false,
              "allow_copy": false,
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-IMG-MAP-001",
              "stimulus": "<p><strong>Study the map carefully. Then drag the correct labels from the options below into the empty boxes on the image.</strong></p>",
              "passage_stimulus": "<p>This map highlights four major geographical features in Africa. Your task is to correctly identify each location by placing the appropriate label into the matching box on the image.</p>",

              "item_type": "CLOZE_TEXT_IMAGE",
              "background_type": "IMAGE",

              "image_data": {
                "image": "pngtree-map-of-nigeria-stylized-png-image_10468519.png",
                "width": 1026,
                "height": 1083
              },

              "response_positions": [
                { "x": 22, "y": 30 },
                { "x": 63, "y": 28 },
                { "x": 28, "y": 72 },
                { "x": 70, "y": 75 }
              ],

              "stems": [
                "<p>1. Nile River</p>",
                "<p>2. Sahara Desert</p>",
                "<p>3. Congo Rainforest</p>",
                "<p>4. Kalahari Desert</p>"
              ],

              "options": [
                { "label": "<p>Nile River</p>", "value": "nile_river" },
                { "label": "<p>Sahara Desert</p>", "value": "sahara_desert" },
                { "label": "<p>Congo Rainforest</p>", "value": "congo_rainforest" },
                { "label": "<p>Kalahari Desert</p>", "value": "kalahari_desert" }
              ],

              "responses": [],

              "max_words": 5,
              "max_length": 50,
              "allow_paste": false,
              "allow_copy": false,
              "max_responses": 1,

              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-IMG-MAP-002",
              "stimulus": "<p><strong>Study the map carefully. Then drag the correct labels from the options below into the empty boxes on the image.</strong></p>",
              "passage_stimulus": "<p>This map highlights four major geographical features in Africa. Your task is to correctly identify each location by placing the appropriate label into the matching box on the image.</p>",

              "item_type": "CLOZE_DROPDOWN_IMAGE",
              "background_type": "IMAGE",

              "image_data": {
                "image": "pngtree-map-of-nigeria-stylized-png-image_10468519.png",
                "width": 402,
                "height": 361
              },

              "response_positions": [
                { "x": 22, "y": 30 },
                { "x": 63, "y": 28 },
                { "x": 28, "y": 72 },
                { "x": 70, "y": 75 }
              ],

              "possible_responses": [
                {
                  "responses": [
                    { "label": "misinformation", "value": "misinformation" },
                    { "label": "advertising", "value": "advertising" },
                    { "label": "technology", "value": "technology" }
                  ]
                },
                {
                  "responses": [
                    { "label": "confusion", "value": "confusion" },
                    { "label": "clarity", "value": "clarity" },
                    { "label": "accuracy", "value": "accuracy" }
                  ]
                },
                {
                  "responses": [
                    { "label": "carefully", "value": "carefully" },
                    { "label": "rarely", "value": "rarely" },
                    { "label": "publicly", "value": "publicly" }
                  ]
                },
                {
                  "responses": [
                    { "label": "competition", "value": "competition" },
                    { "label": "collaboration", "value": "collaboration" },
                    { "label": "curiosity", "value": "curiosity" }
                  ]
                },
                {
                  "responses": [
                    { "label": "created", "value": "created" },
                    { "label": "shared", "value": "shared" },
                    { "label": "edited", "value": "edited" }
                  ]
                },
                {
                  "responses": [
                    { "label": "credibility", "value": "credibility" },
                    { "label": "length", "value": "length" },
                    { "label": "tone", "value": "tone" }
                  ]
                },
                {
                  "responses": [
                    { "label": "evidence", "value": "evidence" },
                    { "label": "comments", "value": "comments" },
                    { "label": "opinions", "value": "opinions" }
                  ]
                },
                {
                  "responses": [
                    { "label": "outlets", "value": "outlets" },
                    { "label": "platforms", "value": "platforms" },
                    { "label": "channels", "value": "channels" }
                  ]
                },
                {
                  "responses": [
                    { "label": "opportunities", "value": "opportunities" },
                    { "label": "problems", "value": "problems" },
                    { "label": "dangers", "value": "dangers" }
                  ]
                },
                {
                  "responses": [
                    { "label": "discussion", "value": "discussion" },
                    { "label": "entertainment", "value": "entertainment" },
                    { "label": "consumption", "value": "consumption" }
                  ]
                },
                {
                  "responses": [
                    { "label": "discussion-1", "value": "discussion-1" },
                    { "label": "entertainment-1", "value": "entertainment-1" },
                    { "label": "consumption-1", "value": "consumption-1" }
                  ]
                }
              ],

              "options": [
                { "label": "<p>Nile River</p>", "value": "nile_river" },
                { "label": "<p>Sahara Desert</p>", "value": "sahara_desert" },
                { "label": "<p>Congo Rainforest</p>", "value": "congo_rainforest" },
                { "label": "<p>Kalahari Desert</p>", "value": "kalahari_desert" }
              ],

              "responses": [],

              "max_words": 5,
              "max_length": 50,
              "allow_paste": false,
              "allow_copy": false,
              "max_responses": 1,

              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-IMG-MAP-003",
              "stimulus": "<p><strong>Study the map carefully. Then drag the correct labels from the options below into the empty boxes on the image.</strong></p>",
              "passage_stimulus": "<p>This map highlights four major geographical features in Africa. Your task is to correctly identify each location by placing the appropriate label into the matching box on the image.</p>",

              "item_type": "IMAGE_DRAG_AND_DROP",
              "background_type": "IMAGE",

              "image_data": {
                "image": "pngtree-map-of-nigeria-stylized-png-image_10468519.png",
                "width": 402,
                "height": 361
              },

              "response_positions": [
                { "x": 22, "y": 30 },
                { "x": 63, "y": 28 },
                { "x": 28, "y": 72 },
                { "x": 70, "y": 75 }
              ],

              "possible_responses": [
                {
                  "responses": [
                    { "label": "misinformation", "value": "misinformation" },
                    { "label": "advertising", "value": "advertising" },
                    { "label": "technology", "value": "technology" }
                  ]
                },
                {
                  "responses": [
                    { "label": "confusion", "value": "confusion" },
                    { "label": "clarity", "value": "clarity" },
                    { "label": "accuracy", "value": "accuracy" }
                  ]
                },
                {
                  "responses": [
                    { "label": "carefully", "value": "carefully" },
                    { "label": "rarely", "value": "rarely" },
                    { "label": "publicly", "value": "publicly" }
                  ]
                },
                {
                  "responses": [
                    { "label": "competition", "value": "competition" },
                    { "label": "collaboration", "value": "collaboration" },
                    { "label": "curiosity", "value": "curiosity" }
                  ]
                },
                {
                  "responses": [
                    { "label": "created", "value": "created" },
                    { "label": "shared", "value": "shared" },
                    { "label": "edited", "value": "edited" }
                  ]
                },
                {
                  "responses": [
                    { "label": "credibility", "value": "credibility" },
                    { "label": "length", "value": "length" },
                    { "label": "tone", "value": "tone" }
                  ]
                },
                {
                  "responses": [
                    { "label": "evidence", "value": "evidence" },
                    { "label": "comments", "value": "comments" },
                    { "label": "opinions", "value": "opinions" }
                  ]
                },
                {
                  "responses": [
                    { "label": "outlets", "value": "outlets" },
                    { "label": "platforms", "value": "platforms" },
                    { "label": "channels", "value": "channels" }
                  ]
                },
                {
                  "responses": [
                    { "label": "opportunities", "value": "opportunities" },
                    { "label": "problems", "value": "problems" },
                    { "label": "dangers", "value": "dangers" }
                  ]
                },
                {
                  "responses": [
                    { "label": "discussion", "value": "discussion" },
                    { "label": "entertainment", "value": "entertainment" },
                    { "label": "consumption", "value": "consumption" }
                  ]
                },
                {
                  "responses": [
                    { "label": "discussion-1", "value": "discussion-1" },
                    { "label": "entertainment-1", "value": "entertainment-1" },
                    { "label": "consumption-1", "value": "consumption-1" }
                  ]
                }
              ],

              "options": [
                { "label": "<p>Nile River</p>", "value": "nile_river" },
                { "label": "<p>Sahara Desert</p>", "value": "sahara_desert" },
                { "label": "<p>Congo Rainforest</p>", "value": "congo_rainforest" },
                { "label": "<p>Kalahari Desert</p>", "value": "kalahari_desert" }
              ],

              "responses": [],

              "max_words": 5,
              "max_length": 50,
              "allow_paste": false,
              "allow_copy": false,
              "max_responses": 1,

              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "SCI-CM-301",
              "item_type": "CHOICE_MATRIX",
              "passage_stimulus": "",
              "stimulus": "<p><strong>For each statement below, choose whether it is <em>True</em> or <em>False</em>.</strong></p>",
              "stems": [
                "<p>Solar energy is considered a renewable resource.</p>",
                "<p>Wind turbines generate electricity without producing carbon emissions.</p>",
                "<p>Fossil fuels are classified as renewable sources of energy.</p>",
                "<p>Hydropower plants use the movement of water to create electricity.</p>"
              ],
              "options": [
                { "label": "<p>True</p>", "value": "true" },
                { "label": "<p>False</p>", "value": "false" }
              ],
              "responses": [],
              "drawing_writing_split_type": "NONE",
              "revisit": false
            }

          ],
          "passages": []
        },
        {
          "id": 102,
          "index": 2,
          "block_type": "PASSAGES",
          "total_questions": 2,
          "items": [],
          "passages": [
            {
              "id": "ENG-PASS-1",
              "stimulus": "Climate change is caused primarily by greenhouse gases...",
              "items": [
                {
                  "id": "ENG-P1-Q1",
                  "stimulus": "According to the passage, what is the main cause of climate change?",
                  "options": [
                    {
                      "label": "Natural cycles",
                      "value": "natural"
                    },
                    {
                      "label": "Human activities",
                      "value": "human"
                    },
                    {
                      "label": "Volcanoes",
                      "value": "volcano"
                    }
                  ],
                  "item_type": "MCQ",
                  "responses": [],
                  "max_responses": 1,
                  "image_data": {
                    "image": "",
                    "width": null,
                    "height": null
                  },
                  "drawing_writing_split_type": "NONE",
                  "revisit": false
                },
                {
                  "id": "ENG-P1-Q2",
                  "stimulus": "What is the author’s tone?",
                  "options": [
                    {
                      "label": "Critical",
                      "value": "critical"
                    },
                    {
                      "label": "Neutral",
                      "value": "neutral"
                    },
                    {
                      "label": "Praising",
                      "value": "praising"
                    }
                  ],
                  "item_type": "MCQ",
                  "responses": [],
                  "max_responses": 1,
                  "image_data": {
                    "image": "",
                    "width": null,
                    "height": null
                  },
                  "drawing_writing_split_type": "NONE",
                  "revisit": false
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "SEC-ENG-23",
      "name": "ENGLISH",
      "section_settings": {
        "minutes_left": 40,
        "seconds_left": 0,
        "duration_in_minutes": 45,
        "shuffle_items": false,
        "shuffle_options": true,
        "allow_calculator": false,
        "shuffle_blocks": false,
        "prevent_navigation_to_attempted_items": false,
        "section_instruction": "Answer all questions."
      },
      "question_blocks": [
        {
          "id": 101,
          "index": 1,
          "block_type": "SINGLE_QUESTIONS",
          "total_questions": 3,
          "items": [
            {
              "id": "ENG-Q9",
              "stimulus": "Which word is a noun?",
              "options": [
                { "label": "Run", "value": "run" },
                { "label": "Beauty", "value": "beauty" },
                { "label": "Quickly", "value": "quickly" },
                { "label": "Blue", "value": "blue" }
              ],
              "item_type": "MCQ",
              "responses": [],
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              id: 'ENG-Qasfasfa8',
              stimulus: "Which of the following words are coordinating conjunctions?",
              options: [
                { label: 'For', value: 'for' },
                { label: 'Although', value: 'although' },
                { label: 'Nor', value: 'nor' },
                { label: 'Because', value: 'because' },
              ],
              item_type: 'MRQ',
              responses: [],
              max_responses: 1,
              image_data: { image: '', width: null, height: null },
              drawing_writing_split_type: 'NONE',
              revisit: false,
            },
            {
              id: 'ENG-Q1asafaWD2',
              stimulus: "The word 'ostracize' means to welcome someone warmly into a group.",
              options: [
                { label: 'True', value: 'true' },
                { label: 'False', value: 'false' }
              ],
              item_type: 'TRUE_FALSE',
              responses: [],
              max_responses: 1,
              image_data: { image: '', width: null, height: null },
              drawing_writing_split_type: 'NONE',
              revisit: false,
            },
            {
              id: 'ENG-Q1safsfa4',
              stimulus: 'Is the word "ephemeral" used to describe something that lasts for a very long time?',
              options: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' }
              ],
              item_type: 'YES_NO',
              responses: [],
              max_responses: 1,
              image_data: { image: '', width: null, height: null },
              drawing_writing_split_type: 'NONE',
              revisit: false,
            },
            {
              "id": "ENG-SUM-1112",
              "stimulus": "The rapid rise of digital media has significantly changed the way people consume news and information. In the past, individuals relied heavily on newspapers and scheduled television broadcasts for updates on world events. Today, however, information is available instantly on smartphones, social platforms, and online publications. While this shift has increased accessibility, it has also introduced new challenges. One major concern is the spread of {{response}}, which can mislead the public and create widespread {{response}}. Another issue is the pressure placed on traditional news organizations to deliver content quickly rather than {{response}} ensuring accuracy. As a result, journalists often face tight deadlines and intense {{response}} from online creators who publish content without undergoing the same editorial processes.\n\nTo address these challenges, educators argue that teaching media literacy is essential. Media literacy helps students understand how information is {{response}}, how it spreads, and how to evaluate its reliability. For example, learners are encouraged to question the {{response}} of a source, check for supporting {{response}}, and compare information across multiple {{response}}. With these skills, individuals can better distinguish trustworthy reports from misleading ones.\n\nDespite the difficulties brought about by the digital age, experts believe that the transformation of media also offers significant {{response}}. Audiences now have the chance to engage with news in interactive ways, participate in {{response}}, and access diverse viewpoints from around the world. Ultimately, the future of journalism may depend on society’s ability to balance the benefits of instant information with the need for critical and responsible {{response}}.",
              "item_type": "CLOZE_DROPDOWN",
              "responses": ["", "", "", "", "", "", "", "", "", "", ""],
              "max_responses": 10,
              "passage_stimulus": "",
              "image_data": { "image": "", "width": null, "height": null },
              "response_positions": [
                { "x": 25, "y": 18 },
                { "x": 40, "y": 25 },
                { "x": 52, "y": 32 },
                { "x": 60, "y": 42 },
                { "x": 40, "y": 55 },
                { "x": 45, "y": 62 },
                { "x": 50, "y": 68 },
                { "x": 55, "y": 74 },
                { "x": 65, "y": 82 },
                { "x": 70, "y": 88 },
                { "x": 70, "y": 88 }
              ],
              "possible_responses": [
                {
                  "responses": [
                    { "label": "misinformation", "value": "misinformation" },
                    { "label": "advertising", "value": "advertising" },
                    { "label": "technology", "value": "technology" }
                  ]
                },
                {
                  "responses": [
                    { "label": "confusion", "value": "confusion" },
                    { "label": "clarity", "value": "clarity" },
                    { "label": "accuracy", "value": "accuracy" }
                  ]
                },
                {
                  "responses": [
                    { "label": "carefully", "value": "carefully" },
                    { "label": "rarely", "value": "rarely" },
                    { "label": "publicly", "value": "publicly" }
                  ]
                },
                {
                  "responses": [
                    { "label": "competition", "value": "competition" },
                    { "label": "collaboration", "value": "collaboration" },
                    { "label": "curiosity", "value": "curiosity" }
                  ]
                },
                {
                  "responses": [
                    { "label": "created", "value": "created" },
                    { "label": "shared", "value": "shared" },
                    { "label": "edited", "value": "edited" }
                  ]
                },
                {
                  "responses": [
                    { "label": "credibility", "value": "credibility" },
                    { "label": "length", "value": "length" },
                    { "label": "tone", "value": "tone" }
                  ]
                },
                {
                  "responses": [
                    { "label": "evidence", "value": "evidence" },
                    { "label": "comments", "value": "comments" },
                    { "label": "opinions", "value": "opinions" }
                  ]
                },
                {
                  "responses": [
                    { "label": "outlets", "value": "outlets" },
                    { "label": "platforms", "value": "platforms" },
                    { "label": "channels", "value": "channels" }
                  ]
                },
                {
                  "responses": [
                    { "label": "opportunities", "value": "opportunities" },
                    { "label": "problems", "value": "problems" },
                    { "label": "dangers", "value": "dangers" }
                  ]
                },
                {
                  "responses": [
                    { "label": "discussion", "value": "discussion" },
                    { "label": "entertainment", "value": "entertainment" },
                    { "label": "consumption", "value": "consumption" }
                  ]
                },
                {
                  "responses": [
                    { "label": "discussion-1", "value": "discussion-1" },
                    { "label": "entertainment-1", "value": "entertainment-1" },
                    { "label": "consumption-1", "value": "consumption-1" }
                  ]
                }
              ],
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-SUM-112",
              "stimulus": "The rapid rise of digital media has significantly changed the way people consume news and information. In the past, individuals relied heavily on newspapers and scheduled television broadcasts for updates on world events. Today, however, information is available instantly on smartphones, social platforms, and online publications. While this shift has increased accessibility, it has also introduced new challenges. One major concern is the spread of {{response}}, which can mislead the public and create widespread {{response}}. Another issue is the pressure placed on traditional news organizations to deliver content quickly rather than {{response}} ensuring accuracy. As a result, journalists often face tight deadlines and intense {{response}} from online creators who publish content without undergoing the same editorial processes.\n\nTo address these challenges, educators argue that teaching media literacy is essential. Media literacy helps students understand how information is {{response}}, how it spreads, and how to evaluate its reliability. For example, learners are encouraged to question the {{response}} of a source, check for supporting {{response}}, and compare information across multiple {{response}}. With these skills, individuals can better distinguish trustworthy reports from misleading ones.\n\nDespite the difficulties brought about by the digital age, experts believe that the transformation of media also offers significant {{response}}. Audiences now have the chance to engage with news in interactive ways, participate in {{response}}, and access diverse viewpoints from around the world. Ultimately, the future of journalism may depend on society’s ability to balance the benefits of instant information with the need for critical and responsible {{response}}.",
              "item_type": "CLOZE_TEXT",
              "responses": ["", "", "", "", "", "", "", "", "", "", ""],
              "max_responses": 10,
              "passage_stimulus": "",
              "image_data": { "image": "", "width": null, "height": null },
              "response_positions": [
                { "x": 25, "y": 18 },
                { "x": 40, "y": 25 },
                { "x": 52, "y": 32 },
                { "x": 60, "y": 42 },
                { "x": 40, "y": 55 },
                { "x": 45, "y": 62 },
                { "x": 50, "y": 68 },
                { "x": 55, "y": 74 },
                { "x": 65, "y": 82 },
                { "x": 70, "y": 88 },
                { "x": 70, "y": 88 }
              ],
              "possible_responses": [
                {
                  "responses": [
                    { "label": "misinformation", "value": "misinformation" },
                    { "label": "advertising", "value": "advertising" },
                    { "label": "technology", "value": "technology" }
                  ]
                },
                {
                  "responses": [
                    { "label": "confusion", "value": "confusion" },
                    { "label": "clarity", "value": "clarity" },
                    { "label": "accuracy", "value": "accuracy" }
                  ]
                },
                {
                  "responses": [
                    { "label": "carefully", "value": "carefully" },
                    { "label": "rarely", "value": "rarely" },
                    { "label": "publicly", "value": "publicly" }
                  ]
                },
                {
                  "responses": [
                    { "label": "competition", "value": "competition" },
                    { "label": "collaboration", "value": "collaboration" },
                    { "label": "curiosity", "value": "curiosity" }
                  ]
                },
                {
                  "responses": [
                    { "label": "created", "value": "created" },
                    { "label": "shared", "value": "shared" },
                    { "label": "edited", "value": "edited" }
                  ]
                },
                {
                  "responses": [
                    { "label": "credibility", "value": "credibility" },
                    { "label": "length", "value": "length" },
                    { "label": "tone", "value": "tone" }
                  ]
                },
                {
                  "responses": [
                    { "label": "evidence", "value": "evidence" },
                    { "label": "comments", "value": "comments" },
                    { "label": "opinions", "value": "opinions" }
                  ]
                },
                {
                  "responses": [
                    { "label": "outlets", "value": "outlets" },
                    { "label": "platforms", "value": "platforms" },
                    { "label": "channels", "value": "channels" }
                  ]
                },
                {
                  "responses": [
                    { "label": "opportunities", "value": "opportunities" },
                    { "label": "problems", "value": "problems" },
                    { "label": "dangers", "value": "dangers" }
                  ]
                },
                {
                  "responses": [
                    { "label": "discussion", "value": "discussion" },
                    { "label": "entertainment", "value": "entertainment" },
                    { "label": "consumption", "value": "consumption" }
                  ]
                },
                {
                  "responses": [
                    { "label": "discussion-1", "value": "discussion-1" },
                    { "label": "entertainment-1", "value": "entertainment-1" },
                    { "label": "consumption-1", "value": "consumption-1" }
                  ]
                }
              ],
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-SUM-11-2",
              "stimulus": "The rapid rise of digital media has significantly changed the way people consume news and information. In the past, individuals relied heavily on newspapers and scheduled television broadcasts for updates on world events. Today, however, information is available instantly on smartphones, social platforms, and online publications. While this shift has increased accessibility, it has also introduced new challenges. One major concern is the spread of {{response}}, which can mislead the public and create widespread {{response}}. Another issue is the pressure placed on traditional news organizations to deliver content quickly rather than {{response}} ensuring accuracy. As a result, journalists often face tight deadlines and intense {{response}} from online creators who publish content without undergoing the same editorial processes.\n\nTo address these challenges, educators argue that teaching media literacy is essential. Media literacy helps students understand how information is {{response}}, how it spreads, and how to evaluate its reliability. For example, learners are encouraged to question the {{response}} of a source, check for supporting {{response}}, and compare information across multiple {{response}}. With these skills, individuals can better distinguish trustworthy reports from misleading ones.\n\nDespite the difficulties brought about by the digital age, experts believe that the transformation of media also offers significant {{response}}. Audiences now have the chance to engage with news in interactive ways, participate in {{response}}, and access diverse viewpoints from around the world. Ultimately, the future of journalism may depend on society’s ability to balance the benefits of instant information with the need for critical and responsible {{response}}.",
              "item_type": "CLOZE_RADIO",
              "responses": ["", "", "", "", "", "", "", "", "", "", ""],
              "max_responses": 10,
              "passage_stimulus": "",
              "image_data": { "image": "", "width": null, "height": null },
              "response_positions": [
                { "x": 25, "y": 18 },
                { "x": 40, "y": 25 },
                { "x": 52, "y": 32 },
                { "x": 60, "y": 42 },
                { "x": 40, "y": 55 },
                { "x": 45, "y": 62 },
                { "x": 50, "y": 68 },
                { "x": 55, "y": 74 },
                { "x": 65, "y": 82 },
                { "x": 70, "y": 88 },
                { "x": 70, "y": 88 }
              ],
              "possible_responses": [
                {
                  "responses": [
                    { "label": "misinformation", "value": "misinformation" },
                    { "label": "advertising", "value": "advertising" },
                    { "label": "technology", "value": "technology" }
                  ]
                },
                {
                  "responses": [
                    { "label": "confusion", "value": "confusion" },
                    { "label": "clarity", "value": "clarity" },
                    { "label": "accuracy", "value": "accuracy" }
                  ]
                },
                {
                  "responses": [
                    { "label": "carefully", "value": "carefully" },
                    { "label": "rarely", "value": "rarely" },
                    { "label": "publicly", "value": "publicly" }
                  ]
                },
                {
                  "responses": [
                    { "label": "competition", "value": "competition" },
                    { "label": "collaboration", "value": "collaboration" },
                    { "label": "curiosity", "value": "curiosity" }
                  ]
                },
                {
                  "responses": [
                    { "label": "created", "value": "created" },
                    { "label": "shared", "value": "shared" },
                    { "label": "edited", "value": "edited" }
                  ]
                },
                {
                  "responses": [
                    { "label": "credibility", "value": "credibility" },
                    { "label": "length", "value": "length" },
                    { "label": "tone", "value": "tone" }
                  ]
                },
                {
                  "responses": [
                    { "label": "evidence", "value": "evidence" },
                    { "label": "comments", "value": "comments" },
                    { "label": "opinions", "value": "opinions" }
                  ]
                },
                {
                  "responses": [
                    { "label": "outlets", "value": "outlets" },
                    { "label": "platforms", "value": "platforms" },
                    { "label": "channels", "value": "channels" }
                  ]
                },
                {
                  "responses": [
                    { "label": "opportunities", "value": "opportunities" },
                    { "label": "problems", "value": "problems" },
                    { "label": "dangers", "value": "dangers" }
                  ]
                },
                {
                  "responses": [
                    { "label": "discussion", "value": "discussion" },
                    { "label": "entertainment", "value": "entertainment" },
                    { "label": "consumption", "value": "consumption" }
                  ]
                },
                {
                  "responses": [
                    { "label": "discussion-1", "value": "discussion-1" },
                    { "label": "entertainment-1", "value": "entertainment-1" },
                    { "label": "consumption-1", "value": "consumption-1" }
                  ]
                }
              ],
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Q6",
              "stimulus": "What is the antonym of 'Brave'?",
              "options": [
                { "label": "Courageous", "value": "courageous" },
                { "label": "Fearful", "value": "fearful" },
                { "label": "Bold", "value": "bold" },
                { "label": "Daring", "value": "daring" }
              ],
              "item_type": "DRAWING_AND_WRITING",
              "background_type": "LINE",
              "responses": [],
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Qf6",
              "stimulus": "What is the antonym of 'Brave'?",
              "options": [
                { "label": "Courageous", "value": "courageous" },
                { "label": "Fearful", "value": "fearful" },
                { "label": "Bold", "value": "bold" },
                { "label": "Daring", "value": "daring" }
              ],
              "item_type": "SHORT_TEXT",
              "background_type": "GRID",
              "responses": [],
              "max_words": 5,
              "max_length": 100,
              "allow_paste": false,
              "allow_copy": false,
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Qfjd6",
              "stimulus": "What is the antonym of 'Brave'?",
              "options": [
                { "label": "Courageous", "value": "courageous" },
                { "label": "Fearful", "value": "fearful" },
                { "label": "Bold", "value": "bold" },
                { "label": "Daring", "value": "daring" }
              ],
              "item_type": "ESSAY_RICH_TEXT",
              "background_type": "GRID",
              "responses": [],
              "max_words": 5,
              "max_length": 100,
              "allow_paste": false,
              "allow_copy": false,
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Qfffj6",
              "stimulus": "What is the antonym of 'Brave'?",
              "options": [
                { "label": "Courageous", "value": "courageous" },
                { "label": "Fearful", "value": "fearful" },
                { "label": "Bold", "value": "bold" },
                { "label": "Daring", "value": "daring" }
              ],
              "item_type": "ESSAY_PLAIN_TEXT",
              "background_type": "GRID",
              "responses": [],
              "max_words": null,
              "max_length": 100,
              "allow_paste": false,
              "allow_copy": false,
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Qfj6",
              "stimulus": "<p><strong>Match each country with its correct capital city by dragging the options on the right to align with the stems on the left.</strong></p>",
              "stems": [
                "<p><strong>1. France</strong></p>",
                "<p><strong>2. Japan</strong></p>",
                "<p><strong>3. Canada</strong></p>",
                "<p><strong>4. Brazil</strong></p>"
              ],
              "options": [
                { "label": "<p>Tokyo</p>", "value": "tokyo" },
                { "label": "<p>Ottawa</p>", "value": "ottawa" },
                { "label": "<p>Brasília</p>", "value": "brasilia" },
                { "label": "<p>Paris</p>", "value": "paris" }
              ],
              "item_type": "ASSOCIATION",
              "background_type": "GRID",
              "responses": [],
              "max_words": 5,
              "max_length": 100,
              "allow_paste": false,
              "allow_copy": false,
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Qffdfj6",
              "stimulus": "<p><strong>Match each country with its correct capital city by dragging the options on the right to align with the stems on the left.</strong></p>",
              "stems": [
                "<p><strong>1. France</strong></p>",
                "<p><strong>2. Japan</strong></p>",
                "<p><strong>3. Canada</strong></p>",
                "<p><strong>4. Brazil</strong></p>"
              ],
              "options": [
                { "label": "<p>Tokyo</p>", "value": "tokyo" },
                { "label": "<p>Ottawa</p>", "value": "ottawa" },
                { "label": "<p>Brasília</p>", "value": "brasilia" },
                { "label": "<p>Paris</p>", "value": "paris" }
              ],
              "item_type": "ORDER_LIST",
              "background_type": "GRID",
              "responses": [],
              "max_words": 5,
              "max_length": 100,
              "allow_paste": false,
              "allow_copy": false,
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-IMG-MAP-001",
              "stimulus": "<p><strong>Study the map carefully. Then drag the correct labels from the options below into the empty boxes on the image.</strong></p>",
              "passage_stimulus": "<p>This map highlights four major geographical features in Africa. Your task is to correctly identify each location by placing the appropriate label into the matching box on the image.</p>",

              "item_type": "CLOZE_TEXT_IMAGE",
              "background_type": "IMAGE",

              "image_data": {
                "image": "pngtree-map-of-nigeria-stylized-png-image_10468519.png",
                "width": 1026,
                "height": 1083
              },

              "response_positions": [
                { "x": 22, "y": 30 },
                { "x": 63, "y": 28 },
                { "x": 28, "y": 72 },
                { "x": 70, "y": 75 }
              ],

              "stems": [
                "<p>1. Nile River</p>",
                "<p>2. Sahara Desert</p>",
                "<p>3. Congo Rainforest</p>",
                "<p>4. Kalahari Desert</p>"
              ],

              "options": [
                { "label": "<p>Nile River</p>", "value": "nile_river" },
                { "label": "<p>Sahara Desert</p>", "value": "sahara_desert" },
                { "label": "<p>Congo Rainforest</p>", "value": "congo_rainforest" },
                { "label": "<p>Kalahari Desert</p>", "value": "kalahari_desert" }
              ],

              "responses": [],

              "max_words": 5,
              "max_length": 50,
              "allow_paste": false,
              "allow_copy": false,
              "max_responses": 1,

              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-IMG-MAP-002",
              "stimulus": "<p><strong>Study the map carefully. Then drag the correct labels from the options below into the empty boxes on the image.</strong></p>",
              "passage_stimulus": "<p>This map highlights four major geographical features in Africa. Your task is to correctly identify each location by placing the appropriate label into the matching box on the image.</p>",

              "item_type": "CLOZE_DROPDOWN_IMAGE",
              "background_type": "IMAGE",

              "image_data": {
                "image": "pngtree-map-of-nigeria-stylized-png-image_10468519.png",
                "width": 402,
                "height": 361
              },

              "response_positions": [
                { "x": 22, "y": 30 },
                { "x": 63, "y": 28 },
                { "x": 28, "y": 72 },
                { "x": 70, "y": 75 }
              ],

              "possible_responses": [
                {
                  "responses": [
                    { "label": "misinformation", "value": "misinformation" },
                    { "label": "advertising", "value": "advertising" },
                    { "label": "technology", "value": "technology" }
                  ]
                },
                {
                  "responses": [
                    { "label": "confusion", "value": "confusion" },
                    { "label": "clarity", "value": "clarity" },
                    { "label": "accuracy", "value": "accuracy" }
                  ]
                },
                {
                  "responses": [
                    { "label": "carefully", "value": "carefully" },
                    { "label": "rarely", "value": "rarely" },
                    { "label": "publicly", "value": "publicly" }
                  ]
                },
                {
                  "responses": [
                    { "label": "competition", "value": "competition" },
                    { "label": "collaboration", "value": "collaboration" },
                    { "label": "curiosity", "value": "curiosity" }
                  ]
                },
                {
                  "responses": [
                    { "label": "created", "value": "created" },
                    { "label": "shared", "value": "shared" },
                    { "label": "edited", "value": "edited" }
                  ]
                },
                {
                  "responses": [
                    { "label": "credibility", "value": "credibility" },
                    { "label": "length", "value": "length" },
                    { "label": "tone", "value": "tone" }
                  ]
                },
                {
                  "responses": [
                    { "label": "evidence", "value": "evidence" },
                    { "label": "comments", "value": "comments" },
                    { "label": "opinions", "value": "opinions" }
                  ]
                },
                {
                  "responses": [
                    { "label": "outlets", "value": "outlets" },
                    { "label": "platforms", "value": "platforms" },
                    { "label": "channels", "value": "channels" }
                  ]
                },
                {
                  "responses": [
                    { "label": "opportunities", "value": "opportunities" },
                    { "label": "problems", "value": "problems" },
                    { "label": "dangers", "value": "dangers" }
                  ]
                },
                {
                  "responses": [
                    { "label": "discussion", "value": "discussion" },
                    { "label": "entertainment", "value": "entertainment" },
                    { "label": "consumption", "value": "consumption" }
                  ]
                },
                {
                  "responses": [
                    { "label": "discussion-1", "value": "discussion-1" },
                    { "label": "entertainment-1", "value": "entertainment-1" },
                    { "label": "consumption-1", "value": "consumption-1" }
                  ]
                }
              ],

              "options": [
                { "label": "<p>Nile River</p>", "value": "nile_river" },
                { "label": "<p>Sahara Desert</p>", "value": "sahara_desert" },
                { "label": "<p>Congo Rainforest</p>", "value": "congo_rainforest" },
                { "label": "<p>Kalahari Desert</p>", "value": "kalahari_desert" }
              ],

              "responses": [],

              "max_words": 5,
              "max_length": 50,
              "allow_paste": false,
              "allow_copy": false,
              "max_responses": 1,

              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-IMG-MAP-003",
              "stimulus": "<p><strong>Study the map carefully. Then drag the correct labels from the options below into the empty boxes on the image.</strong></p>",
              "passage_stimulus": "<p>This map highlights four major geographical features in Africa. Your task is to correctly identify each location by placing the appropriate label into the matching box on the image.</p>",

              "item_type": "IMAGE_DRAG_AND_DROP",
              "background_type": "IMAGE",

              "image_data": {
                "image": "pngtree-map-of-nigeria-stylized-png-image_10468519.png",
                "width": 402,
                "height": 361
              },

              "response_positions": [
                { "x": 22, "y": 30 },
                { "x": 63, "y": 28 },
                { "x": 28, "y": 72 },
                { "x": 70, "y": 75 }
              ],

              "possible_responses": [
                {
                  "responses": [
                    { "label": "misinformation", "value": "misinformation" },
                    { "label": "advertising", "value": "advertising" },
                    { "label": "technology", "value": "technology" }
                  ]
                },
                {
                  "responses": [
                    { "label": "confusion", "value": "confusion" },
                    { "label": "clarity", "value": "clarity" },
                    { "label": "accuracy", "value": "accuracy" }
                  ]
                },
                {
                  "responses": [
                    { "label": "carefully", "value": "carefully" },
                    { "label": "rarely", "value": "rarely" },
                    { "label": "publicly", "value": "publicly" }
                  ]
                },
                {
                  "responses": [
                    { "label": "competition", "value": "competition" },
                    { "label": "collaboration", "value": "collaboration" },
                    { "label": "curiosity", "value": "curiosity" }
                  ]
                },
                {
                  "responses": [
                    { "label": "created", "value": "created" },
                    { "label": "shared", "value": "shared" },
                    { "label": "edited", "value": "edited" }
                  ]
                },
                {
                  "responses": [
                    { "label": "credibility", "value": "credibility" },
                    { "label": "length", "value": "length" },
                    { "label": "tone", "value": "tone" }
                  ]
                },
                {
                  "responses": [
                    { "label": "evidence", "value": "evidence" },
                    { "label": "comments", "value": "comments" },
                    { "label": "opinions", "value": "opinions" }
                  ]
                },
                {
                  "responses": [
                    { "label": "outlets", "value": "outlets" },
                    { "label": "platforms", "value": "platforms" },
                    { "label": "channels", "value": "channels" }
                  ]
                },
                {
                  "responses": [
                    { "label": "opportunities", "value": "opportunities" },
                    { "label": "problems", "value": "problems" },
                    { "label": "dangers", "value": "dangers" }
                  ]
                },
                {
                  "responses": [
                    { "label": "discussion", "value": "discussion" },
                    { "label": "entertainment", "value": "entertainment" },
                    { "label": "consumption", "value": "consumption" }
                  ]
                },
                {
                  "responses": [
                    { "label": "discussion-1", "value": "discussion-1" },
                    { "label": "entertainment-1", "value": "entertainment-1" },
                    { "label": "consumption-1", "value": "consumption-1" }
                  ]
                }
              ],

              "options": [
                { "label": "<p>Nile River</p>", "value": "nile_river" },
                { "label": "<p>Sahara Desert</p>", "value": "sahara_desert" },
                { "label": "<p>Congo Rainforest</p>", "value": "congo_rainforest" },
                { "label": "<p>Kalahari Desert</p>", "value": "kalahari_desert" }
              ],

              "responses": [],

              "max_words": 5,
              "max_length": 50,
              "allow_paste": false,
              "allow_copy": false,
              "max_responses": 1,

              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "SCI-CM-301",
              "item_type": "CHOICE_MATRIX",
              "passage_stimulus": "",
              "stimulus": "<p><strong>For each statement below, choose whether it is <em>True</em> or <em>False</em>.</strong></p>",
              "stems": [
                "<p>Solar energy is considered a renewable resource.</p>",
                "<p>Wind turbines generate electricity without producing carbon emissions.</p>",
                "<p>Fossil fuels are classified as renewable sources of energy.</p>",
                "<p>Hydropower plants use the movement of water to create electricity.</p>"
              ],
              "options": [
                { "label": "<p>True</p>", "value": "true" },
                { "label": "<p>False</p>", "value": "false" }
              ],
              "responses": [],
              "drawing_writing_split_type": "NONE",
              "revisit": false
            }

          ],
          "passages": []
        },
        {
          "id": 102,
          "index": 2,
          "block_type": "PASSAGES",
          "total_questions": 2,
          "items": [],
          "passages": [
            {
              "id": "ENG-PASS-1",
              "stimulus": "Climate change is caused primarily by greenhouse gases...",
              "items": [
                {
                  "id": "ENG-P1-Q1",
                  "stimulus": "According to the passage, what is the main cause of climate change?",
                  "options": [
                    {
                      "label": "Natural cycles",
                      "value": "natural"
                    },
                    {
                      "label": "Human activities",
                      "value": "human"
                    },
                    {
                      "label": "Volcanoes",
                      "value": "volcano"
                    }
                  ],
                  "item_type": "MCQ",
                  "responses": [],
                  "max_responses": 1,
                  "image_data": {
                    "image": "",
                    "width": null,
                    "height": null
                  },
                  "drawing_writing_split_type": "NONE",
                  "revisit": false
                },
                {
                  "id": "ENG-P1-Q2",
                  "stimulus": "What is the author’s tone?",
                  "options": [
                    {
                      "label": "Critical",
                      "value": "critical"
                    },
                    {
                      "label": "Neutral",
                      "value": "neutral"
                    },
                    {
                      "label": "Praising",
                      "value": "praising"
                    }
                  ],
                  "item_type": "MCQ",
                  "responses": [],
                  "max_responses": 1,
                  "image_data": {
                    "image": "",
                    "width": null,
                    "height": null
                  },
                  "drawing_writing_split_type": "NONE",
                  "revisit": false
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "SEC-ENG-235",
      "name": "MATH",
      "section_settings": {
        "minutes_left": 40,
        "seconds_left": 0,
        "duration_in_minutes": 45,
        "shuffle_items": false,
        "shuffle_options": true,
        "allow_calculator": false,
        "shuffle_blocks": false,
        "prevent_navigation_to_attempted_items": false,
        "section_instruction": "Answer all questions."
      },
      "question_blocks": [
        {
          "id": 101,
          "index": 1,
          "block_type": "SINGLE_QUESTIONS",
          "total_questions": 3,
          "items": [
            {
              "id": "ENG-Q9",
              "stimulus": "Which word is a noun?",
              "options": [
                { "label": "Run", "value": "run" },
                { "label": "Beauty", "value": "beauty" },
                { "label": "Quickly", "value": "quickly" },
                { "label": "Blue", "value": "blue" }
              ],
              "item_type": "MCQ",
              "responses": [],
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              id: 'ENG-Qasfasfa8',
              stimulus: "Which of the following words are coordinating conjunctions?",
              options: [
                { label: 'For', value: 'for' },
                { label: 'Although', value: 'although' },
                { label: 'Nor', value: 'nor' },
                { label: 'Because', value: 'because' },
              ],
              item_type: 'MRQ',
              responses: [],
              max_responses: 1,
              image_data: { image: '', width: null, height: null },
              drawing_writing_split_type: 'NONE',
              revisit: false,
            },
            {
              id: 'ENG-Q1asafaWD2',
              stimulus: "The word 'ostracize' means to welcome someone warmly into a group.",
              options: [
                { label: 'True', value: 'true' },
                { label: 'False', value: 'false' }
              ],
              item_type: 'TRUE_FALSE',
              responses: [],
              max_responses: 1,
              image_data: { image: '', width: null, height: null },
              drawing_writing_split_type: 'NONE',
              revisit: false,
            },
            {
              id: 'ENG-Q1safsfa4',
              stimulus: 'Is the word "ephemeral" used to describe something that lasts for a very long time?',
              options: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' }
              ],
              item_type: 'YES_NO',
              responses: [],
              max_responses: 1,
              image_data: { image: '', width: null, height: null },
              drawing_writing_split_type: 'NONE',
              revisit: false,
            },
            {
              "id": "ENG-SUM-1112",
              "stimulus": "The rapid rise of digital media has significantly changed the way people consume news and information. In the past, individuals relied heavily on newspapers and scheduled television broadcasts for updates on world events. Today, however, information is available instantly on smartphones, social platforms, and online publications. While this shift has increased accessibility, it has also introduced new challenges. One major concern is the spread of {{response}}, which can mislead the public and create widespread {{response}}. Another issue is the pressure placed on traditional news organizations to deliver content quickly rather than {{response}} ensuring accuracy. As a result, journalists often face tight deadlines and intense {{response}} from online creators who publish content without undergoing the same editorial processes.\n\nTo address these challenges, educators argue that teaching media literacy is essential. Media literacy helps students understand how information is {{response}}, how it spreads, and how to evaluate its reliability. For example, learners are encouraged to question the {{response}} of a source, check for supporting {{response}}, and compare information across multiple {{response}}. With these skills, individuals can better distinguish trustworthy reports from misleading ones.\n\nDespite the difficulties brought about by the digital age, experts believe that the transformation of media also offers significant {{response}}. Audiences now have the chance to engage with news in interactive ways, participate in {{response}}, and access diverse viewpoints from around the world. Ultimately, the future of journalism may depend on society’s ability to balance the benefits of instant information with the need for critical and responsible {{response}}.",
              "item_type": "CLOZE_DROPDOWN",
              "responses": ["", "", "", "", "", "", "", "", "", "", ""],
              "max_responses": 10,
              "passage_stimulus": "",
              "image_data": { "image": "", "width": null, "height": null },
              "response_positions": [
                { "x": 25, "y": 18 },
                { "x": 40, "y": 25 },
                { "x": 52, "y": 32 },
                { "x": 60, "y": 42 },
                { "x": 40, "y": 55 },
                { "x": 45, "y": 62 },
                { "x": 50, "y": 68 },
                { "x": 55, "y": 74 },
                { "x": 65, "y": 82 },
                { "x": 70, "y": 88 },
                { "x": 70, "y": 88 }
              ],
              "possible_responses": [
                {
                  "responses": [
                    { "label": "misinformation", "value": "misinformation" },
                    { "label": "advertising", "value": "advertising" },
                    { "label": "technology", "value": "technology" }
                  ]
                },
                {
                  "responses": [
                    { "label": "confusion", "value": "confusion" },
                    { "label": "clarity", "value": "clarity" },
                    { "label": "accuracy", "value": "accuracy" }
                  ]
                },
                {
                  "responses": [
                    { "label": "carefully", "value": "carefully" },
                    { "label": "rarely", "value": "rarely" },
                    { "label": "publicly", "value": "publicly" }
                  ]
                },
                {
                  "responses": [
                    { "label": "competition", "value": "competition" },
                    { "label": "collaboration", "value": "collaboration" },
                    { "label": "curiosity", "value": "curiosity" }
                  ]
                },
                {
                  "responses": [
                    { "label": "created", "value": "created" },
                    { "label": "shared", "value": "shared" },
                    { "label": "edited", "value": "edited" }
                  ]
                },
                {
                  "responses": [
                    { "label": "credibility", "value": "credibility" },
                    { "label": "length", "value": "length" },
                    { "label": "tone", "value": "tone" }
                  ]
                },
                {
                  "responses": [
                    { "label": "evidence", "value": "evidence" },
                    { "label": "comments", "value": "comments" },
                    { "label": "opinions", "value": "opinions" }
                  ]
                },
                {
                  "responses": [
                    { "label": "outlets", "value": "outlets" },
                    { "label": "platforms", "value": "platforms" },
                    { "label": "channels", "value": "channels" }
                  ]
                },
                {
                  "responses": [
                    { "label": "opportunities", "value": "opportunities" },
                    { "label": "problems", "value": "problems" },
                    { "label": "dangers", "value": "dangers" }
                  ]
                },
                {
                  "responses": [
                    { "label": "discussion", "value": "discussion" },
                    { "label": "entertainment", "value": "entertainment" },
                    { "label": "consumption", "value": "consumption" }
                  ]
                },
                {
                  "responses": [
                    { "label": "discussion-1", "value": "discussion-1" },
                    { "label": "entertainment-1", "value": "entertainment-1" },
                    { "label": "consumption-1", "value": "consumption-1" }
                  ]
                }
              ],
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-SUM-112",
              "stimulus": "The rapid rise of digital media has significantly changed the way people consume news and information. In the past, individuals relied heavily on newspapers and scheduled television broadcasts for updates on world events. Today, however, information is available instantly on smartphones, social platforms, and online publications. While this shift has increased accessibility, it has also introduced new challenges. One major concern is the spread of {{response}}, which can mislead the public and create widespread {{response}}. Another issue is the pressure placed on traditional news organizations to deliver content quickly rather than {{response}} ensuring accuracy. As a result, journalists often face tight deadlines and intense {{response}} from online creators who publish content without undergoing the same editorial processes.\n\nTo address these challenges, educators argue that teaching media literacy is essential. Media literacy helps students understand how information is {{response}}, how it spreads, and how to evaluate its reliability. For example, learners are encouraged to question the {{response}} of a source, check for supporting {{response}}, and compare information across multiple {{response}}. With these skills, individuals can better distinguish trustworthy reports from misleading ones.\n\nDespite the difficulties brought about by the digital age, experts believe that the transformation of media also offers significant {{response}}. Audiences now have the chance to engage with news in interactive ways, participate in {{response}}, and access diverse viewpoints from around the world. Ultimately, the future of journalism may depend on society’s ability to balance the benefits of instant information with the need for critical and responsible {{response}}.",
              "item_type": "CLOZE_TEXT",
              "responses": ["", "", "", "", "", "", "", "", "", "", ""],
              "max_responses": 10,
              "passage_stimulus": "",
              "image_data": { "image": "", "width": null, "height": null },
              "response_positions": [
                { "x": 25, "y": 18 },
                { "x": 40, "y": 25 },
                { "x": 52, "y": 32 },
                { "x": 60, "y": 42 },
                { "x": 40, "y": 55 },
                { "x": 45, "y": 62 },
                { "x": 50, "y": 68 },
                { "x": 55, "y": 74 },
                { "x": 65, "y": 82 },
                { "x": 70, "y": 88 },
                { "x": 70, "y": 88 }
              ],
              "possible_responses": [
                {
                  "responses": [
                    { "label": "misinformation", "value": "misinformation" },
                    { "label": "advertising", "value": "advertising" },
                    { "label": "technology", "value": "technology" }
                  ]
                },
                {
                  "responses": [
                    { "label": "confusion", "value": "confusion" },
                    { "label": "clarity", "value": "clarity" },
                    { "label": "accuracy", "value": "accuracy" }
                  ]
                },
                {
                  "responses": [
                    { "label": "carefully", "value": "carefully" },
                    { "label": "rarely", "value": "rarely" },
                    { "label": "publicly", "value": "publicly" }
                  ]
                },
                {
                  "responses": [
                    { "label": "competition", "value": "competition" },
                    { "label": "collaboration", "value": "collaboration" },
                    { "label": "curiosity", "value": "curiosity" }
                  ]
                },
                {
                  "responses": [
                    { "label": "created", "value": "created" },
                    { "label": "shared", "value": "shared" },
                    { "label": "edited", "value": "edited" }
                  ]
                },
                {
                  "responses": [
                    { "label": "credibility", "value": "credibility" },
                    { "label": "length", "value": "length" },
                    { "label": "tone", "value": "tone" }
                  ]
                },
                {
                  "responses": [
                    { "label": "evidence", "value": "evidence" },
                    { "label": "comments", "value": "comments" },
                    { "label": "opinions", "value": "opinions" }
                  ]
                },
                {
                  "responses": [
                    { "label": "outlets", "value": "outlets" },
                    { "label": "platforms", "value": "platforms" },
                    { "label": "channels", "value": "channels" }
                  ]
                },
                {
                  "responses": [
                    { "label": "opportunities", "value": "opportunities" },
                    { "label": "problems", "value": "problems" },
                    { "label": "dangers", "value": "dangers" }
                  ]
                },
                {
                  "responses": [
                    { "label": "discussion", "value": "discussion" },
                    { "label": "entertainment", "value": "entertainment" },
                    { "label": "consumption", "value": "consumption" }
                  ]
                },
                {
                  "responses": [
                    { "label": "discussion-1", "value": "discussion-1" },
                    { "label": "entertainment-1", "value": "entertainment-1" },
                    { "label": "consumption-1", "value": "consumption-1" }
                  ]
                }
              ],
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-SUM-11-2",
              "stimulus": "The rapid rise of digital media has significantly changed the way people consume news and information. In the past, individuals relied heavily on newspapers and scheduled television broadcasts for updates on world events. Today, however, information is available instantly on smartphones, social platforms, and online publications. While this shift has increased accessibility, it has also introduced new challenges. One major concern is the spread of {{response}}, which can mislead the public and create widespread {{response}}. Another issue is the pressure placed on traditional news organizations to deliver content quickly rather than {{response}} ensuring accuracy. As a result, journalists often face tight deadlines and intense {{response}} from online creators who publish content without undergoing the same editorial processes.\n\nTo address these challenges, educators argue that teaching media literacy is essential. Media literacy helps students understand how information is {{response}}, how it spreads, and how to evaluate its reliability. For example, learners are encouraged to question the {{response}} of a source, check for supporting {{response}}, and compare information across multiple {{response}}. With these skills, individuals can better distinguish trustworthy reports from misleading ones.\n\nDespite the difficulties brought about by the digital age, experts believe that the transformation of media also offers significant {{response}}. Audiences now have the chance to engage with news in interactive ways, participate in {{response}}, and access diverse viewpoints from around the world. Ultimately, the future of journalism may depend on society’s ability to balance the benefits of instant information with the need for critical and responsible {{response}}.",
              "item_type": "CLOZE_RADIO",
              "responses": ["", "", "", "", "", "", "", "", "", "", ""],
              "max_responses": 10,
              "passage_stimulus": "",
              "image_data": { "image": "", "width": null, "height": null },
              "response_positions": [
                { "x": 25, "y": 18 },
                { "x": 40, "y": 25 },
                { "x": 52, "y": 32 },
                { "x": 60, "y": 42 },
                { "x": 40, "y": 55 },
                { "x": 45, "y": 62 },
                { "x": 50, "y": 68 },
                { "x": 55, "y": 74 },
                { "x": 65, "y": 82 },
                { "x": 70, "y": 88 },
                { "x": 70, "y": 88 }
              ],
              "possible_responses": [
                {
                  "responses": [
                    { "label": "misinformation", "value": "misinformation" },
                    { "label": "advertising", "value": "advertising" },
                    { "label": "technology", "value": "technology" }
                  ]
                },
                {
                  "responses": [
                    { "label": "confusion", "value": "confusion" },
                    { "label": "clarity", "value": "clarity" },
                    { "label": "accuracy", "value": "accuracy" }
                  ]
                },
                {
                  "responses": [
                    { "label": "carefully", "value": "carefully" },
                    { "label": "rarely", "value": "rarely" },
                    { "label": "publicly", "value": "publicly" }
                  ]
                },
                {
                  "responses": [
                    { "label": "competition", "value": "competition" },
                    { "label": "collaboration", "value": "collaboration" },
                    { "label": "curiosity", "value": "curiosity" }
                  ]
                },
                {
                  "responses": [
                    { "label": "created", "value": "created" },
                    { "label": "shared", "value": "shared" },
                    { "label": "edited", "value": "edited" }
                  ]
                },
                {
                  "responses": [
                    { "label": "credibility", "value": "credibility" },
                    { "label": "length", "value": "length" },
                    { "label": "tone", "value": "tone" }
                  ]
                },
                {
                  "responses": [
                    { "label": "evidence", "value": "evidence" },
                    { "label": "comments", "value": "comments" },
                    { "label": "opinions", "value": "opinions" }
                  ]
                },
                {
                  "responses": [
                    { "label": "outlets", "value": "outlets" },
                    { "label": "platforms", "value": "platforms" },
                    { "label": "channels", "value": "channels" }
                  ]
                },
                {
                  "responses": [
                    { "label": "opportunities", "value": "opportunities" },
                    { "label": "problems", "value": "problems" },
                    { "label": "dangers", "value": "dangers" }
                  ]
                },
                {
                  "responses": [
                    { "label": "discussion", "value": "discussion" },
                    { "label": "entertainment", "value": "entertainment" },
                    { "label": "consumption", "value": "consumption" }
                  ]
                },
                {
                  "responses": [
                    { "label": "discussion-1", "value": "discussion-1" },
                    { "label": "entertainment-1", "value": "entertainment-1" },
                    { "label": "consumption-1", "value": "consumption-1" }
                  ]
                }
              ],
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Q6",
              "stimulus": "What is the antonym of 'Brave'?",
              "options": [
                { "label": "Courageous", "value": "courageous" },
                { "label": "Fearful", "value": "fearful" },
                { "label": "Bold", "value": "bold" },
                { "label": "Daring", "value": "daring" }
              ],
              "item_type": "DRAWING_AND_WRITING",
              "background_type": "LINE",
              "responses": [],
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Qf6",
              "stimulus": "What is the antonym of 'Brave'?",
              "options": [
                { "label": "Courageous", "value": "courageous" },
                { "label": "Fearful", "value": "fearful" },
                { "label": "Bold", "value": "bold" },
                { "label": "Daring", "value": "daring" }
              ],
              "item_type": "SHORT_TEXT",
              "background_type": "GRID",
              "responses": [],
              "max_words": 5,
              "max_length": 100,
              "allow_paste": false,
              "allow_copy": false,
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Qfjd6",
              "stimulus": "What is the antonym of 'Brave'?",
              "options": [
                { "label": "Courageous", "value": "courageous" },
                { "label": "Fearful", "value": "fearful" },
                { "label": "Bold", "value": "bold" },
                { "label": "Daring", "value": "daring" }
              ],
              "item_type": "ESSAY_RICH_TEXT",
              "background_type": "GRID",
              "responses": [],
              "max_words": 5,
              "max_length": 100,
              "allow_paste": false,
              "allow_copy": false,
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Qfffj6",
              "stimulus": "What is the antonym of 'Brave'?",
              "options": [
                { "label": "Courageous", "value": "courageous" },
                { "label": "Fearful", "value": "fearful" },
                { "label": "Bold", "value": "bold" },
                { "label": "Daring", "value": "daring" }
              ],
              "item_type": "ESSAY_PLAIN_TEXT",
              "background_type": "GRID",
              "responses": [],
              "max_words": null,
              "max_length": 100,
              "allow_paste": false,
              "allow_copy": false,
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Qfj6",
              "stimulus": "<p><strong>Match each country with its correct capital city by dragging the options on the right to align with the stems on the left.</strong></p>",
              "stems": [
                "<p><strong>1. France</strong></p>",
                "<p><strong>2. Japan</strong></p>",
                "<p><strong>3. Canada</strong></p>",
                "<p><strong>4. Brazil</strong></p>"
              ],
              "options": [
                { "label": "<p>Tokyo</p>", "value": "tokyo" },
                { "label": "<p>Ottawa</p>", "value": "ottawa" },
                { "label": "<p>Brasília</p>", "value": "brasilia" },
                { "label": "<p>Paris</p>", "value": "paris" }
              ],
              "item_type": "ASSOCIATION",
              "background_type": "GRID",
              "responses": [],
              "max_words": 5,
              "max_length": 100,
              "allow_paste": false,
              "allow_copy": false,
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-Qffdfj6",
              "stimulus": "<p><strong>Match each country with its correct capital city by dragging the options on the right to align with the stems on the left.</strong></p>",
              "stems": [
                "<p><strong>1. France</strong></p>",
                "<p><strong>2. Japan</strong></p>",
                "<p><strong>3. Canada</strong></p>",
                "<p><strong>4. Brazil</strong></p>"
              ],
              "options": [
                { "label": "<p>Tokyo</p>", "value": "tokyo" },
                { "label": "<p>Ottawa</p>", "value": "ottawa" },
                { "label": "<p>Brasília</p>", "value": "brasilia" },
                { "label": "<p>Paris</p>", "value": "paris" }
              ],
              "item_type": "ORDER_LIST",
              "background_type": "GRID",
              "responses": [],
              "max_words": 5,
              "max_length": 100,
              "allow_paste": false,
              "allow_copy": false,
              "max_responses": 1,
              "image_data": { "image": "", "width": null, "height": null },
              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-IMG-MAP-001",
              "stimulus": "<p><strong>Study the map carefully. Then drag the correct labels from the options below into the empty boxes on the image.</strong></p>",
              "passage_stimulus": "<p>This map highlights four major geographical features in Africa. Your task is to correctly identify each location by placing the appropriate label into the matching box on the image.</p>",

              "item_type": "CLOZE_TEXT_IMAGE",
              "background_type": "IMAGE",

              "image_data": {
                "image": "pngtree-map-of-nigeria-stylized-png-image_10468519.png",
                "width": 1026,
                "height": 1083
              },

              "response_positions": [
                { "x": 22, "y": 30 },
                { "x": 63, "y": 28 },
                { "x": 28, "y": 72 },
                { "x": 70, "y": 75 }
              ],

              "stems": [
                "<p>1. Nile River</p>",
                "<p>2. Sahara Desert</p>",
                "<p>3. Congo Rainforest</p>",
                "<p>4. Kalahari Desert</p>"
              ],

              "options": [
                { "label": "<p>Nile River</p>", "value": "nile_river" },
                { "label": "<p>Sahara Desert</p>", "value": "sahara_desert" },
                { "label": "<p>Congo Rainforest</p>", "value": "congo_rainforest" },
                { "label": "<p>Kalahari Desert</p>", "value": "kalahari_desert" }
              ],

              "responses": [],

              "max_words": 5,
              "max_length": 50,
              "allow_paste": false,
              "allow_copy": false,
              "max_responses": 1,

              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-IMG-MAP-002",
              "stimulus": "<p><strong>Study the map carefully. Then drag the correct labels from the options below into the empty boxes on the image.</strong></p>",
              "passage_stimulus": "<p>This map highlights four major geographical features in Africa. Your task is to correctly identify each location by placing the appropriate label into the matching box on the image.</p>",

              "item_type": "CLOZE_DROPDOWN_IMAGE",
              "background_type": "IMAGE",

              "image_data": {
                "image": "pngtree-map-of-nigeria-stylized-png-image_10468519.png",
                "width": 402,
                "height": 361
              },

              "response_positions": [
                { "x": 22, "y": 30 },
                { "x": 63, "y": 28 },
                { "x": 28, "y": 72 },
                { "x": 70, "y": 75 }
              ],

              "possible_responses": [
                {
                  "responses": [
                    { "label": "misinformation", "value": "misinformation" },
                    { "label": "advertising", "value": "advertising" },
                    { "label": "technology", "value": "technology" }
                  ]
                },
                {
                  "responses": [
                    { "label": "confusion", "value": "confusion" },
                    { "label": "clarity", "value": "clarity" },
                    { "label": "accuracy", "value": "accuracy" }
                  ]
                },
                {
                  "responses": [
                    { "label": "carefully", "value": "carefully" },
                    { "label": "rarely", "value": "rarely" },
                    { "label": "publicly", "value": "publicly" }
                  ]
                },
                {
                  "responses": [
                    { "label": "competition", "value": "competition" },
                    { "label": "collaboration", "value": "collaboration" },
                    { "label": "curiosity", "value": "curiosity" }
                  ]
                },
                {
                  "responses": [
                    { "label": "created", "value": "created" },
                    { "label": "shared", "value": "shared" },
                    { "label": "edited", "value": "edited" }
                  ]
                },
                {
                  "responses": [
                    { "label": "credibility", "value": "credibility" },
                    { "label": "length", "value": "length" },
                    { "label": "tone", "value": "tone" }
                  ]
                },
                {
                  "responses": [
                    { "label": "evidence", "value": "evidence" },
                    { "label": "comments", "value": "comments" },
                    { "label": "opinions", "value": "opinions" }
                  ]
                },
                {
                  "responses": [
                    { "label": "outlets", "value": "outlets" },
                    { "label": "platforms", "value": "platforms" },
                    { "label": "channels", "value": "channels" }
                  ]
                },
                {
                  "responses": [
                    { "label": "opportunities", "value": "opportunities" },
                    { "label": "problems", "value": "problems" },
                    { "label": "dangers", "value": "dangers" }
                  ]
                },
                {
                  "responses": [
                    { "label": "discussion", "value": "discussion" },
                    { "label": "entertainment", "value": "entertainment" },
                    { "label": "consumption", "value": "consumption" }
                  ]
                },
                {
                  "responses": [
                    { "label": "discussion-1", "value": "discussion-1" },
                    { "label": "entertainment-1", "value": "entertainment-1" },
                    { "label": "consumption-1", "value": "consumption-1" }
                  ]
                }
              ],

              "options": [
                { "label": "<p>Nile River</p>", "value": "nile_river" },
                { "label": "<p>Sahara Desert</p>", "value": "sahara_desert" },
                { "label": "<p>Congo Rainforest</p>", "value": "congo_rainforest" },
                { "label": "<p>Kalahari Desert</p>", "value": "kalahari_desert" }
              ],

              "responses": [],

              "max_words": 5,
              "max_length": 50,
              "allow_paste": false,
              "allow_copy": false,
              "max_responses": 1,

              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "ENG-IMG-MAP-003",
              "stimulus": "<p><strong>Study the map carefully. Then drag the correct labels from the options below into the empty boxes on the image.</strong></p>",
              "passage_stimulus": "<p>This map highlights four major geographical features in Africa. Your task is to correctly identify each location by placing the appropriate label into the matching box on the image.</p>",

              "item_type": "IMAGE_DRAG_AND_DROP",
              "background_type": "IMAGE",

              "image_data": {
                "image": "pngtree-map-of-nigeria-stylized-png-image_10468519.png",
                "width": 402,
                "height": 361
              },

              "response_positions": [
                { "x": 22, "y": 30 },
                { "x": 63, "y": 28 },
                { "x": 28, "y": 72 },
                { "x": 70, "y": 75 }
              ],

              "possible_responses": [
                {
                  "responses": [
                    { "label": "misinformation", "value": "misinformation" },
                    { "label": "advertising", "value": "advertising" },
                    { "label": "technology", "value": "technology" }
                  ]
                },
                {
                  "responses": [
                    { "label": "confusion", "value": "confusion" },
                    { "label": "clarity", "value": "clarity" },
                    { "label": "accuracy", "value": "accuracy" }
                  ]
                },
                {
                  "responses": [
                    { "label": "carefully", "value": "carefully" },
                    { "label": "rarely", "value": "rarely" },
                    { "label": "publicly", "value": "publicly" }
                  ]
                },
                {
                  "responses": [
                    { "label": "competition", "value": "competition" },
                    { "label": "collaboration", "value": "collaboration" },
                    { "label": "curiosity", "value": "curiosity" }
                  ]
                },
                {
                  "responses": [
                    { "label": "created", "value": "created" },
                    { "label": "shared", "value": "shared" },
                    { "label": "edited", "value": "edited" }
                  ]
                },
                {
                  "responses": [
                    { "label": "credibility", "value": "credibility" },
                    { "label": "length", "value": "length" },
                    { "label": "tone", "value": "tone" }
                  ]
                },
                {
                  "responses": [
                    { "label": "evidence", "value": "evidence" },
                    { "label": "comments", "value": "comments" },
                    { "label": "opinions", "value": "opinions" }
                  ]
                },
                {
                  "responses": [
                    { "label": "outlets", "value": "outlets" },
                    { "label": "platforms", "value": "platforms" },
                    { "label": "channels", "value": "channels" }
                  ]
                },
                {
                  "responses": [
                    { "label": "opportunities", "value": "opportunities" },
                    { "label": "problems", "value": "problems" },
                    { "label": "dangers", "value": "dangers" }
                  ]
                },
                {
                  "responses": [
                    { "label": "discussion", "value": "discussion" },
                    { "label": "entertainment", "value": "entertainment" },
                    { "label": "consumption", "value": "consumption" }
                  ]
                },
                {
                  "responses": [
                    { "label": "discussion-1", "value": "discussion-1" },
                    { "label": "entertainment-1", "value": "entertainment-1" },
                    { "label": "consumption-1", "value": "consumption-1" }
                  ]
                }
              ],

              "options": [
                { "label": "<p>Nile River</p>", "value": "nile_river" },
                { "label": "<p>Sahara Desert</p>", "value": "sahara_desert" },
                { "label": "<p>Congo Rainforest</p>", "value": "congo_rainforest" },
                { "label": "<p>Kalahari Desert</p>", "value": "kalahari_desert" }
              ],

              "responses": [],

              "max_words": 5,
              "max_length": 50,
              "allow_paste": false,
              "allow_copy": false,
              "max_responses": 1,

              "drawing_writing_split_type": "NONE",
              "revisit": false
            },
            {
              "id": "SCI-CM-301",
              "item_type": "CHOICE_MATRIX",
              "passage_stimulus": "",
              "stimulus": "<p><strong>For each statement below, choose whether it is <em>True</em> or <em>False</em>.</strong></p>",
              "stems": [
                "<p>Solar energy is considered a renewable resource.</p>",
                "<p>Wind turbines generate electricity without producing carbon emissions.</p>",
                "<p>Fossil fuels are classified as renewable sources of energy.</p>",
                "<p>Hydropower plants use the movement of water to create electricity.</p>"
              ],
              "options": [
                { "label": "<p>True</p>", "value": "true" },
                { "label": "<p>False</p>", "value": "false" }
              ],
              "responses": [],
              "drawing_writing_split_type": "NONE",
              "revisit": false
            }

          ],
          "passages": []
        },
        {
          "id": 102,
          "index": 2,
          "block_type": "PASSAGES",
          "total_questions": 2,
          "items": [],
          "passages": [
            {
              "id": "ENG-PASS-1",
              "stimulus": "Climate change is caused primarily by greenhouse gases...",
              "items": [
                {
                  "id": "ENG-P1-Q1",
                  "stimulus": "According to the passage, what is the main cause of climate change?",
                  "options": [
                    {
                      "label": "Natural cycles",
                      "value": "natural"
                    },
                    {
                      "label": "Human activities",
                      "value": "human"
                    },
                    {
                      "label": "Volcanoes",
                      "value": "volcano"
                    }
                  ],
                  "item_type": "MCQ",
                  "responses": [],
                  "max_responses": 1,
                  "image_data": {
                    "image": "",
                    "width": null,
                    "height": null
                  },
                  "drawing_writing_split_type": "NONE",
                  "revisit": false
                },
                {
                  "id": "ENG-P1-Q2",
                  "stimulus": "What is the author’s tone?",
                  "options": [
                    {
                      "label": "Critical",
                      "value": "critical"
                    },
                    {
                      "label": "Neutral",
                      "value": "neutral"
                    },
                    {
                      "label": "Praising",
                      "value": "praising"
                    }
                  ],
                  "item_type": "MCQ",
                  "responses": [],
                  "max_responses": 1,
                  "image_data": {
                    "image": "",
                    "width": null,
                    "height": null
                  },
                  "drawing_writing_split_type": "NONE",
                  "revisit": false
                }
              ]
            }
          ]
        }
      ]
    },
  ]
}

export const endExamResponse = {
  "end_instruction": "Thank you for completing your examination. You may now close the application or wait for your result to load.",
  "pass_mark": {
    "score_total": 78,
    "pass_fail": "PASS",
    "score_per_section": [
      { "section_name": "Mathematics", "score": 80 },
      { "section_name": "English Language", "score": 75 },
      { "section_name": "General Knowledge", "score": 78 }
    ]
  }
}

export const autoSaveResponse = {
  auto_saved: true,
  compensatory_time_added: false,
  message_from_admin: '',
  log_out: false,
  exam_ended_response: null,
  suspended: false,
  close_browser: false,
}

