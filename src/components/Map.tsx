import React from "react";
import { Typography } from "antd";
import { Card, Space } from "antd";
import { connect } from "react-redux";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { API_KEY } from "../config";

const Map: React.FC = (props: any) => {
  const { Title } = Typography;
  const containerStyle = {
    width: "100%",
    height: "400px",
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY ?? "",
  });
  const title = props?.selectedSuggestion?.description ?? "";
  const location = props?.selectedSuggestion?.location
    ? props?.selectedSuggestion?.location
    : {
        lat: 3.1472817340189754,
        lng: 101.69953420863247,
      };
  return (
    <>
      {isLoaded ? (
        <Card bordered={false} style={{ width: "100%" }}>
          <Space
            direction="horizontal"
            style={{ width: "100%", justifyContent: "center" }}
          >
            <Title level={4}> {title}</Title>
          </Space>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={location}
            zoom={10}
          ></GoogleMap>
        </Card>
      ) : (
        <></>
      )}
    </>
  );
};
const mapStateToProps = (state: any) => ({
  selectedSuggestion: state.place.selectedSuggestion,
});

export default connect(mapStateToProps)(Map);
