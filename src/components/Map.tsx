import React from "react";
import {
  Marker,
  InfoBox,
  GoogleMap,
  TrafficLayer,
  useJsApiLoader,
  StreetViewService,
} from "@react-google-maps/api";
import { API_KEY } from "../config";
import { RootState } from "../store";
import { connect } from "react-redux";
import { Typography, Card, Space, Watermark } from "antd";

import {} from "@react-google-maps/api";

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
  const contentExist =
    props?.selectedSuggestion !== null &&
    props?.selectedSuggestion !== undefined;
  const location = props?.selectedSuggestion?.location
    ? props?.selectedSuggestion?.location
    : {
        lat: 3.1472817340189754,
        lng: 101.69953420863247,
      };
  const options = { closeBoxURL: "", enableEventPropagation: true };
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
          <Watermark content="Maybank-Technical-Assessment">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={location}
              zoom={contentExist ? 20 : 15}
            >
              {contentExist ? (
                <>
                  <Marker key="marker_1" position={location} />
                  <InfoBox options={options} position={location}>
                    <Card
                      bordered={false}
                      style={{ width: 300, opacity: 0.85 }}
                    >
                      <p>{title}</p>
                    </Card>
                  </InfoBox>
                  <TrafficLayer />
                  <StreetViewService />
                </>
              ) : null}
            </GoogleMap>
          </Watermark>
        </Card>
      ) : (
        <></>
      )}
    </>
  );
};
const mapStateToProps = (state: RootState) => ({
  selectedSuggestion: state.place.selectedSuggestion,
});

export default connect(mapStateToProps)(Map);
