import styled from "styled-components";

export const StyledButton = styled.button`
  background-color: ${(props) => props.theme.colors.gorse};
  padding: 0.35rem 1.2rem;
  border: 0.1rem solid black;
  height: 100%;
  border-radius: 0.1rem;
  cursor: pointer;
`;

export const StyledContainer = styled.div`
  background: rgb(${(props) => props.theme.colors.gulfBlueTransparent});
  border-radius: 0.25rem;
`;

export const PageWrapper = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-rows: 15vh auto;
  ${(props) => props.theme.backGroundImage()}
`;

//override material-ui css
export const InputRow = styled.div`
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

  /* .MuiSelect-nativeInput {
    display: none;
  } */

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

  .MuiAutocomplete-root {
    width: 100%;
    .MuiSvgIcon-root {
      display: none;
    }
`;
