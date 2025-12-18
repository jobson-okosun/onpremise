import { Component } from "@angular/core";
import { Paginator } from "../exam/paginator/paginator";
import { ICandidateAutoSave, ICandidateAutoSaveItems, ICandidateItem, ItemType } from "../store/model/types";
import { SingleChoice } from "../exam/item-types/single-choice/single-choice";
import { ExamService } from "../services/exam";
import { Store } from "../store/store";
import { MultipleResponse } from "../exam/item-types/multiple-response/multiple-response";
import { YesOrNo } from "../exam/item-types/yes-or-no/yes-or-no";
import { TrueOrFalse } from "../exam/item-types/true-or-false/true-or-false";

export function fullscreen() {
    const elem = document.documentElement;

    const requestFullScreen = () => {
        if (elem.requestFullscreen) {
            elem.requestFullscreen().catch(() => { });
        } else if ((elem as any).webkitRequestFullscreen) {
            (elem as any).webkitRequestFullscreen();
        } else if ((elem as any).msRequestFullscreen) {
            (elem as any).msRequestFullscreen();
        }
    };

    requestFullScreen();

    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
            requestFullScreen();
        }
    });

    document.addEventListener('webkitfullscreenchange', () => {
        if (!(document as any).webkitFullscreenElement) {
            requestFullScreen();
        }
    });

    document.addEventListener('msfullscreenchange', () => {
        if (!(document as any).msFullscreenElement) {
            requestFullScreen();
        }
    });
}

export function useShortcut(keyPressed: string, currentQuestionNumber: number, paginatorComponent: Paginator, sectionItemsLength: number, currentQuestion: ICandidateItem, component: Component,): void {
    const itemTypes = ItemType

    if (currentQuestionNumber != 0) {
        switch (keyPressed.toLowerCase()) {
            case 'p':
                paginatorComponent.prev();
                break;
        }
    }
    if (currentQuestionNumber + 1 != sectionItemsLength) {
        switch (keyPressed.toLowerCase()) {
            case 'n':
                paginatorComponent.next();
                break;
        }
    }

    if (!component) {
        return
    }

    if (currentQuestion.item_type === itemTypes.MRQ) {
        if (!component) return

        const ref = component as MultipleResponse
        if(currentQuestion.responses.length == currentQuestion.max_responses) {
            return
        }

        switch (keyPressed.toLowerCase()) {
            case `a`:
                ref.selectOption(
                    currentQuestion.options[0].value
                );
                break;
            case 'b':
                ref.selectOption(
                    currentQuestion.options[1].value
                );
                break;
            case 'c':
                ref.selectOption(
                    currentQuestion.options[2].value
                );
                break;
            case 'd':
                ref.selectOption(
                    currentQuestion.options[3].value
                );
                break;
            case 'e':
                ref.selectOption(
                    currentQuestion.options[4]?.value
                );
                break;
            case 'f':
                ref.selectOption(
                    currentQuestion.options[5]?.value
                );
                break;
            case 'g':
                ref.selectOption(
                    currentQuestion.options[6]?.value
                );
                break;
            case 'h':
                ref.selectOption(
                    currentQuestion.options[7]?.value
                );
                break;
            case 'i':
                ref.selectOption(
                    currentQuestion.options[8]?.value
                );
                break;
            case 'j':
                ref.selectOption(
                    currentQuestion.options[9]?.value
                );
                break;
            case 'k':
                ref.selectOption(
                    currentQuestion.options[10]?.value
                );
                break;
        }
    } else if (currentQuestion.item_type === itemTypes.MCQ) {
        if (!component) return

        const ref = component as SingleChoice

        switch (keyPressed.toLowerCase()) {
            case `a`:
                ref.selectOption(
                    currentQuestion.options[0].value
                );

                break;
            case 'b':
                ref.selectOption(
                    currentQuestion.options[1].value
                );
                break;
            case 'c':
                ref.selectOption(
                    currentQuestion.options[2].value
                );
                break;
            case 'd':
                ref.selectOption(
                    currentQuestion.options[3].value
                );
                break;
            case 'e':
                ref.selectOption(
                    currentQuestion.options[4]?.value
                );
                break;
            case 'f':
                ref.selectOption(
                    currentQuestion.options[5]?.value
                );
                break;
            case 'g':
                ref.selectOption(
                    currentQuestion.options[6]?.value
                );
                break;
            case 'h':
                ref.selectOption(
                    currentQuestion.options[7]?.value
                );
                break;
            case 'i':
                ref.selectOption(
                    currentQuestion.options[8]?.value
                );
                break;
            case 'j':
                ref.selectOption(
                    currentQuestion.options[9]?.value
                );
                break;
            case 'k':
                ref.selectOption(
                    currentQuestion.options[10]?.value
                );
                break;
        }
    } else if (currentQuestion.item_type === itemTypes.TRUE_FALSE || currentQuestion.item_type === itemTypes.YES_NO) {
        if (!component) return

        const ref = component as YesOrNo | TrueOrFalse

        switch (keyPressed.toLowerCase()) {
            case `a`:
                ref.selectOption(
                    currentQuestion.options[0].value
                );
                break;
            case 'b':
                ref.selectOption(
                    currentQuestion.options[1].value
                );
                break;
        }
    }
}

