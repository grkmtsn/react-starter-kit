import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import useCancelablePromise from '@/hooks/useCancelablePromise'
import { FormControlAsyncSelect, FormGroup, Label, ValidationError, RequiredStar } from './helpers';

// TODO: onChange, instant fetch, serverside search eklenecek. 

const AsyncSelect = ({ label, defaultOptions, isMulti = false, placeholder, field, form, requiredStar, id, theme }) => {
  const { errors, touched } = form;
  const { name } = field;
  const { cancellablePromise } = useCancelablePromise();

  const onChange = (option) => {
    form.setFieldValue(
      name,
      isMulti
        ? option && option.map(item => item.value)
        : option.value
    )
  }

  const fetchOptions = (inputValue) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await cancellablePromise(fetch(`https://api.github.com/search/users?q=${inputValue}`));
        const { items } = await result.json();
        const extractedOptions = items && items.map(d => ({ label: d.login, value: d.id }));
        resolve(extractedOptions);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    })
  }

  return (
    <FormGroup>
      <Label htmlFor={id || name}>{label} {requiredStar && <RequiredStar>*</RequiredStar>} </Label>
      <FormControlAsyncSelect
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
        id={id || name}
        name={name}
        defaultValue={defaultOptions || ''}
        defaultOptions={defaultOptions || {}}
        cacheOptions
        loadOptions={fetchOptions}
        placeholder={placeholder}
        isMulti={isMulti}
        onChange={onChange}
        error={!!(touched[name] && errors[name])}
      />
      {touched[name] && errors[name] ? (
        <ValidationError>
          {errors[name]}
        </ValidationError>
      ) : null}
    </FormGroup>
  )
}

const AsyncDropdown = withTheme(AsyncSelect)

AsyncDropdown.defaultProps = {
  requiredStar: false,
  isMulti: false,
}

AsyncDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  requiredStar: PropTypes.bool,
  isMulti: PropTypes.bool,
}

export { AsyncDropdown };