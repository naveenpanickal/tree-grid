import { Component, ViewChild, ElementRef } from '@angular/core';

import {
  SortService,
  ResizeService,
  PageService,
  EditService,
  ExcelExportService,
  PdfExportService,
  ContextMenuService,
} from '@syncfusion/ej2-angular-grids';
import { EditSettingsModel } from '@syncfusion/ej2-angular-grids';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import {
  FreezeService,
  PageSettingsModel,
  ReorderService,
  RowDDService,
  SortSettingsModel,
  TreeGridComponent,
} from '@syncfusion/ej2-angular-treegrid';
import { DataManager, UrlAdaptor, Query } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    SortService,
    ResizeService,
    PageService,
    EditService,
    ExcelExportService,
    PdfExportService,
    ContextMenuService,
    FreezeService,
    ReorderService,
    RowDDService,
  ],
})
export class AppComponent {
  constructor(private elementRef: ElementRef) {}
  public data: Object[];
  @ViewChild('grid') public grid: TreeGridComponent;

  @ViewChild('ejDialog') ejDialog: DialogComponent;
  public toolbar: string[];
  public sortSetting: SortSettingsModel;
  public selectitem: string[];
  showColumn: boolean = false;
  public pageSettings: PageSettingsModel;
  public editOption: EditSettingsModel;
  columnData: Set<string> = new Set([]);
  button: any;
  styleEditorButtons: any;
  currentColumnStyle: any;
  editStyle: boolean = false;
  addNewColumn: boolean = false;
  public textWrap: boolean = false;
  treeColumns;
  selectionOption = { type: 'Multiple' };
  test = { 'font-size': '25px' };
  columnStyle = [
    {
      field: 'index',
      headerText: 'index',
      textAlign: 'Right',
      textSize: 13,
      color: 'black',
      background: 'white',
      type: 'number',
      minWidth: 100,
    },
    {
      field: 'name',
      headerText: 'name',
      textAlign: 'Right',
      textSize: 13,
      color: 'black',
      background: 'white',
      type: 'string',
      minWidth: 100,
    },
    {
      field: 'company',
      headerText: 'company',
      textAlign: 'Right',
      textSize: 13,
      color: 'black',
      background: 'white',
      type: 'string',
      minWidth: 100,
    },
    {
      field: 'email',
      headerText: 'email',
      textAlign: 'Right',
      textSize: 13,
      type: 'string',
      color: 'black',
      background: 'white',
    },
    {
      field: 'gender',
      headerText: 'gender',
      textAlign: 'Right',
      textSize: 13,
      color: 'black',
      background: 'white',
      type: 'string',
      minWidth: 100,
    },
    {
      field: 'age',
      headerText: 'age',
      textAlign: 'Right',
      textSize: 13,
      color: 'black',
      background: 'white',
      type: 'number',
      minWidth: 100,
    },
    {
      field: 'eyeColor',
      headerText: 'eyeColor',
      textAlign: 'Right',
      textSize: 13,
      color: 'black',
      background: 'white',
      type: 'string',
      minWidth: 100,
    },
    {
      field: 'isActive',
      headerText: 'isActive',
      textAlign: 'Right',
      textSize: 13,
      color: 'black',
      background: 'white',
      type: 'boolean',
      minWidth: 100,
    },
    {
      field: 'phone',
      headerText: 'phone',
      textAlign: 'Right',
      textSize: 13,
      color: 'black',
      background: 'white',
      type: 'number',
      minWidth: 100,
    },
  ];
  currentElement: string;
  allColumns = [
    'index',
    'name',
    'company',
    'email',
    'gender',
    'age',
    'eyeColor',
    'isActive',
    'phone',
  ];
  enableMultiSort: boolean = false;
  sortData: Set<string> = new Set([]);
  enableFilter: boolean = false;

