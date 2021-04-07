import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Burger, Menu } from "../components/BurgerMenu";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import AppLogo from "../assets/logo.png";

const Header = () => {
  const [open, setOpen] = useState(false);
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));

  return (
    <Container>
      <Link to="/home">
        <Logo src={AppLogo} alt="Logo" />
      </Link>
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
  justify-content: flex-start;
  align-items: center;
  position: relative;
  grid-row: 1;
  margin-left: ${(props) => props.theme.margins.small};
  @media only screen and (min-width: ${(props) =>
      props.theme.mediaQuery.tabletWidth}) {
    margin-right: ${(props) => props.theme.margins.large};
    margin-left: ${(props) => props.theme.margins.large};
  }
`;

const Logo = styled.img`
  height: 3.5rem;
  width: 100%;
`;
