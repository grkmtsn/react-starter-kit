import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { authenticationService } from '@/services';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';

const AppWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  height: 100% !important;
  min-height: 100vh !important;
  @media (max-width: 1024px){
    overflow-x: hidden;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  padding: 0 30px 30px;
  background-color: aliceblue;
  @media (max-width: 1024px){
    padding: 10px;
    overflow-x: hidden;
  }
`;

const Content = styled.div`
  margin-top: 30px;
  @media (max-width: 1024px){
    margin-top: 25px;
  }
`

class PageLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPath: '',
      currentUser: null,
    };

    props.history.listen(location => {
      this.setState({
        currentPath: location.pathname,
      });
    });
  }

  componentDidMount() {
    const { history } = this.props;
    const { pathname } = history.location;
    this.setState({
      currentPath: pathname,
    });
    authenticationService.currentUser.subscribe(x =>
      this.setState({
        currentUser: x,
      }),
    );
  }

  logout = () => {
    const { history } = this.props;
    authenticationService.logout();
    history.push('/login');
  };

  render() {
    const { currentPath, currentUser } = this.state;
    const { children } = this.props;
    return (
      <AppWrapper>
        <Sidebar currentPath={currentPath} setPageTitle={this.setPageTitle} />
        <ContentWrapper>
          <Header title="KG React Boilerplate" user="KG Teknoloji" />
          <Content>
            {children}
          </Content>
        </ContentWrapper>
      </AppWrapper>
    );
  }
}

const PageLayoutWithRouter = withRouter(PageLayout);

export { PageLayoutWithRouter };
