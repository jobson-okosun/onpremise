import { Component } from "@angular/core";
import { Paginator } from "../exam/paginator/paginator";
import { ICandidateAutoSave, ICandidateAutoSaveItems, ICandidateEndExamData, ICandidateItem, ItemType, UsageEvent } from "../store/model/types";
import { SingleChoice } from "../exam/item-types/single-choice/single-choice";
import { ExamService } from "../services/exam";
import { Store } from "../store/store";
import { MultipleResponse } from "../exam/item-types/multiple-response/multiple-response";
import { YesOrNo } from "../exam/item-types/yes-or-no/yes-or-no";
import { TrueOrFalse } from "../exam/item-types/true-or-false/true-or-false";
import { CandidateEventType, NavigationMethod } from "../store/model/events/events.enum";
import { EventService } from "../services/event";

import { ScreenReaderService } from "../services/screen-reader";

export function handleA11yShortcuts(
  event: KeyboardEvent,
  screenReaderService: ScreenReaderService,
  store: Store,
  paginatorComponent: Paginator | undefined,
  component: any
): void {
  if (screenReaderService.handleSharedShortcuts(event)) {
    return;
  }

  if (event.altKey && event.shiftKey) {
    const key = event.key.toLowerCase();
    
    if (key === 'n') {
      event.preventDefault();
      const currentSectionLength = store.store().currentSection?.items?.length || 0;
      if (store.store().currentQuestionIndex < currentSectionLength - 1 && paginatorComponent) {
         paginatorComponent.next();
      }
    } else if (key === 'p') {
      event.preventDefault();
      if (store.store().currentQuestionIndex > 0 && paginatorComponent) {
         paginatorComponent.prev();
      }
    } else {
      const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
      const optionIndex = alphabet.indexOf(key);
      
      if (optionIndex !== -1) {
        event.preventDefault();
        if (component && typeof component.selectOptionByIndex === 'function') {
          const success = component.selectOptionByIndex(optionIndex);
          if (success) {
            screenReaderService.announce(`Answer ${event.key.toUpperCase()} selected. Press Alt key plus Shift key plus letter N to move to next question, or Alt key plus Shift key plus letter P to go back to previous question.`, 'assertive');
          }
        }
      }
    }
  }
}

export function fullscreen(eventService?: EventService) {
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
            eventService?.logEvent({ event_type: CandidateEventType.FULLSCREEN_EXITED });
            requestFullScreen();
        } else {
            eventService?.logEvent({ event_type: CandidateEventType.FULLSCREEN_ENTERED });
        }
    });

    document.addEventListener('webkitfullscreenchange', () => {
        if (!(document as any).webkitFullscreenElement) {
            eventService?.logEvent({ event_type: CandidateEventType.FULLSCREEN_EXITED });
            requestFullScreen();
        } else {
            eventService?.logEvent({ event_type: CandidateEventType.FULLSCREEN_ENTERED });
        }
    });

    document.addEventListener('msfullscreenchange', () => {
        if (!(document as any).msFullscreenElement) {
            eventService?.logEvent({ event_type: CandidateEventType.FULLSCREEN_EXITED });
            requestFullScreen();
        } else {
            eventService?.logEvent({ event_type: CandidateEventType.FULLSCREEN_ENTERED });
        }
    });
}

export function useShortcut(keyPressed: string, currentQuestionNumber: number, paginatorComponent: Paginator, sectionItemsLength: number, currentQuestion: ICandidateItem, component: Component): void {

    const key = keyPressed.toLowerCase();
    const itemTypes = ItemType;

    if (key === 'p' && currentQuestionNumber !== 0) {
        paginatorComponent.prev(NavigationMethod.Keyboard);
        return;
    }

    if (key === 'n' && currentQuestionNumber + 1 !== sectionItemsLength) {
        paginatorComponent.next(NavigationMethod.Keyboard);
        return;
    }

    if (!component) {
        return
    };

    const letters = 'abcdefghijk';
    const index = letters.indexOf(key);

    if (index === -1) {
        return
    };

    const value = currentQuestion.options[index]?.value;

    if (value == null || value == undefined) {
        console.log('Shorcut rejected: Option is out of range........................................')
        return
    };

    if (currentQuestion.item_type === itemTypes.MRQ) {

        if (currentQuestion.responses.length === currentQuestion.max_responses) {
            return;
        }

        const ref = component as MultipleResponse;
        ref.selectOption(value);

    } else if (currentQuestion.item_type === itemTypes.MCQ) {

        const ref = component as SingleChoice;
        ref.selectOption(value);

    } else if (currentQuestion.item_type === itemTypes.TRUE_FALSE || currentQuestion.item_type === itemTypes.YES_NO) {

        if (index > 1) return;

        const ref = component as YesOrNo | TrueOrFalse;
        ref.selectOption(value);
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

    autoSaveData.pending_events = _exam._eventService.getPendingEvents();

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

    autoSaveData.pending_events = _exam._eventService.getPendingEvents();

    return autoSaveData;
}

export const formatExamResponseData = (data: ICandidateEndExamData): ICandidateEndExamData => {
    const formattedSectionsMap = Object.fromEntries(
        Object.entries(data.autosave.sections_map).map(
            ([sectionKey, items]) => [sectionKey, items.map((item) => {
                const hasValidAnswer = Array.isArray(item.answers) && item.answers.some((ans) => typeof ans === 'string' && ans.trim() !== '');

            return { ...item, answers: hasValidAnswer ? item.answers : [] };
        })]
        )
    );

    return {
        ...data,
        autosave: { ...data.autosave, sections_map: formattedSectionsMap}
    };
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

export function getAlphabetChar(index: number): string {
    return String.fromCharCode(97 + index);
}

export function getRomanNumeral(index: number): string {
    const roman = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x'];
    return roman[index] || (index + 1).toString();
}

export function getParentLabel(questionIndex: number, parentIndex: number): string {
    return `${questionIndex + 1}${getAlphabetChar(parentIndex)}`;
}

export function getChildLabel(childIndex: number): string {
    return `${getRomanNumeral(childIndex)}`;
}
