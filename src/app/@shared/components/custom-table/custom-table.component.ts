import {
  Component,
  EventEmitter,
  Input,
  AfterViewInit,
  Output,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { EventColumn, TableColumn } from './interface/TableColumn';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { CustomColumnModalComponent } from './custom-column-modal/custom-column-modal.component';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
})
export class CustomTableComponent implements AfterViewInit, OnChanges {
  public tableDataSource = new MatTableDataSource([]);
  public displayedColumns: string[];
  filterValues: any = {};

  @ViewChild(MatPaginator, { static: false }) matPaginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) matSort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;

  @Input() isGlobalSearch: boolean = false; // enable global search
  @Input() isPageableTop: boolean = false; // enable pagination top
  @Input() isPageableBottom: boolean = false; // enable pagination bottom
  @Input() paginationSizes: number[] = [5, 10, 15]; // pagination size
  @Input() defaultPageSize = this.paginationSizes[1]; // default page size
  @Input() enableSorting: boolean = true; // enable sorting
  @Input() numericColumns: string[]; // numerical columns sorted
  @Input() isFilterable: boolean = false; // can a column be filtered?
  @Input() isSearchable: boolean = false; //can a column be searched?
  @Input() isCustomColumn: boolean = false; // show or hide custom column
  @Input() tableColumns: TableColumn[]; // data table columns
  @Input() dragEnabled = false; // enable drag and drop
  @Input() rowActionIcon: string[];

  // this property needs to have a setter, to dynamically get changes from parent component
  @Input() set tableData(data: any[]) {
    this.setTableDataSource(data);
  }

  @Output() sort: EventEmitter<Sort> = new EventEmitter();
  @Output() rowAction: EventEmitter<EventColumn> =
    new EventEmitter<EventColumn>();

  @Output() columnsChange: EventEmitter<TableColumn[]> = new EventEmitter<
    TableColumn[]
  >();

  @Output() sortedColumn: EventEmitter<TableColumn[]> = new EventEmitter<
    TableColumn[]
  >();

  constructor(public dialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.showColumn();
  }

  // we need this, in order to make pagination work with *ngIf
  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.matPaginator;
    // this.tableDataSource.data = this.tableData;
  }

  sortData(sortParameters: Sort) {
    if (this.enableSorting) {
      const keyName = sortParameters.active;
      let data = this.tableDataSource.data.slice(); // make a copy of the data array

      const numericColumns = this.numericColumns; // define the columns that should be sorted numerically

      if (sortParameters.direction === 'asc') {
        data.sort((a: any, b: any) => {
          if (a['name'] === undefined || b['name'] === undefined) {
            return 0; // fallback to no sort if keyName is undefined
          } else if (numericColumns.includes(keyName)) {
            return a['name'] - b['name'];
          } else {
            return a['name'].localeCompare(b['name']);
          }
        });
      } else if (sortParameters.direction === 'desc') {
        data.sort((a: any, b: any) => {
          if (a['name'] === undefined || b['name'] === undefined) {
            return 0; // fallback to no sort if keyName is undefined
          } else if (numericColumns.includes(keyName)) {
            return b['name'] - a['name'];
          } else {
            return b['name'].localeCompare(a['name']);
          }
        });
      } else {
        data = this.tableDataSource.data.slice(); // reset to the original data array
      }

      this.tableDataSource.data = data; // update the data source with the sorted data
    }
  }

  applyGlobalFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = filterValue.trim().toLocaleLowerCase();

    if (this.tableDataSource.paginator) {
      this.tableDataSource.paginator.firstPage();
    }

    // Show a message when there is no data found
    this.tableDataSource.filteredData = this.tableDataSource.filteredData || [];
  }

  applyFilterColumn(event: Event, column: string) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.tableDataSource.filterPredicate = (data: any, filter: string) => {
      const columnValue = data[column].toString().toLowerCase();
      return columnValue.indexOf(filter) !== -1;
    };
    this.tableDataSource.filter = filterValue;
  }

  applyFilter(
    filter: { type: 'string' | 'select'; value: string },
    dataKey: string
  ) {
    this.tableDataSource.filterPredicate = (
      data: any,
      filter: string | string[]
    ) => {
      const value = data[dataKey];
      if (Array.isArray(filter)) {
        return filter.length === 0 || filter.includes(value);
      } else {
        return value.toLowerCase().includes(filter);
      }
    };
    this.tableDataSource.filter = filter.value;
  }

  applySelectFilter(column: TableColumn, event: any) {
    const filterValue = event.value;

    this.filterValues[column.dataKey] = filterValue.trim().toLowerCase();
    const filterObject = JSON.parse(this.tableDataSource.filter || '{}');
    filterObject[column.dataKey] = `"${this.filterValues[column.dataKey]}"`;

    this.tableDataSource.filter = JSON.stringify(filterObject);

    this.tableDataSource.filter = filterValue
      ? filterValue.trim().toLowerCase()
      : '';
    this.tableDataSource.filterPredicate = (data: any, filter: string) => {
      return (
        !filter ||
        filter
          .split(',')
          .some((value: string) => data[column.dataKey] === value)
      );
    };
    this.tableDataSource.filter = this.filterValues[column.dataKey];
  }

  showFilter(event: Event, item: any) {
    event.stopPropagation();
    let action = item.filter.show;
    this.tableColumns.forEach((col: any) => {
      if (col.filter) {
        col.filter.show = false;
      }
    });
    item.filter.show = !action;
  }

  emitRowAction(row: Object, actionName: string) {
    const data: EventColumn = {
      row,
      actionName,
    };
    this.rowAction.emit(data);
  }

  setTableDataSource(data: any) {
    this.tableDataSource = new MatTableDataSource(data);
    this.tableDataSource.paginator = this.matPaginator;
    if (this.enableSorting) this.tableDataSource.sort = this.matSort;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.displayedColumns,
      event.previousIndex,
      event.currentIndex
    );
    let sortedColumn: TableColumn[] = [];
    let addedIndex: number[] = [];

    this.displayedColumns.forEach((item) => {
      let index = this.tableColumns.findIndex((c) => c.name == item);
      addedIndex.push(index);
      sortedColumn.push(this.tableColumns[index]);
    });

    for (let i = 0; i < this.tableColumns.length; i++) {
      if (!addedIndex.includes(i)) sortedColumn.push(this.tableColumns[i]);
    }

    this.tableColumns = sortedColumn;
    this.sortedColumn.emit(this.tableColumns);
  }

  openModal(): void {
    const dialogRef = this.dialog.open(CustomColumnModalComponent, {
      height: '400px',
      width: '700px',
      data: {
        title: 'Custom Columns',
        message: '',
        tableColumns: this.tableColumns,
        tableData: this.tableDataSource.data,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.tableColumns = result;
        this.showColumn();
        this.columnsChange.emit(this.tableColumns);
      }
    });
  }

  showColumn() {
    // initialize filterValues for each column
    this.tableColumns.forEach((column) => {
      this.filterValues[column.dataKey] = '';
    });

    const columnNames: string[] = [];
    this.tableColumns.forEach((tableColumn: TableColumn) => {
      if (tableColumn.show) columnNames.push(tableColumn.name);
    });

    if (this.rowActionIcon) {
      this.displayedColumns = [...this.rowActionIcon, ...columnNames];
    } else {
      this.displayedColumns = columnNames;
    }
  }

  clickedOutside(tableColumn: any): void {
    if (tableColumn.filter.show) tableColumn.filter.show = false;
  }
}
