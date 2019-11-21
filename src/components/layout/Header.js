import React from 'react'
import styled from 'styled-components';
import { FaSearch, FaBell } from 'react-icons/fa';

const HeaderRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  height: 56px!important;
  margin: 0 -30px;
  padding: 0 30px;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 24px;
  line-height: 30px;
  letter-spacing: 0.3px;
  @media (max-width: 1024px){
    margin-left: 36px;
  }
  @media (max-width: 468px){
    font-size: 20px;
  }
`

const Actions = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

const Icon = styled.div`
  cursor: pointer;
  margin-left: 25px;
  @media (max-width: 468px){
    margin-left: 12px;
  }
`;

const Seperator = styled.div`
  margin-left: 32px;
  margin-right: 32px;
  height: 32px !important;
  width: 2px !important;
  border-left: 1px solid rgb(223, 224, 235) !important;
  @media (max-width: 468px){
    margin-left: 12px;
    margin-right: 12px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

const Username = styled.span`
  font-style: normal,
  font-weight: 600,
  font-size: 14px,
  line-height: 20px,
  text-align: right,
  letter-spacing: 0.2px,
`;

const Avatar = styled.img`
  height: 35px !important;
  width: 35px !important;
  margin-left: 14px !important;
  cursor: pointer !important;
  border-radius: 50px !important;
  border-width: 1px !important;
  border-style: solid !important;
  border-color: rgb(223, 224, 235) !important;
  border-image: initial !important;
`;

const Header = ({ title, user }) => {
  return (
    <HeaderRow>
      <Title>
        {title}
      </Title>
      <Actions>
        <Icon>
          <FaSearch />
        </Icon>
        <Icon>
          <FaBell />
        </Icon>
        <Seperator />
        <UserInfo>
          <Username>{user}</Username>
          <Avatar src="https://avatars3.githubusercontent.com/u/21162888?s=460&amp;v=4" alt="avatar" />
        </UserInfo>
      </Actions>
    </HeaderRow>
  )
}

export { Header };