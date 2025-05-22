"use client";
import GeoLine from "./GeoLine";

export default function LongitudeLine({ lng, annotation }) {

    // get random longitude in range
    const latitudes = [-90, -70, 70, 90];
    const lat = latitudes[Math.floor(Math.random() * latitudes.length)];

    const drawLongitude = lng => {
        return [[lng, -180], [lng, -90], [lng, 0], [lng, 90], [lng, 180]];
    }

    return (
        <GeoLine
            generateCoordinates={() => drawLongitude(lng)}
            annotation={annotation}
            annotationCoordinate={[lng, lat]}
            annotationOffset={{ dx: 10, dy: 0 }}
        />
    )
}