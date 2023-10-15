import { createContext, useContext, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { HiEllipsisVertical } from "react-icons/hi2";
import useOutsideClick from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: absolute;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-grey-200);

  right: -10px;
  top: calc(100% + 5px);
  z-index: 99;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

Menus.propTypes = {
  children: PropTypes.any,
};

function Menus({ children }) {
  const [openMenu, setOpenMenu] = useState(null);

  return <MenusContext.Provider value={{ openMenu, setOpenMenu }}>{children}</MenusContext.Provider>;
}

Toggle.propTypes = {
  id: PropTypes.any,
};

function Toggle({ id }) {
  const { openMenu, setOpenMenu } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();
    id !== openMenu ? setOpenMenu(id) : setOpenMenu(null);
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

List.propTypes = {
  children: PropTypes.any,
  id: PropTypes.any,
};

function List({ id, children }) {
  const { openMenu, setOpenMenu } = useContext(MenusContext);
  const ref = useOutsideClick(() => setOpenMenu(null), false);

  if (id !== openMenu) return null;

  return <StyledList ref={ref}>{children}</StyledList>;
}

Button.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func,
};

function Button({ onClick, children }) {
  const { setOpenMenu } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    setOpenMenu(null);
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>{children}</StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
