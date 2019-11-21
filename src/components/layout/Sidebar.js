/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaHamburger, FaHome, FaSatellite, FaAddressBook, FaCaretRight, FaFile } from 'react-icons/fa';
import { Logo } from '@/components/layout/Logo';

const SidebarWrapper = styled.div`
  position: relative;
`;

const SidebarMainContainer = styled.div(({ expanded }) => `
  height: 100%;
  min-height: 100vh;
  @media (max-width: 1024px){
    position: absolute;
    top: 0;
    left: 0;
    ${expanded ? `
      width: 100%;
      min-width: 100vh;
    `: ''}
  }
`);

const SidebarContainer = styled.div(({ expanded }) => `
  background-color: #363740;
  width: 255px;
  padding-top: 32px;
  height: 100%;
  @media (max-width: 1024px){
    transition: left 0.5s, right 0.5s;
    position: absolute;
    width: 255px;
    z-index: 901;
    ${expanded ? 'left: 0' : 'left: -255px'}
  }
`);

const MenuWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-top: 52px !important;
`;

const MenuItem = styled.div(({ active }) => `

  cursor: pointer;
  transition: all .5s ease;
  :hover {
    background-color: rgba(221, 226, 255, 0.08);
  }
  ${active ? 'color: #fff;' : 'color: #b9b9b9;'}
  ${active ? 'background-color: #4a4c58;' : ''}
  a {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    height: 56px;
    padding-left: 32px;
    padding-right: 32px;
    transition: all .5s ease;
    ${active ? 'color: #fff;' : 'color: #b9b9b9;'}
    .caret {
      transition: all .5s ease;
      ${active ? 'transform: rotate(90deg);' : 'transform: rotate(0);'}
    }
  }
`);

const MenuItemWrapper = styled.div`

`;

const MenuItemText = styled.span`
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.2px;
  margin-left: 24px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const DropdownMenu = styled.ul(({ open }) => `
  overflow: hidden;
  transition: all .5s ease;
  list-style: none;
  margin: 0;
  padding: 0;
  background-color: #4a4b58;
  
  ${open ? 'max-height: 400px; border-top: 1px solid #636473;' : 'max-height: 0;border-top: 1px solid #363740;'}
`);

const DropdownMenuItem = styled.li(({ active }) => `
  transition: all .5s ease;
  :hover {
    background-color: rgba(221, 226, 255, 0.08);
  }
  ${active ? 'color: #fff;' : 'color: #b9b9b9;'}
  ${active ? 'background-color: #4a4c58;' : ''}
  a {
    padding: 12px 0 12px 72px;
    transition: all .5s ease;
    ${active ? 'color: #fff;' : 'color: #b9b9b9;'}
  }
`);

const Burger = styled.div`
  cursor: pointer;
  position: absolute;
  top: 19px;
  left: 15px;
  font-size: 18px;
`;

const Overlay = styled.div`
  position: absolute;
  width: 100vw;
  min-width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.50);
  z-index: 900;
`;

const menuItems = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: <FaHome size="20px" />,
  },
  {
    key: 'select',
    label: 'Select',
    path: '/select',
    icon: <FaSatellite size="20px" />,
  },
  {
    key: 'text-inputs',
    label: 'Text Inputs',
    icon: <FaAddressBook size="20px" />,
    subItems: [
      {
        key: 'text',
        label: 'Text',
        path: '/text',
      }
    ]
  },
  {
    key: 'file-inputs',
    label: 'File Inputs',
    icon: <FaFile size="20px" />,
    subItems: [
      {
        key: 'file',
        label: 'File',
        path: '/file',
      }
    ]
  }
]

const Sidebar = ({ currentPath }) => {
  const [expanded, setExpanded] = useState(false);
  const [currentParentItem, setCurrentParentItem] = useState();
  const isMobile = () => window.outerWidth <= 1024;
  const toggleMenu = () => {
    setExpanded(!expanded);
  }

  const renderBurger = () => {
    return <Burger onClick={toggleMenu}>
      <FaHamburger />
    </Burger>
  }

  const renderMenu = () => {
    return menuItems.map(item => {
      if (item.subItems) {
        const subPaths = item.subItems.map(subItem => subItem.path);
        return (
          <MenuItemWrapper key={item.key}>
            <MenuItem
              active={subPaths.includes(currentPath) || currentParentItem === item.label}
              onClick={() => setCurrentParentItem(item.label)}
            >
              <Link>
                {item.icon}
                <MenuItemText>
                  {item.label}
                  <FaCaretRight className="caret" />
                </MenuItemText>
              </Link>
            </MenuItem>
            <DropdownMenu open={subPaths.includes(currentPath) || currentParentItem === item.label}>
              {
                item.subItems.map(subItem => (
                  <DropdownMenuItem
                    key={subItem.key}
                    active={currentPath === subItem.path}
                    onClick={() => {
                      setExpanded(false);
                    }}
                  >
                    <Link to={subItem.path}>
                      {subItem.label}
                    </Link>
                  </DropdownMenuItem>
                ))
              }
            </DropdownMenu>
          </MenuItemWrapper>
        )
      }
      return (
        <MenuItem
          key={item.key}
          active={currentPath === item.path}
          onClick={() => {
            setCurrentParentItem(null);
            setExpanded(false);
          }}
        >
          <Link to={item.path}>
            {item.icon}
            <MenuItemText>
              {item.label}
            </MenuItemText>
          </Link>
        </MenuItem>
      )
    })
  }
  return (
    <SidebarWrapper>
      <SidebarMainContainer expanded={expanded}>
        {(isMobile() && !expanded) && renderBurger()}
        <SidebarContainer expanded={expanded}>
          <Logo src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png" text="React" />
          <MenuWrapper>
            {renderMenu()}
          </MenuWrapper>
        </SidebarContainer>
        {isMobile() && expanded && <Overlay onClick={toggleMenu} />}
      </SidebarMainContainer>
    </SidebarWrapper >
  )
}

export { Sidebar };