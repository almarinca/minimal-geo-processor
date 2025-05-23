"use client";
import styles from "./component.module.css";
import {
    ComposableMap,
    Geographies,
    Geography,
    Graticule,
    Sphere,
} from "react-simple-maps"

const geoUrl =
    "/world_map.json"

export default function WorldMap({ children }) {

    return (
        <div className={styles.map_container}>
            <ComposableMap className={styles.map_chart}>
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
        </div>
    )
}