import styled from "styled-components";
import { useField } from "formik";

const FormTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
      <InputContainer>
        <input {...field} {...props} />
      </InputContainer>
    </>
  );
};

const FormDropDown = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
      <InputContainer>
        <select {...field} {...props} />
      </InputContainer>
    </>
  );
};

const FormToggle = ({ label, ...props }) => {
  const [field] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>

      <RadioContainer>
        <input
          {...field}
          id="radio-one"
          type="radio"
          value={true}
          defaultChecked
        />
        <label htmlFor="radio-one" className="toggle-label">
          {props.toggleYes}{" "}
        </label>
        <input {...field} id="radio-two" type="radio" value={false} />
        <label htmlFor="radio-two" className="toggle-label">
          {props.toggleNo}
        </label>
      </RadioContainer>
    </>
  );
};

const FormDatePicker = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const minDate = new Date().toISOString().split("T")[0];
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
      <InputContainer>
        <input {...field} {...props} type="date" min={minDate} />
      </InputContainer>
    </>
  );
};

const FormTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className="textarea-label" htmlFor={props.id || props.name}>
        {label}
      </label>
      <InputContainer>
        <textarea {...field} {...props} />
        {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
      </InputContainer>
    </>
  );
};

const FormTimePicker = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
      <InputContainer>
        <input type="time" {...field} {...props} locale="fi" />
      </InputContainer>
    </>
  );
};

const Error = styled.div`
  color: red;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  align-self: center;
`;

const InputContainer = styled.div`
  width: 40%;
  input,
  select {
    width: 100%;
    height: 100%;
    text-align: center;
  }

  textarea {
    width: 100%;
    height: 5rem;
    margin-bottom: 3rem;
    border-radius: 0.3rem;
    resize: none;
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

  & .toggle-label {
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
