import { Component, computed, effect, HostListener, inject, input, model, OnInit, output } from "@angular/core";
import { EditorModule } from "@tinymce/tinymce-angular";
import { FormsModule } from "@angular/forms";
import { HotToastService } from "@ngxpert/hot-toast";
import { Store } from "../../store/store";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.html',
  styleUrl: './editor.css',
  imports: [EditorModule, FormsModule]
})
export class Editor implements OnInit {
  private _store = inject(Store)
  private _toast = inject(HotToastService)

  store = computed(() => this._store.store())
  value = model<string>()
  config = model<{ height: string, name: string }>()
  valueChanges = output<string | undefined>()



  constructor() {
    effect(() => {
      this.valueChanges.emit(this.value())
    })
  }

  editorInit: any

  ngOnInit() {
    this.editorInit = {
      name: this.config.name,
      placeholder: 'Type here...',
      branding: false,
      menubar: true,
      base_url: '/tinymce',
      suffix: '.min',
      statusbar: false,
      resize: false,
      height: this.config()?.height ?? '300',
      toolbar:
        'undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help',

      setup: (editor: any) => {
        editor.on('copy', (event: any) => this.onCopy(event));
        editor.on('cut', (event: any) => this.onCut(event));
        editor.on('paste', (event: any) => this.onPaste(event));
      }
    }
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
