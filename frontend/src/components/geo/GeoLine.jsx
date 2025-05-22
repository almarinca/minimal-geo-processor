"use client";
import {
    Annotation,
    Line,
} from "react-simple-maps"

export default function GeoLine({
    generateCoordinates,
    annotation,
    annotationCoordinate,
    annotationOffset
}) {

    return (
        <>
            <Annotation
                subject={annotationCoordinate}
                dx={annotationOffset.dx}
                dy={annotationOffset.dy}
                connectorProps={{
                    strokeWidth: 0,
                }}
            >
                <text fill="#AAA" fontSize={"10px"}>
                    {annotation}
                </text>
            </Annotation>
            <Line
                coordinates={generateCoordinates()}
                stroke="#776865"
                strokeWidth={2}
                strokeDasharray={[5, 5]}
            />
        </>
    )
}