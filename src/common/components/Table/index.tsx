import { useState, useRef } from 'react';
import { FormHandles } from '@unform/core';
4;
import { debounceEvent } from '@/common/helpers/debounce';
import { SortTypes } from '@/common/constants';

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

export type FilterParams = {
  filterBy?: string;
  data?: string;
  page: number;
  perPage: number;
  order: SortTypes;
  orderBy: string;
};

type TableProps<ModelKey extends string> = {
  title: string;
  modelKey: ModelKey;
  modelList: (Record<string, unknown> & Record<ModelKey, string>)[];
  listTotal: number;
  columnInfos: ColumnInfo[];
  onSubmitSearch: (params: FilterParams) => void;
  filterByOptions: FilterByOption[];
  addFunction?: () => void;
  actionFunctions?: ActionFunction[];
  loading?: boolean;
};

export function Table<ModelKey extends string>({
  title,
  modelKey,
  modelList,
  listTotal,
  columnInfos,
  onSubmitSearch,
  filterByOptions,
  addFunction,
  actionFunctions,
  loading,
}: TableProps<ModelKey>): JSX.Element {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [order, setOrder] = useState<SortTypes>('asc');
  const [orderBy, setOrderBy] = useState('id');

  const formRef = useRef<FormHandles>(null);

  function handleSubmitSearch(formData: FilterByParams) {
    setPage(0);

    onSubmitSearch({
      ...formData,
      page: 1,
      perPage: rowsPerPage,
      order,
      orderBy,
    });
  }

  function onPageChange(newPage: number) {
    setPage(newPage);

    const formData = formRef.current?.getData();
    debounceEvent(() =>
      onSubmitSearch({
        ...formData,
        page: newPage + 1,
        perPage: rowsPerPage,
        order,
        orderBy,
      })
    )();
  }

  function onRowsPerPageChange(newRowsPerPage: number) {
    setRowsPerPage(newRowsPerPage);
    setPage(0);

    const formData = formRef.current?.getData();
    debounceEvent(() =>
      onSubmitSearch({
        ...formData,
        page: 1,
        perPage: newRowsPerPage,
        order,
        orderBy,
      })
    )();
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
        orderBy: key,
      })
    )();
  }

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
            modelList={modelList}
            columnInfos={columnInfos}
            actionFunctions={actionFunctions}
          />
        </TableWrapper>
      </TableContainer>
      <Pagination
        count={listTotal}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Container>
  );
}
