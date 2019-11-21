import React from 'react'
import styled from 'styled-components';

const LogoWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-left: 32px;
  margin-right: 32px;
`
const LogoImage = styled.img`
  width: 32px;
`;

const LogoText = styled.span`
font-style: normal;
font-weight: bold;
font-size: 19px;
line-height: 24px;
letter-spacing: 0.4px;
color: rgb(164, 166, 179);
opacity: 0.7;
margin-left: 12px;
`;

const Logo = ({ src, text }) => {
  return (
    <LogoWrapper>
      <LogoImage src={src} alt="Logo" />
      <LogoText>
        {text}
      </LogoText>
    </LogoWrapper>
  )
}

export { Logo };