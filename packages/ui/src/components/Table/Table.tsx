import { useMemo, useState, type ReactNode } from "react";
import "./Table.css";

export interface TableColumn<T> {
    id: string;
    header: string;
    cell: (row: T) => ReactNode;
    sortValue?: (row: T) => string | number;
}

export interface TableProps<T> {
    columns: TableColumn<T>[];
    rows: T[];
    getRowKey: (row: T) => string | number;
}

type SortState = { columnId: string; direction: "asc" | "desc" } | null;

const collator = new Intl.Collator();

export function Table<T>({ columns, rows, getRowKey }: TableProps<T>) {
    const [sort, setSort] = useState<SortState>(null);

    const sortedRows = useMemo(() => {
        if (!sort) return rows;
        const sortValue = columns.find((c) => c.id === sort.columnId)?.sortValue;
        if (!sortValue) return rows;

        const factor = sort.direction === "asc" ? 1 : -1;
        return [...rows].sort((a, b) => {
            const av = sortValue(a);
            const bv = sortValue(b);
            if (typeof av === "number" && typeof bv === "number") return (av - bv) * factor;
            return collator.compare(String(av), String(bv)) * factor;
        });
    }, [rows, sort, columns]);

    function toggleSort(columnId: string) {
        setSort((prev) => {
            if (prev?.columnId !== columnId) return { columnId, direction: "asc" };
            if (prev.direction === "asc") return { columnId, direction: "desc" };
            return null;
        });
    }

    return (
        <table className="ui-table">
            <thead>
            <tr>
                {columns.map((column) => {
                    const isSorted = sort?.columnId === column.id;
                    return (
                        <th
                            key={column.id}
                            aria-sort={
                                isSorted ? (sort.direction === "asc" ? "ascending" : "descending") : undefined
                            }
                        >
                            {column.sortValue ? (
                                <button
                                    type="button"
                                    className="ui-table__sort"
                                    onClick={() => toggleSort(column.id)}
                                >
                                    {column.header}
                                    <span className="ui-table__sort-icon" aria-hidden="true">
                      {isSorted ? (sort.direction === "asc" ? "↑" : "↓") : "↕"}
                    </span>
                                </button>
                            ) : (
                                column.header
                            )}
                        </th>
                    );
                })}
            </tr>
            </thead>
            <tbody>
            {sortedRows.map((row) => (
                <tr key={getRowKey(row)}>
                    {columns.map((column) => (
                        <td key={column.id}>{column.cell(row)}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}