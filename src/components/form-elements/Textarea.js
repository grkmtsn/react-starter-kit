import React from 'react'
import PropTypes from 'prop-types';

import { FormControlTextArea, FormGroup, Label, ValidationError, RequiredStar } from './helpers';


const Textarea = ({ label, ...props }) => {
  const { id, requiredStar, form, field } = props;
  const { errors, touched } = form;
  const { name } = field;

  return (
    <FormGroup>
      <Label htmlFor={id || name}>{label} {requiredStar && <RequiredStar>*</RequiredStar>}</Label>
      <FormControlTextArea
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

Textarea.defaultProps = {
  rows: "3",
  requiredStar: false
}

Textarea.propTypes = {
  label: PropTypes.string.isRequired,
  rows: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  requiredStar: PropTypes.bool,
}

export { Textarea };