import { FiltersType, RowType } from "./tableTypes";

export type ObjectType = Record<string, any>;

export type IsStringFunction = (value: any) => boolean;

export type IsDateStringFunction = (value: any) => boolean;

export type ConvertDateStringFunction = (value: string) => string;

export type ConvertTypeFunction = (value: any) => string;

export type IsEmptyFunction = (obj: ObjectType) => boolean;

export type IsNillFunction = (value: any) => boolean;

export type IsNumberFunction = (value: any) => boolean;

export type FilterRowsHandlerType = (
  rows: RowType[],
  filters: FiltersType,
) => RowType[];

export type SortRowsHandlerType = (
  rows: RowType[],
  sort: { order: string; orderBy: string },
) => RowType[];

export type PaginateRowsType = (
  sortedRows: RowType[],
  activePage: number,
  rowsPerPage: number,
) => RowType[];
