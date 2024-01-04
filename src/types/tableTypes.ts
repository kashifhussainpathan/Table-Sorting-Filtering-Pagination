export type RowType = {
  id: number;
  name: string;
  age: number;
  position: string;
  start_date: string;
};

export type ColumnType = {
  accessor: string;
  label: string;
  format?: (value: string) => string;
};

export type TableProps = {
  columns: ColumnType[];
  rows: RowType[];
};

export type FiltersType = {
  name?: string;
  age?: number | null;
  position?: string | null;
  start_date?: string;
};

export type SortStateType = { order: string; orderBy: string };

export type SortIconHandlerType = (column: ColumnType) => string;

export type HandleSortType = (accessor: string) => void;

export type HandleSearchType = (value: string, accessor: string) => void;
