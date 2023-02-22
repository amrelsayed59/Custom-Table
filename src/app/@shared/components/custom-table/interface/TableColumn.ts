export interface TableColumn {
  name: string; // column name
  dataKey: string; // name of key of the actual data in this column
  position?: 'right' | 'left'; // should it be right-aligned or left-aligned?
  isSortable?: boolean; // can a column be sorted?
  isSearchable?: boolean; //can a column be searched?
  isFilterable?: boolean; // can a column be filtered?
  show?: boolean; // show or hide custom column
  filter?: {
    type: 'string' | 'select';
    value?: string | string[];
    options?: string[];
    show?: boolean; // enable filter card
  };
  filterValues?: { [key: string]: string | string[] };
}

export interface EventColumn {
  row: Object;
  actionName: string;
}
