import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GridsterConfig } from '../lib/gridsterConfig.interface';
import { GridsterComponent } from '../lib/gridster.component';
import { GridsterItem } from '../lib/gridsterItem.interface';
import { GridsterItemComponent } from '../lib/gridsterItem.component';

@Component({
  selector: 'gridster-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  options: GridsterConfig;
  dashboard: Array<Object>;

  static eventStop(item, itemComponent, event) {
    console.info('eventStop', item, itemComponent, event);
  }

  static itemChange(item, itemComponent) {
    console.info('itemChanged', item, itemComponent);
  }

  static itemResize(item, itemComponent) {
    console.info('itemResized', item, itemComponent);
  }

  static itemInit(item, itemComponent) {
    console.info('itemInitialized', item, itemComponent);
  }

  emptyCellClick(event, item) {
    console.info('empty cell click', event, item);
    // this.dashboard.push(item);
  }

  ngOnInit() {
    this.options = {
      gridType: 'fit',
      compactType: 'none',
      itemChangeCallback: AppComponent.itemChange,
      itemResizeCallback: AppComponent.itemResize,
      itemInitCallback: AppComponent.itemInit,
      margin: 5,
      outerMargin: true,
      minCols: 1,
      maxCols: 100,
      minRows: 1,
      maxRows: 100,
      maxItemCols: 100,
      minItemCols: 1,
      maxItemRows: 100,
      minItemRows: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      fixedColWidth: 105,
      fixedRowHeight: 105,
      enableEmptyCellClickDrag: true,
      emptyCellClickCallback: this.emptyCellClick.bind(this),
      draggable: {
        enabled: true,
        stop: AppComponent.eventStop
      },
      resizable: {
        enabled: true,
        stop: AppComponent.eventStop
      },
      swap: false,
      pushItems: true,
      displayGrid: 'onDrag&Resize'
    };

    this.dashboard = [
      { cols: 2, rows: 1, y: 0, x: 0 },
      { cols: 2, rows: 2, y: 0, x: 2 },
      { cols: 1, rows: 1, y: 0, x: 4 },
      { cols: 1, rows: 1, y: 2, x: 5 },
      { cols: undefined, rows: undefined, y: 1, x: 0 },
      { cols: 1, rows: 1, y: undefined, x: undefined },
      { cols: 2, rows: 2, y: 3, x: 5, minItemRows: 2, minItemCols: 2, label: 'Min rows & cols = 2' },
      { cols: 2, rows: 2, y: 2, x: 0, maxItemRows: 2, maxItemCols: 2, label: 'Max rows & cols = 2' },
      { cols: 2, rows: 1, y: 2, x: 2, dragEnabled: true, resizeEnabled: true, label: 'Drag&Resize Enabled' },
      { cols: 1, rows: 1, y: 2, x: 4, dragEnabled: false, resizeEnabled: false, label: 'Drag&Resize Disabled' },
      { cols: 1, rows: 1, y: 2, x: 6, initCallback: AppComponent.itemInit }
    ];
  }

  changedOptions() {
    this.options.api.optionsChanged();
  }

  removeItem($event, item) {
    $event.preventDefault();
    $event.stopPropagation();
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem() {
    this.dashboard.push({});
  }

  simpleDrop(event, gridsrter: GridsterComponent) {
    const item = gridsrter.getValidItemFromEvent(event.mouseEvent);

    this.dashboard.push(item);


    console.info(item);
  }
}
