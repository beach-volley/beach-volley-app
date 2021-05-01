import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Burger, Menu } from "../components/BurgerMenu";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import AppLogo from "../assets/logo.png";
import useCurrentUser from "../hooks/useCurrentUser";

const Header = () => {
  const [open, setOpen] = useState(false);
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));
  const currentUser = useCurrentUser();

  return (
    <Container>
      <ColumnContainer>
        <Link to="/home">
          <Logo src={AppLogo} alt="Logo" />
        </Link>
        {currentUser?.displayName && <p> Hei, {currentUser?.displayName}</p>}
      </ColumnContainer>
      <div ref={node}>
        <Burger open={open} setOpen={setOpen} />
        <Menu open={open} setOpen={setOpen} />
      </div>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  grid-row: 1;
  margin-left: 0.5rem;
  @media only screen and (min-width: ${(props) =>
      props.theme.mediaQuery.tabletWidth}) {
    margin-left: ${(props) => props.theme.margins.large};
  }
`;

const ColumnContainer = styled.div`
  margin: 2.8rem 0 0 0.5rem;
`;

const Logo = styled.img`
  height: 3rem;
  max-width: 100%;
`;
