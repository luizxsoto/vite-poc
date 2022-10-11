import { useEffect, useMemo, useState } from 'react';

import { changePageTitle } from '@/common/helpers';
import {
  ActionFunction,
  ColumnInfo,
  FilterProps,
} from '@/common/components/Table';
import { FilterByOption } from '@/common/components/Table/Header';

import { Table, Container } from './styles';
import { i18n } from '@/common/i18n';

const columnInfos: ColumnInfo[] = [
  { key: 'id', label: i18n().modules.auth.pages.users.list.tableColumn.id },
  { key: 'name', label: i18n().modules.auth.pages.users.list.tableColumn.name },
  {
    key: 'email',
    label: i18n().modules.auth.pages.users.list.tableColumn.email,
  },
];

const filterByOptions: FilterByOption[] = [
  {
    key: 'id',
    label: i18n().modules.auth.pages.users.list.tableColumn.id,
    type: 'normal',
    format: 'integer',
  },
  {
    key: 'name',
    label: i18n().modules.auth.pages.users.list.tableColumn.name,
    type: 'normal',
    format: 'string',
  },
  {
    key: 'email',
    label: i18n().modules.auth.pages.users.list.tableColumn.email,
    type: 'normal',
    format: 'string',
  },
];

export function UsersList(): JSX.Element {
  changePageTitle(i18n().modules.auth.pages.users.list.title);
  const [pageLoaded, setPageLoaded] = useState(false);
  const registerList = Array.from({ length: 100 }).map((item, index) => ({
    id: `any_id_${index}`,
    name: `any_name_${index}`,
    email: `any_email_${index}`,
  }));
  const listLoading = false;
  const validations = {};

  function onSubmitSearch({
    filterBy,
    data,
    order,
    orderBy,
    page,
    perPage,
  }: FilterProps): void {
    const searchData = {
      order,
      orderBy,
      page,
      perPage,
      forSelector: false,
      data:
        data && filterBy
          ? [
              {
                field: filterBy,
                type: 'normal',
                values: data.split(';'),
              },
            ]
          : undefined,
    };

    console.log('onSubmitSearch', { searchData });
  }

  function addFunction() {
    console.log('addFunction');
  }

  const actionFunctions = useMemo<ActionFunction[]>(() => {
    return [
      {
        key: 'show',
        label: i18n().modules.auth.pages.users.list.action.show,
        handle: register => {
          console.log(
            i18n().modules.auth.pages.users.list.action.show,
            register
          );
        },
      },
      {
        key: 'update',
        label: i18n().modules.auth.pages.users.list.action.update,
        handle: register => {
          console.log(
            i18n().modules.auth.pages.users.list.action.update,
            register
          );
        },
      },
      {
        key: 'remove',
        label: i18n().modules.auth.pages.users.list.action.remove,
        handle: register => {
          console.log(
            i18n().modules.auth.pages.users.list.action.remove,
            register
          );
        },
        confirmMessage:
          i18n().modules.auth.pages.users.list.action.confirmRemove,
      },
    ];
  }, []);

  useEffect(() => {
    if (!registerList.length && !pageLoaded) {
      console.log('useEffect', {
        order: 'asc',
        orderBy: 'id',
        page: 1,
        perPage: 10,
        forSelector: false,
        data: [],
      });
    }

    setPageLoaded(true);
  }, [registerList.length, pageLoaded]);

  return (
    <Container>
      <Table
        title={i18n().modules.auth.pages.users.list.title}
        registerKey="id"
        registerList={registerList}
        listTotal={registerList.length}
        addFunction={addFunction}
        columnInfos={columnInfos}
        onSubmitSearch={onSubmitSearch}
        filterByOptions={filterByOptions}
        actionFunctions={actionFunctions}
        validations={validations}
        loading={listLoading}
      />
    </Container>
  );
}
