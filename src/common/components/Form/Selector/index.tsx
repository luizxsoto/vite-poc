import { useState, useRef, useCallback, useEffect } from 'react';
import { useField } from '@unform/core';
import { GridProps } from '@mui/material/Grid';

import { debounceEvent } from '@/common/helpers/debounce';

import {
  FormSkeleton,
  Container,
  Autocomplete,
  FormControl,
  TextField,
  SelectorLoading,
  LabelContent,
  RequiredCharacter,
} from './styles';

type FormSelectorProps<TOption = Record<string, unknown>> = {
  name: string;
  label: string;
  idColumn: keyof TOption;
  nameColumn: keyof TOption;
  options: TOption[];
  onChange?: (newValue: TOption | null) => void;
  showLoading?: boolean;
  loading?: boolean;
  required?: boolean;
  gridProps?: GridProps;
  handleSearch?: ({ search }: { search: string }) => Promise<TOption[]>;
  disabled?: boolean;
  inputBox?: 'outlined' | 'filled' | 'standard';
};

export function FormSelector<
  TOption extends Record<string, unknown> = Record<string, unknown>
>({
  name,
  label,
  idColumn,
  nameColumn,
  options,
  onChange,
  showLoading,
  loading,
  required,
  gridProps,
  handleSearch,
  disabled,
  inputBox,
  ...rest
}: FormSelectorProps<TOption>): JSX.Element {
  const [value, setValue] = useState<TOption | null>(null);
  const [parsedOptions, setParsedOptions] = useState<TOption[]>(options);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const { fieldName, registerField, error, clearError, defaultValue } =
    useField(name);

  const inputRef = useRef({
    value: '',
    handleChange: (_newValue: TOption | null): void => {
      //
    },
  });

  const loadData = useCallback(
    async (search = '') => {
      if (handleSearch) {
        setLoadingSearch(true);

        const newOptions = await handleSearch({ search });
        setParsedOptions(newOptions);

        setLoadingSearch(false);
      }
    },
    [handleSearch]
  );

  const handleOnBlur = useCallback(() => {
    if (!parsedOptions.length) loadData('');
  }, [loadData, parsedOptions.length]);

  const handleChangeText = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (loadData) {
        const auxText = event.target.value.trim();

        loadData(auxText);
      }
    },
    [loadData]
  );

  const handleChange = useCallback(
    (newValue: TOption | null) => {
      setValue(newValue);

      if (inputRef.current) {
        inputRef.current.value = String(newValue?.[idColumn] || '');
      } else if (loadData) loadData('');

      if (onChange) onChange(newValue);

      if (error) clearError();
    },
    [idColumn, onChange, error, clearError, loadData]
  );

  const getOptionLabel = useCallback(
    (option: unknown) => {
      const parsedOption = option as TOption;

      return parsedOption?.[nameColumn] as string;
    },
    [nameColumn]
  );

  const isOptionEqualToValue = useCallback(
    (option: unknown, value: unknown) => {
      const parsedOption = option as TOption;
      const parsedValue = value as TOption;

      return parsedOption?.[idColumn] === parsedValue?.[idColumn];
    },
    [idColumn]
  );

  useEffect(() => {
    inputRef.current.handleChange = handleChange;
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField, handleChange]);

  useEffect(() => {
    setParsedOptions(options);
  }, [options]);

  useEffect(() => {
    const parsedDefaultValue = options.find(
      option => option[idColumn] === defaultValue
    );

    if (parsedDefaultValue) setValue(parsedDefaultValue);
  }, [defaultValue, idColumn, options]);

  return (
    <Container {...gridProps}>
      {showLoading ? (
        <FormSkeleton />
      ) : (
        <Autocomplete
          options={parsedOptions}
          onChange={(_event, newValue) => handleChange(newValue as TOption)}
          isOptionEqualToValue={isOptionEqualToValue}
          getOptionLabel={getOptionLabel}
          loading={loadingSearch || loading}
          value={value}
          autoHighlight
          disabled={disabled}
          {...rest}
          renderInput={params => (
            <FormControl error={!!error}>
              {(loadingSearch || loading) && <SelectorLoading />}
              <TextField
                {...params}
                label={
                  <LabelContent>
                    {label}{' '}
                    {required && <RequiredCharacter>*</RequiredCharacter>}
                  </LabelContent>
                }
                error={!!error}
                helperText={error || ' '}
                onChange={debounceEvent(handleChangeText, 500)}
                onBlur={handleOnBlur}
                variant={inputBox || 'outlined'}
              />
            </FormControl>
          )}
        />
      )}
    </Container>
  );
}
