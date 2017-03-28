import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { Tab } from './tab.component';

@Component({
  selector: 'tabs',
  template: `
    <ul class="nav nav-tabs" id="requesterTabs" role="tablist">
      <li *ngFor="let tab of tabs" [class.active]="tab.active" class="nav-item">
        <a class="nav-link" (click)="selectTab(tab)">{{tab.tabTitle}}</a>
      </li>
    </ul>
    <ng-content></ng-content>
  `
})
export class Tabs implements AfterContentInit {
  @ContentChildren(Tab) tabs: QueryList<Tab>;
  // contentChildren are set
  ngAfterContentInit() {
    // get all active tabs
    let activeTabs = this.tabs.filter((tab) => tab.active);
    // if there is no active tab set, activate the first
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }
  selectTab(tab: Tab){
    // deactivate all tabs
    this.tabs.toArray().forEach(t => t.active = false);
    // activate the tab the user has clicked on.
    tab.active = true;
  }

}
