import {Directive, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';

@Directive({
  selector: '[contentEditableModel]',
  host: {
    '(blur)': 'onBlur()',
    '(focus)': 'onFocus()'
  }
})
export class ContentEditableModelDirective implements OnInit {
  @Output('contentEditableModelChange') update = new EventEmitter();
  private savedStyle: any;
  private prevValue: string;

  constructor(private elRef: ElementRef) {
  }

  ngOnInit(): void {
    this.elRef.nativeElement.contentEditable = true;
  }

  onBlur() {
    this.elRef.nativeElement.style = this.savedStyle;
    const value = this.elRef.nativeElement.innerText;
    if (value !== this.prevValue) {
      this.update.emit(value);
    }
  }

  onFocus() {
    this.prevValue = this.elRef.nativeElement.innerText;
    this.savedStyle = this.elRef.nativeElement.style;
    this.elRef.nativeElement.style.boxShadow = '1px 1px 5px';
    this.elRef.nativeElement.style.backgroundColor = 'white';
  }

}
