import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';

import {
  PageSettingsModel,
  SortSettingsModel,
  SelectionSettingsModel,
  EditSettingsModel,
  ToolbarItems,
} from '@syncfusion/ej2-treegrid';
import { TreeData, TreeGridData } from './datasource';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'tree-grid';
  @ViewChild('tree') treeGridElement: TreeGridComponent;
  sampleData: TreeGridData[];
  public pageSettings: PageSettingsModel;
  public sortSettings: SortSettingsModel;
  public selectionOption: SelectionSettingsModel;
  public editOption: EditSettingsModel;
  sortData: Set<string> = new Set([]);
  toolBar: ToolbarItems[];

  ngOnInit() {
    this.sampleData = TreeData;
    this.pageSettings = { pageSize: 20 };
    this.sortSettings = {
      columns: [
        { field: 'index', direction: 'Ascending' },
        { field: 'name', direction: 'Ascending' },
        { field: 'company', direction: 'Ascending' },
        { field: 'email', direction: 'Ascending' },
      ],
    };

    this.selectionOption = { type: 'Multiple' };
    this.sortSettings.columns?.forEach((column) =>
      this.sortData.add(column.field)
    );
    this.editOption = {
      allowAdding: true,
      allowDeleting: true,
      allowEditing: true,
      mode: 'Row',
      newRowPosition: 'Below',
      showConfirmDialog: true,
    };
  }
  setColumnSort(event: any, fieldName: string) {
    if (event.target.checked) {
      this.treeGridElement.sortByColumn(fieldName, 'Ascending', true);
      this.sortData.add(fieldName);
    } else {
      this.treeGridElement.grid.removeSortColumn(fieldName);
      this.sortData.delete(fieldName);
    }

    //this.treeGridElement.sortByColumn('company', 'Ascending', true);
    console.log(this.sortSettings);
    console.log(this.treeGridElement);
    this.toolBar = ['Add', 'Edit', 'Update', 'Cancel'];
  }
}
function data(data: any, arg1: (any: any) => void) {
  throw new Error('Function not implemented.');
}
