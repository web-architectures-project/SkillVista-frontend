// Import the necessary dependencies and components
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Define the interface for the DataTable component's props
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]; // Column definitions
  data: TData[]; // Data to display in the table
  queryData: object;
  query: string; // Search query
}

// Define the DataTable component as a functional component
export function DataTable<TData, TValue>({
  columns,
  data,
  query,
  queryData,
}: DataTableProps<TData, TValue>) {
  // Initialize a table instance using useReactTable
  const table = useReactTable({
    data, // Data to display
    columns, // Column definitions
    getCoreRowModel: getCoreRowModel(), // Row model
  });

  return (
    <div
      className={`${
        queryData ? "opacity-100 visible" : "invisible opacity-0"
      } rounded-md w-full transition ease-linear duration-1000`}
    >
      <Table>
        {/* TableHeader section: Defines the table header with column headers */}
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        {/* TableBody section: Displays table rows and data */}
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            /* Render a message when there are no results in the table */
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
