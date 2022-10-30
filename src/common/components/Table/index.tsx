import { useState, useRef, useEffect, useMemo } from 'react';
import { FormHandles } from '@unform/core';
4;
import { debounceEvent } from '@/common/helpers/debounce';
import { OrderTypes } from '@/common/constants';

import { Header, FilterByParams, FilterByOption } from './Header';
import { Head } from './Head';
import { Body } from './Body';
import { Pagination } from './Pagination';

import {
  Container,
  TableContainer,
  TableWrapper,
  CircularProgressContainer,
  CircularProgress,
} from './styles';
import { ListApplicationServiceResult } from '@/common/contracts';

export type ColumnInfo = {
  key: string;
  label: string;
};

export type ActionFunction = {
  key: string;
  label: string | React.ReactNode;
  handle: (model: Record<string, unknown>) => void;
  confirmMessage?: string;
};

export type FilterParams<
  OrderBy extends ListApplicationServiceResult['orderBy']
> = {
  filterBy?: string;
  filterValue?: string;
  page: number;
  perPage: number;
  order: OrderTypes;
  orderBy: OrderBy;
};

type TableProps<ListData extends ListApplicationServiceResult> = {
  title: string;
  modelKey: string;
  listData: ListData;
  columnInfos: ColumnInfo[];
  onSubmitSearch: (params: FilterParams<ListData['orderBy']>) => void;
  filterByOptions: FilterByOption[];
  addFunction?: () => void;
  actionFunctions?: ActionFunction[];
  loading?: boolean;
};

export function Table<ListData extends ListApplicationServiceResult>({
  title,
  modelKey,
  listData,
  columnInfos,
  onSubmitSearch,
  filterByOptions,
  addFunction,
  actionFunctions,
  loading,
}: TableProps<ListData>): JSX.Element {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(listData.perPage);
  const [order, setOrder] = useState<OrderTypes>(listData.order);
  const [orderBy, setOrderBy] = useState(listData.orderBy);
  const parsedOrderBy = useMemo(
    () => orderBy.replace(/Formated$/, ''),
    [orderBy]
  );

  const formRef = useRef<FormHandles>(null);

  function handleSubmitSearch({ filterBy, filterValue }: FilterByParams) {
    setPage(0);

    const searchData: FilterParams<ListData['orderBy']> &
      Record<string, unknown> = {
      page: 1,
      perPage: rowsPerPage,
      order,
      orderBy: parsedOrderBy,
    };

    if (filterBy && filterValue) searchData[filterBy] = filterValue;

    onSubmitSearch(searchData);
  }

  function onPageChange(newPage: number) {
    setPage(newPage);

    const searchData: FilterParams<ListData['orderBy']> &
      Record<string, unknown> = {
      page: newPage + 1,
      perPage: rowsPerPage,
      order,
      orderBy: parsedOrderBy,
    };
    const formData = formRef.current?.getData();
    if (formData?.filterBy && formData?.filterValue) {
      searchData[formData?.filterBy] = formData?.filterValue;
    }

    debounceEvent(() => onSubmitSearch(searchData))();
  }

  function onRowsPerPageChange(newRowsPerPage: number) {
    setRowsPerPage(newRowsPerPage);
    setPage(0);

    const searchData: FilterParams<ListData['orderBy']> &
      Record<string, unknown> = {
      page: 1,
      perPage: newRowsPerPage,
      order,
      orderBy: parsedOrderBy,
    };
    const formData = formRef.current?.getData();
    if (formData?.filterBy && formData?.filterValue) {
      searchData[formData?.filterBy] = formData?.filterValue;
    }

    debounceEvent(() => onSubmitSearch(searchData))();
  }

  function onRequestSort(key: string) {
    const isAsc = orderBy === key && order === 'asc';
    const parsedOrder = isAsc ? 'desc' : 'asc';
    setOrder(parsedOrder);
    setOrderBy(key);

    const formData = formRef.current?.getData();
    debounceEvent(() =>
      onSubmitSearch({
        ...formData,
        page: page + 1,
        perPage: rowsPerPage,
        order: parsedOrder,
        orderBy: key.replace(/Formated$/, ''),
      })
    )();
  }

  useEffect(() => {
    if (!listData.data.length && !pageLoaded) {
      onSubmitSearch({
        page: 1,
        perPage: listData.perPage,
        order: listData.order,
        orderBy: parsedOrderBy,
      });
    }

    setPageLoaded(true);
  }, [listData, pageLoaded, onSubmitSearch]);

  return (
    <Container>
      <Header
        title={title}
        formRef={formRef}
        addFunction={addFunction}
        onSubmitSearch={handleSubmitSearch}
        filterByOptions={filterByOptions}
        loading={loading}
      />
      <TableContainer id="table-container">
        {loading && (
          <CircularProgressContainer>
            <CircularProgress />
          </CircularProgressContainer>
        )}
        <TableWrapper>
          <Head
            columnInfos={columnInfos}
            order={order}
            orderBy={orderBy}
            onRequestSort={onRequestSort}
            actionFunctions={actionFunctions}
          />
          <Body
            modelKey={modelKey}
            modelList={listData.data}
            columnInfos={columnInfos}
            actionFunctions={actionFunctions}
          />
        </TableWrapper>
      </TableContainer>
      <Pagination
        count={listData.total}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Container>
  );
}
