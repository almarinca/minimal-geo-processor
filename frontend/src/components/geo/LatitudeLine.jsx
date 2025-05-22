"use client";
import GeoLine from "./GeoLine";

export default function LatitudeLine({ lat, annotation }) {

    // get random longitude in range
    const longitudes = [-160, 110];
    const lng = longitudes[Math.floor(Math.random() * longitudes.length)];
    
    const drawLatitude = lat => {
        if (!lat)
            return [[-180, 0], [-90, 0], [0, 0], [90, 0], [180, 0]];
        return new Array(361).fill().map((_, i) => [-180 + i, lat])
    }

    return (
        <GeoLine
            generateCoordinates={() => drawLatitude(lat)}
            annotation={annotation}
            annotationCoordinate={[lng, lat]}
            annotationOffset={{ dx: 40, dy: 15 }}
        />
    )
}