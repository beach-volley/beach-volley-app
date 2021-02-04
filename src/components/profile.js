import React from "react";
import styled from "styled-components";
import StyledButton from "../components/styledbutton";

const Profile = () => {
  return (
    <ProfileBox>
        <StyledButton text={'Create Game'}/>
        <h1>ICON</h1>
    </ProfileBox>
  );
};

export default Profile;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  h1 {
      margin-left: 1rem;
  }
`;
