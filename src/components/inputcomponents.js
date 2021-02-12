import styled from "styled-components";
import { useFormikContext, useField } from "formik";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import fin from "date-fns/locale/fi";
registerLocale("FI", fin );

const FormTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <InputWrapper>
      <label htmlFor={props.id || props.name}>{label}</label>
      {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
      <InputContainer>
        <input type="text" {...field} {...props} />
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

const FormRadioButton = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <InputWrapper>
      <label htmlFor={props.id || props.name}>{label}</label>
      {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
      <InputContainer>
        <input type="radio" name="gender" value="male" />
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
          locale="FI"
          timeIntervals={30}
          minDate={new Date()}
        />
      </InputContainer>
    </InputWrapper>
  );
};

const FormTimePicker = ({ label, ...props }) => {
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
          placeholderText={props.placeholder}
          locale="FI"
          timeIntervals={30}
          showTimeSelect
          showTimeSelectOnly
          dateFormat="h:mm"
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
  input,
  select {
    width: 100%;
  }
  & .react-datepicker__input-container {
    input {
      width: 100%;
    }
  }

  .react-datepicker-wrapper {
    display: block;
  }

  & .react-datepicker {
    button {
      margin-top: -0.3rem;
      height: 0.5rem;
    }
    margin-left: -2rem;
  }
`;

export { FormTextInput, FormDropDown, FormDatePicker, FormTimePicker, FormRadioButton };
