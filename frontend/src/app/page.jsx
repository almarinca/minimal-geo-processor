"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

import GeoCentroid from "../components/geo/GeoCentroid";
import WorldMap from "../components/geo/WorldMap/WorldMap";
import LatitudeLine from "../components/geo/LatitudeLine";
import LongitudeLine from "../components/geo/LongitudeLine";
import CoordinateListForm from "../components/CoordinateListForm/CoordinateListForm";
import { useGeoSummary } from "@/hooks/useGeoSummary";
import { FormInstructions } from "@/components/FormInstructions/FormInstructions";


export default function Home() {
    const [isClient, setIsClient] = useState(false);
    const {
        mutate: mutateGeoSummary,
        data: geoData,
        isPending: loadingGeoSummary,
        error,
        reset: resetGeoSummary,
    } = useGeoSummary();

    useEffect(() => {
        setIsClient(true);
    }, []);

    function submitGeoPoints(pointList) {
        const data = {
            points: pointList
        }
        mutateGeoSummary(data)
    }

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div className={styles.form_container}>
                    <div className={styles.instructions}>
                        <FormInstructions />
                    </div>
                    <CoordinateListForm
                        onSubmit={submitGeoPoints}
                        onReset={resetGeoSummary}
                    />
                </div>
                <div className={styles.geomap_container}>
                    {!!error && (
                        <h1>{error.message}</h1>
                    )}
                    {/* Conditionally render map to prevent server-client mismatch warnings */}
                    {!error && isClient && (
                        <WorldMap>
                            {(!loadingGeoSummary && geoData?.bounds) && (
                                <>
                                    <LatitudeLine lat={geoData.bounds.north} annotation={`Lat=${geoData.bounds.north}°`} />
                                    <LatitudeLine lat={geoData.bounds.south} annotation={`Lat=${geoData.bounds.south}°`} />
                                    <LongitudeLine lng={geoData.bounds.east} annotation={`Lng=${geoData.bounds.east}°`} />
                                    <LongitudeLine lng={geoData.bounds.west} annotation={`Lng=${geoData.bounds.west}°`} />
                                </>
                            )}
                            {(!loadingGeoSummary && geoData?.centroid) && (
                                <GeoCentroid coordinates={geoData.centroid} annotation={`[${geoData.centroid.lat}°, ${geoData.centroid.lng}°]`} />
                            )}
                        </WorldMap>
                    )}
                </div>
            </main>
        </div>
    );
}
