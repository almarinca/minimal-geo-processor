"use client";
import {
    Annotation,
    Marker,
} from "react-simple-maps"

export default function GeoCentroid({ coordinates, annotation}) {

    return (
        <>
            <Marker coordinates={[coordinates.lng, coordinates.lat]}>
                <circle r={4} fill="#F53" />
            </Marker>
            <Annotation
                subject={[coordinates.lng, coordinates.lat]}
                dx={5}
                dy={15}
                connectorProps={{
                    strokeWidth: 0,
                }}
            >
                <text fill="#AAA" fontSize={"10px"}>
                    {annotation}
                </text>
            </Annotation>
        </>
    )
}