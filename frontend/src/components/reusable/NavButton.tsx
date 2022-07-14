import React from "react";

import styled from "styled-components";

interface Props {
  onClick: () => void;
  children?: React.ReactNode;
  color: string;
}

const Wrapper = styled.button`
  padding: 1rem;
  color: white;
  font-size: 1.4rem;
  border: none;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    cursor: pointer;
    filter: brightness(90%);
  }
`;

const NavButton: React.FC<Props> = ({ onClick, children, color }) => {
  return (
    <Wrapper onClick={onClick} style={{ backgroundColor: color }}>
      {children}
    </Wrapper>
  );
};

export default NavButton;
