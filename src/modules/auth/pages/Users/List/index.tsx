import { useEffect, useMemo, useState } from 'react';

import { changePageTitle } from '@/common/helpers';
import { i18n } from '@/common/i18n';
import { useUser } from '@/modules/auth/contexts/user';

import {
  ActionFunction,
  ColumnInfo,
  FilterProps,
} from '@/common/components/Table';
import { FilterByOption } from '@/common/components/Table/Header';

import { Table, Container } from './styles';
import { User } from '@/modules/auth/contracts/models';

const columnInfos: ColumnInfo[] = [
  { key: 'id', label: i18n().modules.auth.pages.users.list.tableColumn.id },
  {
    key: 'email',
    label: i18n().modules.auth.pages.users.list.tableColumn.email,
  },
];

const filterByOptions: FilterByOption[] = [
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

  const { userList, listLoading, list } = useUser();
  const validations = {};

  function onSubmitSearch({ filterBy, data }: FilterProps): void {
    if (filterBy && data) {
      list({ [filterBy]: data });
    } else {
      list({});
    }
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
    if (!userList.length && !pageLoaded) {
      list({});
    }

    setPageLoaded(true);
  }, [userList.length, pageLoaded, list]);

  return (
    <Container>
      <Table
        title={i18n().modules.auth.pages.users.list.title}
        registerKey="id"
        registerList={userList as (Record<string, unknown> & User)[]}
        listTotal={userList.length}
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
