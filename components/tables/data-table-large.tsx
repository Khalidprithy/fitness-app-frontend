'use client';

import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Icons } from '../icons';

interface CommonDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  pageNo?: number;
  totalItems: number;
  pageSizeOptions?: number[];
  pageCount?: number;
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
  showSearch?: boolean;
  showPagination?: boolean;
  enableRowDrag?: boolean;
  setData: (data: TData[]) => void;
  onDragEnd?: (updatedData: TData[]) => void;
}

interface RowDragEnabledProps<TData> {
  enableRowDrag: boolean;
  setData: (data: TData[]) => void;
  onDragEnd: (updatedData: TData[]) => void;
}

interface RowDragDisabledProps {
  enableRowDrag?: false;
  setData?: never;
  onDragEnd?: never;
}

type DataTableProps<TData, TValue> =
  | (CommonDataTableProps<TData, TValue> & RowDragEnabledProps<TData>)
  | (CommonDataTableProps<TData, TValue> & RowDragDisabledProps);

export function DataTableLarge<TData extends { id: string }, TValue>({
  columns,
  data,
  pageNo,
  searchKey = '',
  totalItems,
  pageCount,
  pageSizeOptions = [10, 20, 30, 40, 50],
  showSearch = true,
  showPagination = true,
  enableRowDrag = false,
  setData,
  onDragEnd
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = searchParams?.get('page') ?? '1';
  const pageAsNumber = Number(page);
  const fallbackPage =
    isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber;
  const per_page = searchParams?.get('limit') ?? '10';
  const perPageAsNumber = Number(per_page);
  const fallbackPerPage = isNaN(perPageAsNumber) ? 10 : perPageAsNumber;

  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams]
  );

  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: fallbackPage - 1,
      pageSize: fallbackPerPage
    });

  React.useEffect(() => {
    router.push(
      `${pathname}?${createQueryString({
        page: pageIndex + 1,
        limit: pageSize
      })}`,
      { scroll: false }
    );
  }, [pageIndex, pageSize]);

  const table = useReactTable({
    data,
    columns: enableRowDrag
      ? [
          ...columns,
          {
            id: 'drag',
            cell: ({ row }) => <DragHandle row={row} />,
            size: 50
          }
        ]
      : columns,
    pageCount: pageCount ?? -1,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { pagination: { pageIndex, pageSize } },
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualFiltering: true
  });

  const searchValue = table.getColumn(searchKey)?.getFilterValue() as string;

  React.useEffect(() => {
    if (searchValue?.length > 0) {
      router.push(
        `${pathname}?${createQueryString({
          page: null,
          limit: null,
          search: searchValue
        })}`,
        { scroll: false }
      );
    }
    if (searchValue?.length === 0 || searchValue === undefined) {
      router.push(
        `${pathname}?${createQueryString({
          page: null,
          limit: null,
          search: null
        })}`,
        { scroll: false }
      );
    }

    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [searchValue]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id && enableRowDrag) {
      const newData = arrayMove(
        data,
        data.findIndex((row) => row.id === active.id),
        data.findIndex((row) => row.id === over.id)
      );

      setData(newData);
      onDragEnd(newData);
    }
  };

  const DraggableRow = ({ row }: { row: any }) => {
    const { setNodeRef, transform, transition } = useSortable({
      id: row.original.id
    });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition
    };

    return (
      <TableRow ref={setNodeRef} style={style}>
        {row.getVisibleCells().map((cell: any) => (
          <TableCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    );
  };

  const DragHandle = ({ row }: { row: any }) => {
    const { attributes, listeners } = useSortable({
      id: row.original.id
    });

    return (
      <div className="flex items-center justify-end">
        <Button size="icon" variant="outline" {...attributes} {...listeners}>
          <Icons.grip className="h-4 w-4 text-gray-500" />
        </Button>
      </div>
    );
  };

  return (
    <>
      {showSearch && (
        <div className="flex items-center justify-between">
          <Input
            placeholder={`Search ${searchKey}...`}
            value={
              (table.getColumn(searchKey)?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
            className="w-full md:max-w-sm"
          />
          <small className="rounded border px-2">Total: {totalItems}</small>
        </div>
      )}

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={data.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <Table className="relative">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {data.length ? (
                table.getRowModel().rows.map((row) =>
                  enableRowDrag ? (
                    <DraggableRow key={row.id} row={row} />
                  ) : (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  )
                )
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </SortableContext>
      </DndContext>
      {showPagination && (
        <div className="flex flex-col items-center justify-end gap-2 space-x-2 py-4 sm:flex-row ">
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
              <div className=" flex items-center space-x-2">
                <p className="whitespace-nowrap text-sm font-medium">
                  Rows per page
                </p>
                <select
                  value={table.getState().pagination.pageSize}
                  onChange={(event) => {
                    table.setPageSize(Number(event.target.value));
                  }}
                  className="h-8 w-[70px] rounded-md border bg-transparent px-2 py-1"
                >
                  {pageSizeOptions.map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex w-full items-center justify-between gap-2 sm:justify-end">
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                aria-label="Go to first page"
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <Icons.chevronsLeft className="h-5 w-5" aria-hidden="true" />
              </Button>
              <Button
                aria-label="Go to previous page"
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <Icons.chevronLeft className="h-5 w-5" aria-hidden="true" />
              </Button>
              <Button
                aria-label="Go to next page"
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <Icons.chevronRight className="h-5 w-5" aria-hidden="true" />
              </Button>
              <Button
                aria-label="Go to last page"
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <Icons.chevronsRight className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
