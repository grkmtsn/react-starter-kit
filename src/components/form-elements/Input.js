import React from 'react'
import PropTypes from 'prop-types';

import { FormControlInput, FormGroup, Label, ValidationError, RequiredStar } from './helpers';


const Input = ({ label, ...props }) => {
  const { id, requiredStar, form, field } = props;
  const { errors, touched } = form;
  const { name } = field;
  return (
    <FormGroup>
      <Label htmlFor={id || name}>{label} {requiredStar && <RequiredStar>*</RequiredStar>} </Label>
      <FormControlInput
        {...field}
        {...props}
        id={id || name}
        error={!!(touched[field.name] && errors[field.name])} />
      {touched[field.name] && errors[field.name] ? (
        <ValidationError>
          {errors[field.name]}
        </ValidationError>
      ) : null}
    </FormGroup>
  )
}

Input.defaultProps = {
  type: 'text',
  requiredStar: false,
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  requiredStar: PropTypes.bool,
}

export { Input };