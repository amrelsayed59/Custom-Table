import { AfterViewInit, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableColumn } from '../interface/TableColumn';

export interface ModalData {
  title?: string;
  message?: string;
  showColumn?: Function;
  tableColumns: TableColumn[];
  tableData?: any[];
}

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-column-modal.component.html',
  styleUrls: ['./custom-column-modal.component.scss'],
})
export class CustomColumnModalComponent {
  tableColumns: TableColumn[];
  tableData: any;

  constructor(
    public dialogRef: MatDialogRef<CustomColumnModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData
  ) {
    this.tableColumns = data.tableColumns;
    this.tableData = data.tableData;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectItem() {
    this.dialogRef.close(this.tableColumns);
  }

  onColumnChange() {
    this.tableColumns = [...this.tableColumns];
  }

  onSortedColumn(event: TableColumn[]) {
    this.tableColumns = event;
  }
}
