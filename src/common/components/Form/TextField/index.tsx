import { useEffect, useRef, useCallback } from 'react';
import { useField } from '@unform/core';
import { GridProps } from '@mui/material/Grid';
import { TextFieldProps } from '@mui/material/TextField';

import {
  FormSkeleton,
  Container,
  FormControl,
  TextField,
  FormHelperText,
  LabelContent,
  RequiredCharacter,
  InputAdornment,
} from './styles';

type FormTextFieldProps = {
  name: string;
  label: string;
  mask?: (value: string) => string;
  helperText?: string;
  required?: boolean;
  gridProps?: GridProps;
  showLoading?: boolean;
  inputProps?: TextFieldProps;
  disabled?: boolean;
  inputBox?: 'outlined' | 'filled' | 'standard';
  endAdornment?: JSX.Element;
};

export function FormTextField({
  name,
  label,
  mask,
  helperText,
  required,
  gridProps,
  showLoading,
  inputProps,
  disabled,
  inputBox,
  endAdornment,
  ...rest
}: FormTextFieldProps) {
  const { fieldName, registerField, error, clearError, defaultValue } =
    useField(name);

  const inputRef = useRef({
    value: '',
    handleChange: (_newValue: string): void => {
      //
    },
    dispatchEvent: (_dispatchEvent: Event): void => {
      //
    },
    blur: (): void => {
      //
    },
  });

  const handleChange = useCallback(
    (newValue: string) => {
      if (error) clearError();

      const parsedValue = mask?.(newValue) || newValue;

      inputRef.current.value = parsedValue;
    },
    [clearError, error, mask]
  );

  const manualChange = useCallback(
    (newValue: string) => {
      if (error) clearError();

      const parsedValue = mask?.(newValue) || newValue;

      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
      )?.set;
      nativeInputValueSetter?.call(inputRef.current, parsedValue);

      const ev2 = new Event('input', { bubbles: true });
      inputRef.current.dispatchEvent(ev2);

      setTimeout(() => inputRef.current.blur(), 0);

      inputRef.current.value = parsedValue;
    },
    [clearError, error, mask]
  );

  useEffect(() => {
    if (mask && inputRef.current)
      inputRef.current.value = mask(inputRef.current.value);
  }, [mask]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.handleChange = manualChange;
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, manualChange, registerField, showLoading]);

  return (
    <Container {...gridProps}>
      {showLoading ? (
        <FormSkeleton />
      ) : (
        <FormControl error={!!error} {...rest}>
          <TextField
            inputRef={inputRef}
            onChange={event => handleChange(event.target.value)}
            label={
              <LabelContent>
                {label}{' '}
                {required ? <RequiredCharacter> *</RequiredCharacter> : ''}
              </LabelContent>
            }
            error={!!error}
            defaultValue={defaultValue}
            size="small"
            variant={inputBox || 'outlined'}
            disabled={disabled}
            {...inputProps}
            InputProps={{
              endAdornment: endAdornment && (
                <InputAdornment position="end">{endAdornment}</InputAdornment>
              ),
            }}
          />
          <FormHelperText>{error || helperText || ' '}</FormHelperText>
        </FormControl>
      )}
    </Container>
  );
}
