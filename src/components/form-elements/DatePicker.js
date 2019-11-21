import React from 'react'
import PropTypes from 'prop-types';
import { registerLocale } from 'react-datepicker';
import { tr } from 'date-fns/locale'
import { FormControlDatePicker, FormGroup, Label, ValidationError, RequiredStar } from './helpers';

registerLocale('tr', tr);

const DatePicker = ({ label, placeholder, ...props }) => {
  const { id, requiredStar, form, field } = props;
  const { errors, touched, setFieldValue } = form;
  const { name, value } = field;

  const handleChange = (date) => {
    setFieldValue(
      field.name,
      date
    )
  }

  return (
    <FormGroup>
      <Label htmlFor={id || name}>{label} {requiredStar && <RequiredStar>*</RequiredStar>}</Label>
      <FormControlDatePicker
        {...field}
        {...props}
        id={id || name}
        calendarClassName="custom-calendar"
        placeholderText={placeholder}
        selected={value}
        onChange={handleChange}
        dateFormat="dd/MM/yyyy"
        locale="tr"
        todayButton="Bugün"
        showMonthDropdown
        showYearDropdown
        scrollableYearDropdown
        error={!!(touched[field.name] && errors[field.name])}
      />
      {touched[field.name] && errors[field.name] ? (
        <ValidationError>
          {errors[field.name]}
        </ValidationError>
      ) : null}
    </FormGroup>
  )
}

DatePicker.defaultProps = {
  requiredStar: false
}

DatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  requiredStar: PropTypes.bool,
}

export { DatePicker };