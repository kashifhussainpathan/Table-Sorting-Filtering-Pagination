import {
  ConvertDateStringFunction,
  ConvertTypeFunction,
  FilterRowsHandlerType,
  IsDateStringFunction,
  IsEmptyFunction,
  IsNillFunction,
  IsNumberFunction,
  IsStringFunction,
  PaginateRowsType,
  SortRowsHandlerType,
} from "./types/helpersTypes";
import { FiltersType, RowType } from "./types/tableTypes";

export const isEmpty: IsEmptyFunction = (obj) => {
  return Object.keys(obj).length === 0;
};

export const isNumber: IsNumberFunction = (value) => {
  return typeof value == "number" && !isNaN(value);
};

export const isNil: IsNillFunction = (value) => {
  return typeof value === "undefined" || value === null;
};

export const isString: IsStringFunction = (value) => {
  return typeof value === "string" || value instanceof String;
};

export const isDateString: IsDateStringFunction = (value) => {
  if (!isString(value)) return false;

  return value.match(/^\d{2}-\d{2}-\d{4}$/);
};

export const convertDateString: ConvertDateStringFunction = (value) => {
  return value.substr(6, 4) + value.substr(3, 2) + value.substr(0, 2);
};

export const convertType: ConvertTypeFunction = (value) => {
  if (typeof value === "number") {
    return value.toString();
  }

  if (isDateString(value)) {
    return convertDateString(value);
  }

  return value;
};

export const filterRows: FilterRowsHandlerType = (rows, filters) => {
  if (isEmpty(filters)) return rows;

  return rows.filter((row: RowType) => {
    return Object.keys(filters).every((accessor: string) => {
      const value = row[accessor as keyof RowType];
      const searchValue = filters[accessor as keyof FiltersType];

      if (isString(value)) {
        return value?.toLowerCase().includes(searchValue?.toLowerCase());
      }

      if (isNumber(value)) {
        return value == searchValue;
      }

      return false;
    });
  });
};

export const sortRows: SortRowsHandlerType = (rows, sort) => {
  return rows.sort((a, b) => {
    const { order, orderBy } = sort;

    if (isNil(a[orderBy as keyof RowType])) return 1;
    if (isNil(b[orderBy as keyof RowType])) return -1;

    const aLocale = convertType(a[orderBy as keyof RowType]);
    const bLocale = convertType(b[orderBy as keyof RowType]);

    if (order === "asc") {
      return aLocale.localeCompare(bLocale, "en", {
        numeric: isNumber(b[orderBy as keyof RowType]),
      });
    } else {
      return bLocale.localeCompare(aLocale, "en", {
        numeric: isNumber(a[orderBy as keyof RowType]),
      });
    }
  });
};

export const paginateRows: PaginateRowsType = (
  sortedRows,
  activePage,
  rowsPerPage,
) => {
  return [...sortedRows].slice(
    (activePage - 1) * rowsPerPage,
    activePage * rowsPerPage,
  );
};
