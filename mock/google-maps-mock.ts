class MapMock {
    constructor(mapContainer: HTMLElement, options?: google.maps.MapOptions) { }
    setCenter(center: google.maps.LatLng | google.maps.LatLngLiteral): void { }
}
class LatLngMock {
    constructor(lat: number, lng: number) { }
}
const google = {
    maps: {
        Map: MapMock,
        LatLng: LatLngMock,
    },
};
export default google;
