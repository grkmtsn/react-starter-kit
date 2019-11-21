import styled from 'styled-components';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FormControlInput = styled.input(props => `
  display: block;
  width: 100%;
  padding: 10px 20px;
  font-size: 14px;
  height: auto;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-clip: padding-box;
  border: ${props.error ? "1px solid #ff8b8b" : "1px solid #ced4da"};
  border-radius: .25rem;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  :focus {
    color: #495057;
    border-color: ${props.theme.inputBorderColor};
    outline: 0;
    box-shadow: 0 0 0 0.2rem ${props.theme.inputShadowColor};
  }
  :disabled {
    cursor: not-allowed;
    background: #e4e4e4;
    opacity: 0.5;
  }
`)

const FormControlTextArea = styled.textarea(props => `
  display: block;
  width: 100%;
  padding: 10px 20px;
  font-size: 14px;
  height: auto;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-clip: padding-box;
  border: ${props.error ? "1px solid #ff8b8b" : "1px solid #ced4da"};
  border-radius: .25rem;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  :focus {
    color: #495057;
    border-color: ${props.theme.inputBorderColor};
    outline: 0;
    box-shadow: 0 0 0 0.2rem ${props.theme.inputShadowColor};
  }
`)

const FormControlCheckbox = styled.input(props => `
  position: absolute;
  opacity: 0;
  + label {
    position: relative;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
  }
  + label:before {
    content: '';
    margin-right: 10px;
    display: inline-block;
    vertical-align: text-top;
    width: 20px;
    height: 20px;
    background: white;
    border: 1px solid #ccc;
    transition: all .3s ease;
  }
  :hover + label:before {
    background: #efefef;
  }
  :focus + label:before {
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12);
  }
  :checked + label:before {
    background: ${props.theme.primary};
  }
  :disabled + label:before {
    box-shadow: none;
    background: #ddd;
    cursor: not-allowed;
  }
  :checked + label:after {
    content: '';
    position: absolute;
    left: 6px;
    top: 10px;
    background: white;
    width: 2px;
    height: 2px;
    box-shadow: 2px 0 0 white, 4px 0 0 white, 4px -2px 0 white, 4px -4px 0 white, 4px -6px 0 white, 4px -8px 0 white;
    -webkit-transform: rotate(45deg);
            transform: rotate(45deg);
  }
`)

const FormControlRadio = styled.input(props => `
  position: absolute;
  opacity: 0;
  + label {
    position: relative;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
  }
  + label:before {
    content: '';
    background: #fff;
    border-radius: 100%;
    border: 1px solid #b4b4b4;
    display: inline-block;
    width: 20px;
    height: 20px;
    position: relative;
    margin-right: 10px;
    vertical-align: top;
    cursor: pointer;
    text-align: center;
    transition: all 250ms ease;
  }
  :hover + label:before {
    background: #efefef;
  }
  :checked + label:before {
    background-color: ${props.theme.primary};
    box-shadow: inset 0 0 0 4px #f4f4f4;
  }
  :focus + label:before {
    outline: none;
    border-color: ${props.theme.primary};
  }
  :disabled + label:before {
    background: #dddddd;
    cursor: not-allowed;
  }
  + label:empty:before {
    margin-right: 0
  }
`);

const FormControlSelect = styled(Select)(props => `
  > div:first-child {
    border: ${props.error ? "1px solid #ff8b8b" : ""}!important;
    border-radius: 4px;
    border: 1px solid #ced4da;
    box-shadow: none;
  }
`)

const FormControlAsyncSelect = styled(AsyncSelect)(props => `
  > div:first-child {
    border: ${props.error ? "1px solid #ff8b8b" : ""}!important;
    border-radius: 4px;
    border: 1px solid #ced4da;
    box-shadow: none;
  }
`)

const FormControlDatePicker = styled(DatePicker)(props => `
display: block;
width: 100%;
padding: 10px 20px;
font-size: 14px;
height: auto;
font-weight: 400;
line-height: 1.5;
color: #495057;
background-clip: padding-box;
border: ${props.error ? "1px solid #ff8b8b" : "1px solid #ced4da"};
border-radius: .25rem;
transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
:focus {
  color: #495057;
  border-color: ${props.theme.inputBorderColor};
  outline: 0;
  box-shadow: 0 0 0 0.2rem ${props.theme.inputShadowColor};
}
:disabled {
  cursor: not-allowed;
  background: #e4e4e4;
  opacity: 0.5;
}
.react-datepicker__day--selected {
  background-color: ${props.theme.primary50};
}
`)

export {
  FormControlInput,
  FormControlTextArea,
  FormControlCheckbox,
  FormControlRadio,
  FormControlSelect,
  FormControlAsyncSelect,
  FormControlDatePicker
};