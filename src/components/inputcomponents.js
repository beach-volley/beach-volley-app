import styled from "styled-components";
import { useFormikContext, useField } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FormTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <InputWrapper>
      <label htmlFor={props.id || props.name}>{label}</label>
      {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
      <InputContainer>
        <input className="text-input" {...field} {...props} />
      </InputContainer>
    </InputWrapper>
  );
};

const FormDropDown = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <InputWrapper>
      <label htmlFor={props.id || props.name}>{label}</label>
      {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
      <InputContainer>
        <select {...field} {...props} />
      </InputContainer>
    </InputWrapper>
  );
};

const FormDatePicker = ({ label, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);

  return (
    <InputWrapper>
      <label htmlFor={props.id || props.name}>{label}</label>
      {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
      <InputContainer>
        <DatePicker
          {...field}
          {...props}
          selected={(field.value && new Date(field.value)) || null}
          onChange={(val) => {
            setFieldValue(field.name, val);
          }}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select date"
          minDate={new Date()}
        />
      </InputContainer>
    </InputWrapper>
  );
};

const Error = styled.div`
    color: red;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    align-self: center;
}
`;

const InputWrapper = styled.div`
  display: flex;
  margin-bottom: 2rem;
  width: 100%;
  label {
    margin-right: auto;
    align-self: center;
    color: white;
    font-size: ${(props) => props.theme.fontSizes.medium};
  }
`;

const InputContainer = styled.div`
  width: 50%;
  
  input, select {
    width: 100%;
  }
  & .react-datepicker__input-container {
    input {
      width: 100%;
    }
  }

  & .react-datepicker {
    button {
      margin-top: -0.3rem;
      height: 0.5rem;
    }
    margin-left: -2rem;
  }
`;

export { FormTextInput, FormDropDown, FormDatePicker };
