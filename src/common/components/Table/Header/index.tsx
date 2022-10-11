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

export type FilterByProps = { filterBy?: string; data?: string };

const validatorSchema = yup.object().shape(
  {
    filterBy: yup
      .string()
      .max(100, i18n().common.validators.max(100))
      .when('data', {
        is: (data: string) => data?.length,
        then: yup.string().required(i18n().common.validators.required),
        otherwise: yup.string(),
      }),
    data: yup
      .string()
      .max(100, i18n().common.validators.max(100))
      .when('filterBy', {
        is: (filterBy: string) => filterBy?.length,
        then: yup.string().required(i18n().common.validators.required),
        otherwise: yup.string(),
      }),
  },
  [
    ['data', 'filterBy'],
    ['data', 'filterBy'],
  ]
);

function sanitizer(register: FilterByProps): FilterByProps {
  return {
    filterBy: register.filterBy,
    data: register.data,
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
  onSubmitSearch: (register: FilterByProps) => void;
  filterByOptions: FilterByOption[];
  validations?: Record<string, string>;
  loading?: boolean;
};

export function Header({
  title,
  formRef,
  addFunction,
  onSubmitSearch,
  filterByOptions,
  validations,
  loading,
}: HeaderProps): JSX.Element {
  const [selectedOption, setSelectedOption] = useState<FilterByOption | null>(
    null
  );

  function handleChangeOption(newValue: FilterByOption | null): void {
    setSelectedOption(newValue);

    formRef.current?.setFieldValue('data', '');
  }

  const SearchInput = useCallback(() => {
    const defaultProps = {
      label: i18n().common.components.table.header.searchFor,
      name: 'data',
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

  useEffect(() => {
    formRef.current?.setErrors(validations || {});
  }, [formRef, validations]);

  return (
    <Container>
      <Typography>{title}</Typography>
      {addFunction && (
        <IconButton onClick={addFunction}>
          <AddIcon />
        </IconButton>
      )}
      <FormContainer<FilterByProps>
        formRef={formRef}
        validatorSchema={validatorSchema}
        sanitizer={sanitizer}
        onSubmit={onSubmitSearch}
        initialData={{ data: formRef.current?.getFieldValue('data') }}
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
