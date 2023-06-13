import React from "react";
import store from "./store";
import Map from "./components/Map";
import { Provider } from "react-redux";
import { Layout, Row, Col } from "antd";
import SearchForm from "./components/SearchForm";
import { GoogleOutlined } from "@ant-design/icons";

const App: React.FC = () => {
  const { Content, Header } = Layout;

  const headerStyle: React.CSSProperties = {
    textAlign: "center",
    color: "#fff",
    height: 64,
    paddingInline: 50,
    lineHeight: "64px",
    backgroundColor: "#7dbcea",
  };
  return (
    <Provider store={store}>
      <div className="App">
        <Layout>
          <Header style={headerStyle}>
            <h1>
              <GoogleOutlined />
              oogle Places
            </h1>
          </Header>
          <Content>
            <Map />
            <Row>
              <Col span={16} offset={4}>
                <SearchForm />
              </Col>
              <Col span={4}></Col>
            </Row>
          </Content>
        </Layout>
      </div>
    </Provider>
  );
};

export default App;