export function generatePayLoadForAutoSave(_exam: ExamService, _store: Store): ICandidateAutoSave {
    const timeDisplay = _exam.timeDisplay()
    const candidateId = _store.getStore().loginData!.candidate_data.id

    const autoSaveData: ICandidateAutoSave = {
        sections_map: {},
        section_times: {},
        minutes: timeDisplay.min,
        seconds: timeDisplay.sec,
        cand_id: candidateId,
    };

    const sections = _store.getStore().sections

    sections.forEach(section => {
        const sectionItem = _store.getStore().loginData?.sections_questions.find(s => s.id == section.id)
        const sectionItems: ICandidateAutoSaveItems[] = [];

        section.items
            .filter(item => item.lastUpdated > _exam.itemsLastSync())
            .forEach(item => {
                if (item.item_type === ItemType.CLOZE_TEXT || item.item_type === ItemType.CLOZE_DROPDOWN || item.item_type === ItemType.CLOZE_TEXT_IMAGE || item.item_type === ItemType.IMAGE_DRAG_AND_DROP || item.item_type === ItemType.CLOZE_DROPDOWN_IMAGE || item.item_type === ItemType.CHOICE_MATRIX || item.item_type === ItemType.MRQ) {
                    for (let i = 0; i < item.responses.length; i++) {
                        if (typeof item.responses[i] !== 'string') {
                            item.responses[i] = '';
                        }
                    }
                }

                if (item.responses.length === 0) {
                    item.responses = [];
                }

                const autosaveItem: ICandidateAutoSaveItems = {
                    item_id: item.id,
                    blk_id: item.block_id,
                    answers: item.responses,
                    revisit_later: item.revisit,
                    item_type: item.item_type
                }

                if (item.isPassageItem) {
                    autosaveItem.passage_id = item.id
                }

                sectionItems.push(autosaveItem)
            })

        autoSaveData.sections_map[section.id] = sectionItems;
        autoSaveData.section_times[section.id] = {
            minutes: sectionItem!.section_settings.minutes_left,
            seconds: sectionItem!.section_settings.seconds_left,
        };
    })

    return autoSaveData;
}

export function generatePayLoadWithAllData(_exam: ExamService, _store: Store): ICandidateAutoSave {
    const timeDisplay = _exam.timeDisplay()
    const candidateId = _store.getStore().loginData!.candidate_data.id

    const autoSaveData: ICandidateAutoSave = {
        sections_map: {},
        section_times: {},
        minutes: timeDisplay.min,
        seconds: timeDisplay.sec,
        cand_id: candidateId,
    };

    const sections = _store.getStore().sections

    sections.forEach(section => {
        const sectionItem = _store.getStore().loginData?.sections_questions.find(s => s.id == section.id)
        const sectionItems: ICandidateAutoSaveItems[] = [];

        section.items
            .forEach(item => {
                if (item.item_type === ItemType.CLOZE_TEXT || item.item_type === ItemType.CLOZE_DROPDOWN || item.item_type === ItemType.CLOZE_TEXT_IMAGE || item.item_type === ItemType.IMAGE_DRAG_AND_DROP || item.item_type === ItemType.CLOZE_DROPDOWN_IMAGE || item.item_type === ItemType.CHOICE_MATRIX || item.item_type === ItemType.MRQ) {
                    for (let i = 0; i < item.responses.length; i++) {
                        if (typeof item.responses[i] !== 'string') {
                            item.responses[i] = '';
                        }
                    }
                }

                if (item.responses.length === 0) {
                    item.responses = [];
                }

                const autosaveItem: ICandidateAutoSaveItems = {
                    item_id: item.id,
                    blk_id: item.block_id,
                    answers: item.responses,
                    revisit_later: item.revisit,
                    item_type: item.item_type
                }

                if (item.isPassageItem) {
                    autosaveItem.passage_id = item.id
                }

                sectionItems.push(autosaveItem)
            })

        autoSaveData.sections_map[section.id] = sectionItems;
        autoSaveData.section_times[section.id] = {
            minutes: sectionItem!.section_settings.minutes_left,
            seconds: sectionItem!.section_settings.seconds_left,
        };
    })

    return autoSaveData;
}

export function blockContextMenuHandler(event: MouseEvent) {
    event.preventDefault();
};

export function blockKeyHandler(event: KeyboardEvent) {
    const isAlpha = /^[a-zA-Z]$/.test(event.key);
    const forbiddenKeys = ['F12', 'Control', 'Enter'];

    if (isAlpha || forbiddenKeys.includes(event.key) || event.ctrlKey) {
        event.preventDefault();
    }
};

export function disableRestrictedActions() {
    document.addEventListener('keydown', blockKeyHandler);
    document.addEventListener('contextmenu', blockContextMenuHandler);
}

export function enableRestrictedActions() {
    document.removeEventListener('keydown', blockKeyHandler);
    document.removeEventListener('contextmenu', blockContextMenuHandler);
}

export function formatDuration(timestamp: number): string {
    const totalSeconds = Math.floor(timestamp / 1000);

    if (totalSeconds < 60) {
        return `${totalSeconds} Second${totalSeconds !== 1 ? 's' : ''}`;
    }

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    let result = `${minutes} Minute${minutes !== 1 ? 's' : ''}`;
    if (seconds > 0) {
        result += ` ${seconds} Second${seconds !== 1 ? 's' : ''}`;
    }

    return result;
}

export const scrollContainers = () => {
    try {
        document.getElementById('question-container')?.scrollTo({ top: 0, behavior: 'smooth' });
        document.getElementById('stage-parent')?.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } catch (e) { }
}
