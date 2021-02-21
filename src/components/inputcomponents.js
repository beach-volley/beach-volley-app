import styled from "styled-components";
import { useField } from "formik";

const FormTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
        <input {...field} {...props} />
    </>
  );
};

const FormDropDown = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
        <select {...field} {...props} />
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

        <input {...field} {...props} type="date" min={minDate} />
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
        <textarea {...field} {...props} />
        {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
    </>
  );
};

const FormTimePicker = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
        <input type="time" {...field} {...props} locale="fi" />
    </>
  );
};

const Error = styled.div`
  color: red;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  align-self: center;
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
