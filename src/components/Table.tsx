import { FC, useMemo, useState } from "react";
import { Pagination } from "./Pagination";
import {
  ColumnType,
  FiltersType,
  HandleSearchType,
  HandleSortType,
  RowType,
  SortIconHandlerType,
  SortStateType,
  TableProps,
} from "../types/tableTypes";
import { filterRows, paginateRows, sortRows } from "../helpers";

export const Table: FC<TableProps> = ({ columns, rows }) => {
  const [activePage, setActivePage] = useState<number>(1);
  const [filters, setFilters] = useState<FiltersType>({});
  const [sort, setSort] = useState<SortStateType>({
    order: "asc",
    orderBy: "id",
  });

  const rowsPerPage = 5;
  const filteredRows = useMemo(
    () => filterRows(rows, filters),
    [rows, filters],
  );

  const sortedRows = useMemo(
    () => sortRows(filteredRows, sort),
    [filteredRows, sort],
  );

  const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage);

  const count = filteredRows.length;
  const totalPages = Math.ceil(count / rowsPerPage);

  const handleSearch: HandleSearchType = (value, accessor) => {
    setActivePage(1);

    if (value) {
      setFilters((prevFilters) => ({ ...prevFilters, [accessor]: value }));
    } else {
      setFilters((prevFilters: FiltersType) => {
        const updatedFilters = { ...prevFilters };
        delete updatedFilters[accessor as keyof FiltersType];

        return updatedFilters;
      });
    }
  };

  const handleSort: HandleSortType = (accessor) => {
    setActivePage(1);
    setSort((prevSort) => ({
      order:
        prevSort.order === "asc" && prevSort.orderBy === accessor
          ? "desc"
          : "asc",
      orderBy: accessor,
    }));
  };

  const sortIcon: SortIconHandlerType = (column) => {
    if (column.accessor === sort.orderBy) {
      if (sort.order === "asc") {
        return "⬆️";
      }
      return "⬇️";
    } else {
      return "️↕️";
    }
  };

  const clearAll = () => {
    setSort({ order: "asc", orderBy: "id" });
    setActivePage(1);
    setFilters({});
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            {columns.map((column) => {
              return (
                <th key={column.accessor}>
                  <span>{column.label}</span>
                  <button onClick={() => handleSort(column.accessor)}>
                    {sortIcon(column)}
                  </button>
                </th>
              );
            })}
          </tr>
          <tr>
            {columns.map((column: ColumnType) => {
              return (
                <th key={column.accessor}>
                  <input
                    key={`${column.accessor}-search-input`}
                    type="search"
                    placeholder={`Search ${column.label}`}
                    value={filters[column.accessor as keyof FiltersType] || ""}
                    onChange={(event) =>
                      handleSearch(event.target.value, column.accessor)
                    }
                  />
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {calculatedRows.map((row: RowType) => {
            return (
              <tr key={row.id}>
                {columns.map((column) => {
                  return (
                    <td key={column.accessor}>
                      {row[column.accessor as keyof RowType]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {count > 0 ? (
        <Pagination
          activePage={activePage}
          count={count}
          rowsPerPage={rowsPerPage}
          totalPages={totalPages}
          setActivePage={setActivePage}
        />
      ) : (
        <p>No data found</p>
      )}
      <div>
        <p>
          <button onClick={clearAll} className="clearAll">
            Clear All
          </button>
        </p>
      </div>
    </>
  );
};
