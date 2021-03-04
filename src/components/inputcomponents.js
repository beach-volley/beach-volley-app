import styled from "styled-components";
import { useField } from "formik";

const FormTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <ErrorContainer>
        <ErrorBox>
          {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
        </ErrorBox>
        <input {...field} {...props} />
      </ErrorContainer>
    </>
  );
};

const FormDropDown = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <ErrorContainer>
        <ErrorBox>
          {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
        </ErrorBox>
        <select {...field} {...props} />
      </ErrorContainer>
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
    </>
  );
};

const FormDatePicker = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const minDate = new Date().toISOString().split("T")[0];
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <ErrorContainer>
        <ErrorBox>
          {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
        </ErrorBox>
        <input {...field} {...props} type="date" min={minDate} />
      </ErrorContainer>
    </>
  );
};

const FormTextArea = ({ label, ...props }) => {
  const [field] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea className="form-text-area" {...field} {...props} />
    </>
  );
};

const FormTimePicker = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <ErrorContainer>
        <ErrorBox>
          {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
        </ErrorBox>
        <input type="time" {...field} {...props} />
      </ErrorContainer>
    </>
  );
};

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
`;

const ErrorBox = styled.div`
  height: 1.5rem;
  margin-top: -1.5rem;
`;

const Error = styled.div`
  color: red;
  margin-right: 1rem;
`;

const RadioContainer = styled.div`
  overflow: hidden;
  flex: 2;
  padding: 0.5rem;

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

export {
  FormTextInput,
  FormDropDown,
  FormDatePicker,
  FormTimePicker,
  FormToggle,
  FormTextArea,
};
