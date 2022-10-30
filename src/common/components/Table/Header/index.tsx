import { useEffect, RefObject, useState, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import { GridProps } from '@mui/material/Grid';

import { i18n } from '@/common/i18n';

import * as yup from 'yup';

import {
  Container,
  IconButton,
  AddIcon,
  SearchIcon,
  CircularProgress,
  Typography,
  FormContainer,
  FormGridContainer,
  FormSelector,
  FormTextInput,
  FormValueInput,
} from './styles';

export type FilterByParams = { filterBy?: string; filterValue?: string };

const validatorSchema = yup.object().shape(
  {
    filterBy: yup
      .string()
      .max(100, i18n().common.validators.max(100))
      .when('filterValue', {
        is: (filterValue: string) => filterValue?.length,
        then: yup.string().required(i18n().common.validators.required),
        otherwise: yup.string(),
      }),
    filterValue: yup
      .string()
      .max(100, i18n().common.validators.max(100))
      .when('filterBy', {
        is: (filterBy: string) => filterBy?.length,
        then: yup.string().required(i18n().common.validators.required),
        otherwise: yup.string(),
      }),
  },
  [
    ['filterValue', 'filterBy'],
    ['filterValue', 'filterBy'],
  ]
);

function sanitizer(params: FilterByParams): FilterByParams {
  return {
    filterBy: params.filterBy,
    filterValue: params.filterValue,
  };
}

export type FilterByOption = {
  key: string;
  label: string;
  type: 'normal' | 'range';
  format: 'string' | 'integer' | 'date';
};

type HeaderProps = {
  title: string;
  formRef: RefObject<FormHandles>;
  addFunction?: () => void;
  onSubmitSearch: (params: FilterByParams) => void;
  filterByOptions: FilterByOption[];
  loading?: boolean;
};

export function Header({
  title,
  formRef,
  addFunction,
  onSubmitSearch,
  filterByOptions,
  loading,
}: HeaderProps): JSX.Element {
  const [selectedOption, setSelectedOption] = useState<FilterByOption | null>(
    null
  );

  function handleChangeOption(newValue: FilterByOption | null): void {
    setSelectedOption(newValue);

    formRef.current?.setFieldValue('filterValue', '');
    formRef.current?.setFieldError('filterValue', '');
  }

  const SearchInput = useCallback(() => {
    const defaultProps = {
      label: i18n().common.components.table.header.searchFor,
      name: 'filterValue',
      gridProps: { xs: 12, sm: 3 } as GridProps<'div', unknown>,
      disabled: !selectedOption,
      helperText: selectedOption
        ? ''
        : i18n().common.components.table.header.selectAField,
    };

    const defaultInput = () => <FormTextInput {...defaultProps} />;

    const inputDict: {
      [key in FilterByOption['format']]: () => JSX.Element;
    } = {
      string: defaultInput,
      integer: () => (
        <FormValueInput
          {...defaultProps}
          inputProps={{ decimalScale: 0, thousandSeparator: '' }}
        />
      ),
      date: defaultInput,
    };

    return (
      !selectedOption ? defaultInput : inputDict[selectedOption.format]
    )();
  }, [selectedOption]);

  return (
    <Container>
      <Typography>{title}</Typography>
      {addFunction && (
        <IconButton onClick={addFunction}>
          <AddIcon />
        </IconButton>
      )}
      <FormContainer<FilterByParams>
        formRef={formRef}
        validatorSchema={validatorSchema}
        sanitizer={sanitizer}
        onSubmit={onSubmitSearch}
        initialData={{
          filterValue: formRef.current?.getFieldValue('filterValue'),
        }}
      >
        <FormGridContainer justifyContent="right" alignItems="center" gap={1}>
          <FormSelector<FilterByOption>
            label={i18n().common.components.table.header.atField}
            name="filterBy"
            idColumn="key"
            nameColumn="label"
            options={filterByOptions}
            onChange={handleChangeOption}
            gridProps={{ xs: 12, sm: 3 }}
          />
          <SearchInput />
          <IconButton type="submit" disabled={loading}>
            {loading ? <CircularProgress size={26} /> : <SearchIcon />}
          </IconButton>
        </FormGridContainer>
      </FormContainer>
    </Container>
  );
}
