/* eslint-disable jsx-a11y/label-has-for */
import React from 'react'
import { FormControlCheckbox, FormGroup, ValidationError } from './helpers';

const Checkbox = ({ children, ...props }) => {
  const { form, field, onChange } = props;
  const { touched, errors, handleChange } = form;
  const { name } = field;
  return (
    <FormGroup>
      <FormControlCheckbox
        {...field}
        {...props}
        id={name}
        type="checkbox"
        checked={field.value}
        onChange={(e) => {
          handleChange(e);
          if (onChange) {
            onChange(e);
          }
        }}
      />
      <label htmlFor={name}>
        {children}
      </label>
      {touched[field.name] && errors[field.name] ? (
        <ValidationError>
          {errors[field.name]}
        </ValidationError>
      ) : null}
    </FormGroup>
  )
}

export { Checkbox }