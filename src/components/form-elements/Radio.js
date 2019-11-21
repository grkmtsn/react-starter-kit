/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';

import { FormControlRadio, FormGroup, ValidationError } from './helpers';

const Radio = ({ children, ...props }) => {
  const { id, form, field, value, onChange } = props;
  const { touched, errors, handleChange } = form;
  const { name } = field;
  const fieldValue = field.value;
  return (
    <FormGroup>
      <FormControlRadio
        {...field}
        {...props}
        id={id || name}
        type="radio"
        checked={value === fieldValue}
        onChange={(e) => {
          handleChange(e);
          if (onChange) {
            onChange(e);
          }
        }}
      />
      <label htmlFor={id || name}>
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

Radio.propTypes = {
  id: PropTypes.string.isRequired,
}

export { Radio }