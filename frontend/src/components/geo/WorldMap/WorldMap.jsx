"use client";
import styles from "./component.module.css";
import {
    ComposableMap,
    Geographies,
    Geography,
    Graticule,
    Sphere,
} from "react-simple-maps"
import { geoEqualEarth } from "d3-geo";
import { useState } from "react";

const geoUrl =
    "/world_map.json"

export default function WorldMap({ children }) {
    const [coords, setCoords] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const projection = geoEqualEarth().scale(175).translate([400,300]);

    const handleMouseMove = (evt) => {
        const { clientX, clientY } = evt;
        const { left, top } = evt.currentTarget.getBoundingClientRect();
        const x = clientX - left;
        const y = clientY - top;
        const [lng, lat] = projection.invert([x, y]) || [null, null];

        setMousePos({ x, y });
        setCoords({ lat, lng });
    };

    return (
        <div
            className={styles.map_container}
            onMouseMove={handleMouseMove}
        >
            <ComposableMap
                className={styles.map_chart}
            >
                <Sphere stroke={"#2c3640"} />
                <Graticule stroke={"#2c3640"} />
                <Geographies
                    geography={geoUrl}
                    stroke={"#566270"}
                    strokeWidth={0.5}
                >
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill={"#3a4a5a"}
                                style={{
                                    default: { outline: "none" },
                                    hover: { outline: "none" },
                                    pressed: { outline: "none" },
                                }}
                                onClick={() => console.log(geo.properties.name)}
                            />
                        ))
                    }
                </Geographies>
                {children}
            </ComposableMap>

            {coords && (
                <div
                    className={styles.coordinates_cursor}
                    style={{
                        top: mousePos.y + 10,
                        left: mousePos.x + 10,
                    }}
                >
                    {`Lat: ${coords.lat.toFixed(2)}, Lng: ${coords.lng.toFixed(2)}`}
                </div>
            )}
        </div>
    )
}
