import styled from "styled-components";
import { PageWrapper } from "../components/ComponentStyles";
import CenterContainer from "../containers/CenterContainer";

const LoadingComponent = () => {
    return (
        <>

   
          <LoadingContainer title="Ladataan..." />

        </>
      );
}


const LoadingContainer = styled(CenterContainer)`
  margin: auto;
`;

export default LoadingComponent;