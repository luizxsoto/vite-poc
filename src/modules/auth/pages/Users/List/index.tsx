import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { changePageTitle } from '@/common/helpers';
import { i18n } from '@/common/i18n';
import { useUser } from '@/modules/auth/contexts/user';
import { FilterByOption } from '@/common/components/Table/Header';
import { UserListResult } from '@/modules/auth/contracts/application-services';

import {
  ActionFunction,
  ColumnInfo,
  FilterParams,
} from '@/common/components/Table';

import { Table, Container } from './styles';

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

  const { listData, listLoading, list } = useUser();

  function addFunction() {
    navigate('/form');
  }

  const actionFunctions = useMemo<ActionFunction[]>(() => {
    return [
      {
        key: 'show',
        label: i18n().modules.auth.pages.users.list.action.show,
        handle: model => {
          navigate(`/form/${model.id}?method=show`);
        },
      },
      {
        key: 'update',
        label: i18n().modules.auth.pages.users.list.action.update,
        handle: model => {
          navigate(`/form/${model.id}?method=update`);
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

  return (
    <Container>
      <Table<UserListResult>
        title={i18n().modules.auth.pages.users.list.title}
        modelKey="id"
        listData={listData}
        addFunction={addFunction}
        columnInfos={columnInfos}
        onSubmitSearch={list}
        filterByOptions={filterByOptions}
        actionFunctions={actionFunctions}
        loading={listLoading}
      />
    </Container>
  );
}
