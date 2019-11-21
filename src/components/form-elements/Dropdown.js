import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import useCancelablePromise from '@/hooks/useCancelablePromise'
import { FormControlSelect, FormGroup, Label, ValidationError, RequiredStar } from './helpers';

const Select = ({ label, options = [], isMulti = false, placeholder, field, form, requiredStar, id, theme, onChange }) => {
  const [selectOptions, setSelectOptions] = useState(options);
  const [isLoading, setIsLoading] = useState(true);
  const { cancellablePromise } = useCancelablePromise();
  const { errors, touched } = form;

  const getValue = () => {
    if (selectOptions) {
      return isMulti
        ? selectOptions.filter(option => field && field.value && field.value.indexOf(option.value) >= 0)
        : selectOptions.find(option => option.value === field.value)
    }
    return isMulti ? [] : ""
  }

  const handleChange = (option) => {
    if (onChange) {
      onChange(option);
    }
    form.setFieldValue(
      field.name,
      isMulti
        ? option && option.map(item => item.value)
        : option.value
    )
  }

  useEffect(() => {
    if (selectOptions.length === 0) {
      const fetchOptions = async () => {
        try {
          const result = await cancellablePromise(fetch(`https://api.github.com/search/users?q=grkm`));
          const { items } = await result.json();
          const extractedOptions = items && items.map(d => ({ label: d.login, value: d.id }));
          setSelectOptions(extractedOptions);
          getValue();
          setIsLoading(false);
        } catch (error) {
          console.error(error);
        }
      }
      fetchOptions();
    }
  }, []);

  return (
    <FormGroup>
      <Label htmlFor={id || field.name}>{label} {requiredStar && <RequiredStar>*</RequiredStar>} </Label>
      <FormControlSelect
        theme={rcTheme => ({
          ...rcTheme,
          borderRadius: 4,
          colors: {
            ...rcTheme.colors,
            primary25: theme.primary25,
            primary50: theme.primary50,
            primary: theme.primary,
          },
        })}
        id={id || field.name}
        name={field.name}
        options={selectOptions}
        isLoading={isLoading}
        placeholder={placeholder}
        isMulti={isMulti}
        value={getValue()}
        onChange={handleChange}
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

const Dropdown = withTheme(Select)

Dropdown.defaultProps = {
  requiredStar: false,
  isMulti: false,
}

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  requiredStar: PropTypes.bool,
  isMulti: PropTypes.bool,
}

export { Dropdown };