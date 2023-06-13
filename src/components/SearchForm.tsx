import {
  PushpinOutlined,
  HistoryOutlined,
  ClearOutlined,
} from "@ant-design/icons";
import React, { useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import Geosuggest, { Suggest } from "react-geosuggest";
import { selectSuggestion } from "../actions/placesActions";
import { Button, Drawer, Col, Row, List, FloatButton, Space } from "antd";

interface Props {
  history: Suggest[];
}
const SearchForm: React.FC<Props> = ({ history }) => {
  const dispatch = useDispatch();
  const geosuggestEl = useRef<Geosuggest>(null);
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const showDrawer2 = (id: number) => {
    dispatch(selectSuggestion(history[id]));
    setOpen(false);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handlePlaceClear = () => {
    if (geosuggestEl.current !== null) {
      geosuggestEl.current.clear();
    }
  };
  return (
    <div>
      <br />
      <Row>
        <Col span={22}>
          <Geosuggest
            ref={geosuggestEl}
            fixtures={[]}
            style={{
              input: {
                height: 30,
                width: "99%",
                borderRadius: 5,
                borderWidth: 1,
                padding: 3,
                paddingLeft: 10,
              },
              suggests: {
                padding: 0,
                maxWidth: 400,
                listStyleType: "none",
              },
            }}
            renderSuggestItem={(i) => {
              return (
                <Button style={{ marginTop: 2 }}>
                  <PushpinOutlined />
                  <span style={{ paddingRight: 2 }}>{i.description}</span>
                </Button>
              );
            }}
            country="MY"
            onSuggestSelect={(e) => {
              if (e) {
                dispatch(selectSuggestion(e));
              }
            }}
          />
        </Col>
        <Col span={2}>
          <Button
            type="dashed"
            shape="round"
            icon={<ClearOutlined />}
            size={"middle"}
            onClick={handlePlaceClear}
          >
            Clear
          </Button>
        </Col>
      </Row>
      <div>
        <FloatButton
          type="default"
          icon={<HistoryOutlined />}
          onClick={showDrawer}
          tooltip={<div>History</div>}
          shape="square"
        />
        <Drawer
          title="History"
          placement="right"
          onClose={onClose}
          open={open}
          extra={
            <Space>
              <Button
                type="primary"
                onClick={showDrawer}
                shape="round"
                icon={<ClearOutlined />}
                size={"middle"}
              >
                Clear History
              </Button>
            </Space>
          }
        >
          <List
            itemLayout="horizontal"
            dataSource={history}
            renderItem={(item, index) => (
              <List.Item onClick={() => showDrawer2(index)}>
                <List.Item.Meta
                  description={item?.gmaps?.formatted_address}
                  title={item.label}
                />
              </List.Item>
            )}
          />
        </Drawer>
      </div>
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  selectedSuggestion: state.place.selectedSuggestion,
  history: state.place.history,
});

const mapDispatchToProps = {
  selectSuggestion,
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
