import {
  PushpinOutlined,
  HistoryOutlined,
  ClearOutlined,
} from "@ant-design/icons";
import { RootState } from "../store";
import React, { useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import Geosuggest, { Suggest } from "react-geosuggest";
import { selectSuggestion, clearHistory } from "../actions/placesActions";
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
  const reOpenPrevSelected = (id: number) => {
    dispatch(selectSuggestion(history[id]));
    setOpen(false);
  };
  const clearAllHistory = () => {
    handlePlaceClear();
    setOpen(false);
    dispatch(clearHistory());
  };
  const onClose = () => {
    setOpen(false);
  };
  const handlePlaceClear = () => {
    if (geosuggestEl.current !== null) {
      geosuggestEl.current.clear();
      geosuggestEl.current.focus();
      dispatch(selectSuggestion(null));
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
                onClick={clearAllHistory}
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
              <List.Item onClick={() => reOpenPrevSelected(index)}>
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
const mapStateToProps = (state: RootState) => ({
  selectedSuggestion: state.place.selectedSuggestion,
  history: state.place.history,
});

const mapDispatchToProps = {
  selectSuggestion,
  clearHistory,
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
