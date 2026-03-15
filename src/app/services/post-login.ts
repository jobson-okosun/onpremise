import { computed, inject, Injectable, signal } from "@angular/core";
import { StoreDTO } from "../store/model/store";
import { BlockType, ICandidateItem, ICandidateLoginResponse, ICandidateSectionQuestions, ItemType, StoreSection } from "../store/model/types";
import { Store } from "../store/store";

@Injectable({ providedIn: 'root' })
export class PostLogin {
    private _store = inject(Store)
    
    store = computed(() => this._store.store())
    cummulativeExamDuration = signal(0)

    getSectionItems(section: ICandidateSectionQuestions): ICandidateItem[] {
        const items = section.question_blocks.flatMap(block => {

            if (block.block_type === BlockType.SINGLE_QUESTIONS) {
                return block.items.map(item => ({
                    ...item,
                    block_id: block.id,
                    isPassageItem: false,
                    roughWorkResponse: []
                }));
            }

            if (block.block_type === BlockType.PASSAGES) {
                return block.passages.flatMap(passage =>
                    passage.items.map(item => ({
                        ...item,
                        block_id: block.id,
                        passage_stimulus: passage.stimulus,
                        isPassageItem: true,
                        roughWorkResponse: []
                    }))
                );
            }

            return [];
        });

        return items
    }


    getCummulativeExamDuration(data: ICandidateLoginResponse): number {
        let duration = 0;

        const examTime = data?.assessment_data.duration_minutes;
        const sections = data?.sections_questions


        if (sections!.length > 1) {
            const hasAtleastOneSectionWithDuration = sections!.some(section => section.section_settings.duration_in_minutes > 0)
            const cummulativeDuration = sections!.reduce((sum, section) => sum + section.section_settings.duration_in_minutes, 0)

            duration = (hasAtleastOneSectionWithDuration ? cummulativeDuration : examTime) as number

        } else {
            const firstSectionDuration = sections![0].section_settings.duration_in_minutes;
            duration = (firstSectionDuration > 0 ? firstSectionDuration : examTime) as number;
        }

        // duration = duration * 60
        this.cummulativeExamDuration.set(duration)
        return duration;
    }

    formatLoginDataToStore(data: ICandidateLoginResponse): Promise<void> {
        return new Promise((resolve) => {

            const sections = data.sections_questions.map(s => {
                const items = this.getSectionItems(s)

                items.forEach(item => {
                    if (item.item_type == ItemType.MCQ || item.item_type == ItemType.TRUE_FALSE || item.item_type == ItemType.YES_NO) {
                        item.responses[0] = item.responses[0] ?? ''
                    }

                    if (
                        item.item_type == ItemType.CLOZE_DROPDOWN ||
                        item.item_type == ItemType.CLOZE_RADIO ||
                        item.item_type == ItemType.CLOZE_TEXT ||
                        item.item_type == ItemType.CLOZE_TEXT_IMAGE ||
                        item.item_type == ItemType.CLOZE_DROPDOWN_IMAGE
                    ) {
                        item.possible_responses?.forEach((option, optionIndex) => {
                            item.responses[optionIndex] = item.responses[optionIndex] ?? ''
                        })
                    }

                })

                const section: StoreSection = { id: s.id, name: s.name, items }
                return section
            })

            const currentSection = sections[0]
            const currentQuestion = currentSection.items[0]
            const currentQuestionIndex = 0
            const examDuration = this.getCummulativeExamDuration(data)

            data.sections_questions = data.sections_questions.map(s => {
                const { question_blocks, ...rest } = s
                return { ...rest } as any
            })

            let store = new StoreDTO()
            const update = {
                ...store,
                ...this.store(),
                loginData: data,
                sections,
                currentSection,
                currentQuestion,
                currentQuestionIndex,
                examDuration
            }

            this._store.updateStore(update)
            resolve()
        })
    }
}