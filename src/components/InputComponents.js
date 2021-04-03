import styled from "styled-components";
import { Field, useField } from "formik";
import { TextField } from "formik-material-ui";
import MenuItem from '@material-ui/core/MenuItem';
import { TimePicker, DatePicker } from "formik-material-ui-pickers";

export const TextInput = ({ ...props }) => {
  return (
    <InputRowMUI>
      <Field component={TextField} {...props} />
    </InputRowMUI>
  );
};

export const PickTime = ({ ...props }) => {
  return (
    <InputRowMUI>
      <Field component={TimePicker} {...props} />
    </InputRowMUI>
  );
};

export const PickDate = ({ ...props }) => {
  return (
    <InputRowMUI>
      <Field component={DatePicker} {...props} disablePast />
    </InputRowMUI>
  );
};

export const DropDown = ({ name, options, ...props }) => {

  return (
    <InputRowMUI>
      <Field
        name={name}
        {...props}
        component={TextField}
        type="text"
        select
      >
      {options.map((option) => {
        return (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        )
      })}
      </Field>
    </InputRowMUI>
  );
};

export const ToggleInput = ({ label, ...props }) => {
  const [field] = useField(props);
  return (
    <InputRowMUI>
      <label htmlFor={props.id || props.name}></label>
      <RadioContainer>
        <input
          {...field}
          id="radio-one"
          type="radio"
          value={true}
          defaultChecked={props.checked ? true : null}
        />
        <label htmlFor="radio-one" className="toggle-label">
          {props.toggleYes}{" "}
        </label>

        <input
          {...field}
          id="radio-two"
          type="radio"
          value={false}
          defaultChecked={props.checked ? null : true}
        />
        <label htmlFor="radio-two" className="toggle-label">
          {props.toggleNo}
        </label>
      </RadioContainer>
    </InputRowMUI>
  );
};

export const FormTextArea = ({ label, ...props }) => {
  const [field] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea className="form-text-area" {...field} {...props} />
    </>
  );
};

const RadioContainer = styled.div`
  width: 100%;
  margin-top: 1rem;
  overflow: hidden;
  padding: 0.5rem;
  text-align: center;

  @media only screen and (min-width: ${(props) =>
      props.theme.mediaQuery.tabletWidth}) {
    width: 50%;
  }

  input {
    position: absolute !important;
    clip: rect(0, 0, 0, 0);
    border: 0;
    overflow: hidden;
  }
  & .toggle-label {
    background-color: #e4e4e4;
    color: black !important;
    font-size: 0.9rem;
    text-align: center;
    padding: 1rem;
    margin: 1.5;
  }

  input:checked + label {
    background-color: #a5dc86;
    box-shadow: none;
  }

  label:first-of-type {
    border-radius: 0.25rem 0 0 0.25rem;
  }

  label:last-of-type {
    border-radius: 0 0.25rem 0.25rem 0;
  }
`;

//override material-ui css
const InputRowMUI = styled.div`
  display: flex;
  margin-bottom: 1rem;

  label {
    font-size: ${(props) => props.theme.fontSizes.medium};
    flex: 1;
    color: white !important;
  }

  .MuiFormControl-root {
    flex-direction: row;
    margin: 0;
  }

  .MuiInputLabel-formControl {
    transform: none;
    position: relative;
  }

  .MuiInput-root,
  .MuiTextField-root {
    flex: 1;
  }

  .MuiInput-underline::before {
    transition: none;
    border-bottom: 1px solid white;
  }

  .MuiInput-underline::after {
    transition: none;
    border-bottom: none;
    border-color: white;
  }

  .MuiInputBase-input {
    color: white;
    text-align: center;
  }

  & .MuiFormLabel-root {
    display: flex;
    align-items: flex-end;
    font-family: inherit;
  }

  .MuiSelect-nativeInput {
    display: none;
  }

  .MuiSelect-select.MuiSelect-select {
    padding-right: 0;
  }

  .MuiSvgIcon-root {
    color: white;
  }

  .MuiFormHelperText-root {
    position: absolute;
    left: 0;
  }
`;
