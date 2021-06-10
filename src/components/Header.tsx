import { Layout } from 'antd';
import Logo from '../Images/logo.png'
const { Header, Content, Footer } = Layout;

interface PropsHeader {
  children: React.ReactNode
}

const CompHeader = (props: PropsHeader) => {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo-app">
          <img src={Logo} alt="logo Fishery" /> <span>Fishery</span>
        </div>
      </Header>
      <Content className="layout-content">
        {props.children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>©2021 Created by eFishery</Footer>
    </Layout>
  )
}

export default CompHeader