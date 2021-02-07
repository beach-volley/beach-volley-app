import styled from "styled-components";
import { useField } from "formik";

const FormTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <InputContainer>
      <label htmlFor={props.id || props.name}>{label}</label>
      {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
      <input className="text-input" {...field} {...props} />
    </InputContainer>
  );
};

const FormDropDown = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <InputContainer>
      <label htmlFor={props.id || props.name}>{label}</label>
      {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
      <select {...field} {...props} />
    </InputContainer>
  );
};

const Error = styled.div`
    color: red;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    align-self: center;
}
`;

const InputContainer = styled.div`
    display: flex;
    margin-bottom: 2rem;
    label {
      margin-right: auto;
      align-self: center;
      color: white;
      font-size: ${(props) => props.theme.fontSizes.medium}
    }
    input, select {
      width: 50%;
    }

}
`;

export { FormTextInput, FormDropDown };
