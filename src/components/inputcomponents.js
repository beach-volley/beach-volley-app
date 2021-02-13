import styled from "styled-components";
import { useFormikContext, useField } from "formik";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import fi from "date-fns/locale/en-GB";
registerLocale("FI", fi);

const FormTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <InputRow>
      <label htmlFor={props.id || props.name}>{label}</label>
      {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
      <InputContainer>
        <input {...field} {...props} />
      </InputContainer>
    </InputRow>
  );
};

const FormDropDown = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <InputRow>
      <label htmlFor={props.id || props.name}>{label}</label>
      {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
      <InputContainer>
        <select {...field} {...props} />
      </InputContainer>
    </InputRow>
  );
};

const FormToggle = ({ label, ...props }) => {
  const [field] = useField(props);
  return (
    <InputRow>
      <label htmlFor={props.id || props.name}>{label}</label>

      <RadioContainer>
        <input
          {...field}
          id="radio-one"
          type="radio"
          value={true}
          defaultChecked
        />
        <label htmlFor="radio-one">{props.toggleYes}</label>
        <input {...field} id="radio-two" type="radio" value={false} />
        <label htmlFor="radio-two">{props.toggleNo}</label>
      </RadioContainer>
    </InputRow>
  );
};

const FormDatePicker = ({ label, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);

  return (
    <InputRow>
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
    </InputRow>
  );
};

const FormTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <InputRow>
      <label className="textarea-label" htmlFor={props.id || props.name}>{label}</label>
      <InputContainer>
        <textarea {...field} {...props} />
        {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
      </InputContainer>
    </InputRow>
  );
};

const FormTimePicker = ({ label, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);

  return (
    <InputRow>
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
          dateFormat="p"
        />
      </InputContainer>
    </InputRow>
  );
};

const Error = styled.div`
    color: red;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    align-self: center;
`;

const InputRow = styled.div`
  display: flex;
  margin-bottom: 2rem;

  label {
    margin-right: auto;
    align-self: center;
    color: white;
    font-size: ${(props) => props.theme.fontSizes.medium};
  }

  .textarea-label {
    align-self: flex-start;
  }
`;

const InputContainer = styled.div`
  width: 40%;
  input, select {
    width: 100%;
    text-align: center;
  }

  textarea {
    width: 100%;
    height: 5rem;
    margin-bottom: 3rem;
    border-radius: 0.3rem;
    resize: none;
  
  }

  //override datepicker css
  & .react-datepicker__input-container {
    input {
      width: 100%;
      text-align: center;
    }
  }

  & .react-datepicker-wrapper {
    display: block;
  }

  & .react-datepicker {
  
    button {
      margin-top: -0.3rem;
      height: 0.5rem;
    }
    margin-left: -5rem
  }

  & .react-datepicker__triangle {
    display: none
  }
  
  & .react-datepicker--time-only {
    margin: auto;
  }
  
`;

const RadioContainer = styled.div`
  display: flex;
  overflow: hidden;

  input {
    position: absolute !important;
    clip: rect(0, 0, 0, 0);
    border: 0;
    overflow: hidden;
    width: 100%;
  }

  label {
    background-color: #e4e4e4;
    color: black;
    font-size: 0.9rem;
    text-align: center;
    padding: 0.5rem;
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

export {
  FormTextInput,
  FormDropDown,
  FormDatePicker,
  FormTimePicker,
  FormToggle,
  FormTextArea,
};
