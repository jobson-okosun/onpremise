import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, effect, HostListener, inject, model, OnInit, output } from "@angular/core";
import { EditorModule } from "@tinymce/tinymce-angular";
import { FormsModule } from "@angular/forms";
import { HotToastService } from "@ngxpert/hot-toast";
import { Store } from "../../store/store";
import 'mathlive';
import katex from 'katex';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.html',
  styleUrl: './editor.css',
  imports: [EditorModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Editor implements OnInit {
  private _store = inject(Store)
  private _toast = inject(HotToastService)

  store = computed(() => this._store.store())
  value = model<string>()
  config = model<{ height: string, name: string }>()
  valueChanges = output<string | undefined>()

  private activeEquation: HTMLElement | null = null;

  constructor() {
    effect(() => {
      this.valueChanges.emit(this.value())
    })
  }

  editorInit: any

  ngOnInit() {
    this.editorInit = {
      name: this.config.name,
      content_css: '/katex/dist/katex.min.css',
      placeholder: 'Type here...',
      branding: false,
      menubar: false,
      base_url: '/tinymce',
      suffix: '.min',
      statusbar: false,
      resize: false,
      height: this.config()?.height ?? '300',
      extended_valid_elements: 'span[*],svg[*],path[*],g[*],defs[*],line[*],rect[*],circle[*],ellipse[*],polygon[*],polyline[*],math[*],semantics[*],annotation[*],annotation-xml[*],merror[*],mtext[*],mspace[*],mover[*],munder[*],munderover[*],mstack[*],mrow[*],msrow[*],mfenced[*],menclose[*],mphantom[*],msup[*],msub[*],msubsup[*],mmultiscripts[*],mi[*],mn[*],mo[*],ms[*],mtable[*],mtr[*],mtd[*],mlabeledtr[*],mfrac[*],mfraction[*],msline[*],msqrt[*],mroot[*],mscarries[*],mscarry[*]',
      toolbar:
        'undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | equation-editor',

      setup: (editor: any) => {
        editor.on('copy', (event: any) => this.onCopy(event));
        editor.on('cut', (event: any) => this.onCut(event));
        editor.on('paste', (event: any) => this.onPaste(event));
        this.registerEquationEditor(editor);
      }
    }
  }

  registerEquationEditor(editor: any) {
    const openDialog = (latex: string) => {
      editor.windowManager.open({
        title: this.activeEquation ? "Edit Equation" : "Insert Equation",
        size: "normal",
        body: {
          type: "panel",
          items: [
            {
              type: "htmlpanel",
              html: `<math-field id="mathfield" style="width: 100%; height: 200px; border: 1px solid grey">${latex}</math-field>`,
            },
          ],
        },
        buttons: [
          { type: "cancel", name: "cancel", text: "Cancel" },
          { type: "submit", name: "submit", text: this.activeEquation ? "Update" : "Insert", primary: true },
        ],
        onSubmit: async (api: any) => {
          const mathField = document.getElementById("mathfield") as any;
          if (!mathField) return;

          const latexValue = mathField.getValue();
          const renderedHtml = katex.renderToString(latexValue, { throwOnError: false });

          if (this.activeEquation) {
            this.activeEquation.setAttribute("data-latex", latexValue);
            this.activeEquation.innerHTML = renderedHtml;
            editor.setDirty(true);
          } else {
            const content = `<span class="math-expression" data-latex="${latexValue}" contenteditable="false" style="display: inline-block; vertical-align: middle; margin: 4px 5px; padding: 2px 0;">${renderedHtml}</span>&nbsp;`;
            editor.insertContent(content);
            editor.selection.collapse(false);
          }

          this.activeEquation = null;
          api.close();
        },
      });
    };

    editor.on("init", () => {
      editor.getBody().addEventListener("click", (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const equationElement = target.closest(".math-expression") as HTMLElement;
        if (equationElement) {
          this.activeEquation = equationElement;
          openDialog(equationElement.getAttribute("data-latex") || "");
        }
      });
    });


    editor.ui.registry.addButton("equation-editor", {
      text: "Insert Math",
      icon: "character-count",
      onAction: () => {
        this.activeEquation = null;
        openDialog("");
      },
    });

    editor.on('init', () => {
      document.addEventListener('focusin', (e: any) => {
        if (e.target && (e.target.tagName === 'MATH-FIELD' || e.target.closest('.ML__keyboard'))) {
          e.stopImmediatePropagation();
        }
      }, true);
    });
  }

  @HostListener('document:copy', ['$event'])
  onCopy(event: ClipboardEvent): void {
    if (!this.store().currentQuestion!.allow_copy) {
      this._toast.warning('You are not allowed to copy')
      event.preventDefault();
    }
  }

  @HostListener('document:cut', ['$event'])
  onCut(event: ClipboardEvent): void {
    if (!this.store().currentQuestion!.allow_copy) {
      this._toast.warning('You are not allowed to cut')
      event.preventDefault();
    }
  }

  @HostListener('document:paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    if (!this.store().currentQuestion!.allow_copy) {
      this._toast.warning('You are not allowed to paste')
      event.preventDefault();
    }
  }
}
