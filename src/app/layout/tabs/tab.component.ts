import { Component, Input } from '@angular/core';

@Component({
    selector: 'tab',
    styles: [`.pane { padding: 1em; }`],
    template: `
    <div [hidden]="!active" role="tabpanel" class="tab-pane">
      <ng-content></ng-content>
    </div>
  `
})
export class Tab {
    @Input() tabTitle: string;
    @Input() active = false;
}