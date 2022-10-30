import { useEffect, useMemo, useState } from 'react';

import { changePageTitle } from '@/common/helpers';
import { i18n } from '@/common/i18n';
import { useUser } from '@/modules/auth/contexts/user';

import {
  ActionFunction,
  ColumnInfo,
  FilterParams,
} from '@/common/components/Table';
import { FilterByOption } from '@/common/components/Table/Header';

import { Table, Container } from './styles';
import { User } from '@/modules/auth/contracts/models';
import { useNavigate } from 'react-router-dom';

const columnInfos: ColumnInfo[] = [
  { key: 'id', label: i18n().modules.auth.pages.users.list.tableColumn.id },
  {
    key: 'name',
    label: i18n().modules.auth.pages.users.list.tableColumn.name,
  },
  {
    key: 'email',
    label: i18n().modules.auth.pages.users.list.tableColumn.email,
  },
  {
    key: 'role',
    label: i18n().modules.auth.pages.users.list.tableColumn.role,
  },
  {
    key: 'createdAtFormated',
    label: i18n().modules.auth.pages.users.list.tableColumn.createdAt,
  },
];

const filterByOptions: FilterByOption[] = [
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
  {
    key: 'role',
    label: i18n().modules.auth.pages.users.list.tableColumn.role,
    type: 'normal',
    format: 'string',
  },
];

export function UsersList(): JSX.Element {
  changePageTitle(i18n().modules.auth.pages.users.list.title);

  const navigate = useNavigate();
  const [pageLoaded, setPageLoaded] = useState(false);

  const { userList, listLoading, list } = useUser();

  function onSubmitSearch({ filterBy, filterValue }: FilterParams): void {
    if (filterBy && filterValue) {
      list({ [filterBy]: filterValue });
    } else {
      list({});
    }
  }

  function addFunction() {
    navigate('/form');
  }

  const actionFunctions = useMemo<ActionFunction[]>(() => {
    return [
      {
        key: 'show',
        label: i18n().modules.auth.pages.users.list.action.show,
        handle: model => {
          console.log(i18n().modules.auth.pages.users.list.action.show, model);
        },
      },
      {
        key: 'update',
        label: i18n().modules.auth.pages.users.list.action.update,
        handle: model => {
          console.log(
            i18n().modules.auth.pages.users.list.action.update,
            model
          );
        },
      },
      {
        key: 'remove',
        label: i18n().modules.auth.pages.users.list.action.remove,
        handle: model => {
          console.log(
            i18n().modules.auth.pages.users.list.action.remove,
            model
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
        modelKey="id"
        modelList={userList as (Record<string, unknown> & User)[]}
        listTotal={userList.length}
        addFunction={addFunction}
        columnInfos={columnInfos}
        onSubmitSearch={onSubmitSearch}
        filterByOptions={filterByOptions}
        actionFunctions={actionFunctions}
        loading={listLoading}
      />
    </Container>
  );
}