  public contextMenuItems: any = [
    { id: 'new', text: 'New', target: '.e-content' },
    { id: 'delete', text: 'Delete', target: '.e-content' },
    { id: 'edit', text: 'Edit', target: '.e-content' },
    { id: 'multi-select', text: 'Multi-Select', target: '.e-content' },
    { id: 'copy', text: 'Copy', target: '.e-content' },
    { id: 'cut', text: 'Cut', target: '.e-content' },
    { id: 'paste', text: 'Paste', target: '.e-content' },
    { id: 'paste-child', text: 'Paste-Child', target: '.e-content' },
    {
      text: 'Add',
      id: 'add',
      target: '.e-gridheader',
    },
    {
      text: 'Remove',
      id: 'remove',
      target: '.e-gridheader',
    },
    {
      text: 'Style',
      id: 'style',
      target: '.e-gridheader',
    },
    {
      text: 'Show',
      id: 'show',
      target: '.e-gridheader',
    },

    {
      text: 'Filter',
      id: 'Filter',
      target: '.e-gridheader',
    },

    {
      text: 'Multi-Sort',
      id: 'Multi-Sort',
      target: '.e-gridheader',
    },
    {
      text: 'Freeze',
      id: 'freeze',
      target: '.e-gridheader',
    },
  ];
  public editing: EditSettingsModel;

  actionComplete(event) {
    if (event?.requestType === 'sorting') {
      this.sortData = new Set(
        this.grid.sortSettings.columns.map((column) => column.field)
      );
    }
    if (event.action === 'add') {
      event.cancel = true;
      console.log(event.dialog);
    }
    console.log('action complete', event);
  }
  actionBegin(event) {
    console.log(event);
    if (event?.requestType === 'save') {
      console.log(event);
    }
  }
  setColumns(event: any, fieldName: string) {
    if (event.target.checked) {
      this.grid.showColumns(fieldName);
      this.columnData.add(fieldName);
    } else {
      this.grid.grid.hideColumns(fieldName);
      this.columnData.delete(fieldName);
    }
  }
  setColumnAttribute(fieldName: string) {
    const details = this.columnStyle.filter(
      (column) => column.field === fieldName
    );
    return {
      style: {
        color: details[0].color,
        background: details[0].background,
        fontSize: details[0].textSize + 'px',
      },
      class: 'customcss',
    };
  }
  //

  setColumnSort(event: any, fieldName: string) {
    if (event.target.checked) {
      this.grid.sortByColumn(fieldName, 'Ascending', true);
    } else {
      this.grid.grid.removeSortColumn(fieldName);
    }
  }

  contextMenuOpen(event) {
    this.currentElement = event.target.innerText;
    console.log(this.grid);
    const ee: any = this.grid.sortSettings;
    ee.finalUpdate = function () {};
  }
  contextMenuClick(args) {
    console.log('contextMenuClick', args);
    if (args.item.id === 'new') {
      const data = {
        index: 0,
        name: '',
        gender: 'male',
        company: '',
        email: '',
        isActive: false,
        age: 0,
        eyeColor: '',
        phone: 0,
        friends: [],
      };
      this.grid.addRecord(data, 0, 'Above');
    }
    if (args.item.id === 'edit') {
      this.grid.startEdit();
    }
    if (args.item.id === 'delete') {
      this.grid.deleteRecord();
    }
    if (args.item.id === 'multi-select') {
      if (this.selectionOption.type === 'Multiple') {
        this.selectionOption = { type: 'Single' };
      } else {
        this.selectionOption = { type: 'Multiple' };
      }
    }
    if (args.item.id === 'copy') {
      this.grid.copy(false);
    }
    if (args.item.id === 'paste') {
      this.grid.paste('sasasas', 1, 1);
    }
    if (args.item.id === 'add') {
      this.getColumnStyle('Add');
    }
    if (args.item.id === 'remove') {
      this.grid.grid.hideColumns(args.column.field);
    }
    if (args.item.id === 'style') {
      this.getColumnStyle('style', args.column.field);
    }
    if (args.item.id === 'show') {
      this.showColumn = true;
    }
    if (args.item.id === 'Multi-Sort') {
      this.enableMultiSort = !this.enableMultiSort;
    }

    if (args.item.id === 'Filter') {
      this.enableFilter = !this.enableFilter;
    }
    if (args.item.id === 'freeze') {
      // console.log('freeze');
      const columns = this.grid.columns.map((column) => column.field);
      const frozeIndex =
        columns.indexOf(args.column.field) + 1 === columns.length
          ? columns.indexOf(args.column.field)
          : columns.indexOf(args.column.field) + 1;
      // console.log(this.grid.frozenColumns, frozeIndex);

      if (this.grid.frozenColumns === frozeIndex) {
        this.grid.frozenColumns = 0;
      } else {
        this.grid.frozenColumns = frozeIndex;
      }
    }
  }
  getColumnStyle(action: string, columnName?: string) {
    if (action === 'style') {
      const details = this.columnStyle.filter(
        (column) => column.field === columnName
      )[0];
      this.currentColumnStyle = {
        field: details.field,
        headerText: details.headerText,
        textAlign: details.textAlign,
        textSize: details.textSize,
        color: details.color,
        background: details.background,
        type: details.type,
        minWidth: details.minWidth,
      };
      this.editStyle = true;
    } else {
      this.currentColumnStyle = {
        field: '',
        headerText: '',
        textAlign: 'Right',
        textSize: 13,
        color: 'black',
        background: 'white',
        type: 'string',
        minWidth: 100,
      };
      this.addNewColumn = true;
    }
  }

