import styles from "./page.module.css";

import GeoCentroid from "../components/geo/GeoCentroid";
import WorldMap from "../components/geo/WorldMap/WorldMap";
import LatitudeLine from "../components/geo/LatitudeLine";
import LongitudeLine from "../components/geo/LongitudeLine";
import CoordinateListForm from "../components/CoordinateListForm/CoordinateListForm";


const mock_data = {
    "centroid": { "lat": 37.3825, "lng": -96.1248 },
    "bounds": {
        "north": 40.7128,
        "south": 34.0522*0,
        "east": -74.0060,
        "west": -118.2437
    }
}


export default function Home() {
    const { centroid, bounds } = mock_data

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <CoordinateListForm />
                <div className={styles.geomap_container}>
                    <WorldMap>
                        {bounds && (
                            <>
                                <LatitudeLine lat={bounds.north} annotation={`Lat=${bounds.north}°`} />
                                <LatitudeLine lat={bounds.south} annotation={`Lat=${bounds.south}°`} />
                                <LongitudeLine lng={bounds.east} annotation={`Lng=${bounds.east}°`} />
                                <LongitudeLine lng={bounds.west} annotation={`Lng=${bounds.west}°`} />
                            </>
                        )}
                        {centroid && (<GeoCentroid coordinates={centroid} annotation={`[${centroid.lat}°, ${centroid.lng}°]`} />)}
                    </WorldMap>
                </div>
            </main>
        </div>
    );
}
