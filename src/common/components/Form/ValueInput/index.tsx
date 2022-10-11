import { useEffect, useRef, forwardRef } from 'react';
import { useField } from '@unform/core';
import { InputBaseComponentProps } from '@mui/material/InputBase';
import { TextFieldProps } from '@mui/material/TextField';
import { GridProps } from '@mui/material/Grid';
import { NumericFormatProps } from 'react-number-format';

import {
  Container,
  FormSkeleton,
  FormControl,
  LabelContent,
  TextField,
  InputAdornment,
  FormHelperText,
  NumericFormat,
  RequiredCharacter,
} from './styles';

const NumberFormatCustom = forwardRef<typeof NumericFormat, NumericFormatProps>(
  function NumberFormatCustom(
    { ...rest }: NumericFormatProps,
    inputRef
  ): JSX.Element {
    return (
      <NumericFormat
        getInputRef={inputRef}
        thousandSeparator="."
        decimalSeparator=","
        fixedDecimalScale
        decimalScale={2}
        allowNegative={false}
        isAllowed={values => {
          const { floatValue } = values;

          return floatValue === undefined || floatValue <= 999999999.99;
        }}
        {...rest}
      />
    );
  }
);

type FormTextInputProps = {
  name: string;
  label: string;
  helperText?: string;
  required?: boolean;
  gridProps?: GridProps;
  inputProps?: NumericFormatProps<TextFieldProps>;
  showLoading?: boolean;
  disabled?: boolean;
  endAdornment?: JSX.Element;
};

export function FormValueInput({
  name,
  label,
  helperText,
  required,
  gridProps,
  inputProps,
  showLoading,
  disabled,
  endAdornment,
  ...rest
}: FormTextInputProps): JSX.Element {
  const { fieldName, registerField, error, clearError, defaultValue } =
    useField(name);

  const inputRef = useRef({ value: '' });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;

    if (error) clearError();

    inputRef.current.value = value;
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField, showLoading]);

  return (
    <Container {...gridProps}>
      {showLoading ? (
        <FormSkeleton />
      ) : (
        <FormControl error={!!error} disabled={disabled}>
          <TextField
            inputRef={inputRef}
            onChange={handleChange}
            label={
              <LabelContent>
                {label}{' '}
                {required ? <RequiredCharacter> *</RequiredCharacter> : ''}
              </LabelContent>
            }
            error={!!error}
            defaultValue={defaultValue}
            {...rest}
            inputProps={{ ...inputProps } as InputBaseComponentProps}
            InputProps={{
              endAdornment: endAdornment && (
                <InputAdornment position="end">{endAdornment}</InputAdornment>
              ),
              inputComponent:
                NumberFormatCustom as React.ElementType<InputBaseComponentProps>,
            }}
          />
          <FormHelperText>{error || helperText || ' '}</FormHelperText>
        </FormControl>
      )}
    </Container>
  );
}