  ngOnInit(): void {
    this.editOption = {
      allowAdding: true,
      allowDeleting: true,
      allowEditing: true,
      showConfirmDialog: true,
    };
    this.pageSettings = { pageSize: 20 };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    new DataManager({
      url: 'http://localhost:3000/add',
      adaptor: new UrlAdaptor(),
    })
      .executeQuery(new Query().take(8))
      .then((e: any) => {
        this.data = e.result;
        // console.log('data====>', e.result);
      });
    this.button = [
      {
        click: () => {
          this.showColumn = false;
          this.enableMultiSort = false;
        },
        buttonModel: {
          content: 'close',
          cssClass: 'e-flat',
          isPrimary: true,
        },
      },
    ];
    this.styleEditorButtons = [
      {
        click: () => {
          if (this.editStyle) {
            this.editStyle = false;

            this.columnStyle = [
              ...this.columnStyle.filter(
                (column) => column.field != this.currentColumnStyle.field
              ),
              this.currentColumnStyle,
            ];
            let targetColumn: any = this.grid.getColumnByField(
              this.currentColumnStyle.field
            );
            targetColumn.headerText = this.currentColumnStyle.headerText;
            targetColumn.minWidth = this.currentColumnStyle.minWidth;
            targetColumn.textAlign = this.currentColumnStyle.textAlign;
            targetColumn.type = this.currentColumnStyle.type;
            targetColumn.customAttributes.style.background =
              this.currentColumnStyle.background;
            targetColumn.customAttributes.style.fontSize =
              this.currentColumnStyle.textSize + 'px';
            targetColumn.customAttributes.style.color =
              this.currentColumnStyle.color;
            this.grid.refreshColumns();
            this.currentColumnStyle = {};
          } else {
            this.addNewColumn = false;
            this.columnStyle = [...this.columnStyle, this.currentColumnStyle];
            var obj = {
              field: this.currentColumnStyle.field,
              headerText: this.currentColumnStyle.headerText,
              customAttributes: this.setColumnAttribute(
                this.currentColumnStyle.field
              ),
              minWidth: this.currentColumnStyle.minWidth,
              type: this.currentColumnStyle.type,
            };
            this.grid.columns.push(obj as any);
            this.grid.refreshColumns();
          }
        },
        buttonModel: {
          content: 'ok',
          cssClass: 'e-flat',
          isPrimary: true,
        },
      },
      {
        click: () => {
          this.editStyle = false;
          this.addNewColumn = false;
        },
        buttonModel: {
          content: 'cancel',
          cssClass: 'e-flat',
          isPrimary: true,
        },
      },
    ];
    this.sortSetting = {
      columns: [],
    };
    this.allColumns.forEach((column) => this.columnData.add(column));

    this.editing = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Dialog',
    };
  }
}
