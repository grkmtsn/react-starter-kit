import React from 'react'
import styled from 'styled-components';
import tw from 'tailwind.macro';

const PanelWrapper = styled.div`
  ${tw`rounded shadow-lg p-5 bg-white`}
`

const PanelTitle = styled.h2`
  margin-top:0;
`

const PanelBody = styled.div`
`

const Panel = ({ title, children }) => {
  return (
    <PanelWrapper>
      <PanelTitle>
        {title}
      </PanelTitle>
      <PanelBody>
        {children}
      </PanelBody>
    </PanelWrapper>
  )
}

export { Panel };