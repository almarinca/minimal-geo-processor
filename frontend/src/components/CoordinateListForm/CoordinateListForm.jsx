"use client"
import styles from "./component.module.css";
import { useState } from "react"

export default function CoordinateListForm(props) {
    const [pointList, setPointList] = useState([{...initial_point}])

    function onSubmit(event) {
        event.preventDefault()
    }

    function resetPoints(event) {
        event.preventDefault()
        setPointList([{...initial_point}])
    }

    function addNewPoint(pointList) {
        const newPointList = [...pointList]
        newPointList.push({...initial_point})
        setPointList(newPointList)
    }

    function updatePoint(idx, lat, lng) {
        if (
            Number(lat) < -90 || Number(lat) > 90 ||
            Number(lng) < -180 || Number(lng) > 180
        ) return
        const newPointList = [...pointList]
        newPointList[idx].lat = lat
        newPointList[idx].lng = lng
        setPointList(newPointList)
    }

    function onClickInCoordinate(event) {
        event.target.select();
    }

    function onClickOutCoordinate(idx, lat, lng) {
        const newPointList = [...pointList]
        newPointList[idx].lat = Number(lat).toFixed(4)
        newPointList[idx].lng = Number(lng).toFixed(4)
        setPointList(newPointList)
    }

    return (
        <form className={styles.coordinates_form} onSubmit={onSubmit} onReset={resetPoints}>
            <div className={styles.point_input_list}>
                <ul>
                    {pointList.map((point, idx) => (
                        <li
                            key={idx}
                        >
                            <label>Lat:</label>
                            <input
                                type="number"
                                min="-90"
                                max="90"
                                step="any"
                                value={point.lat}
                                onChange={(e) => updatePoint(idx, e.target.value, point.lng)}
                                onBlur={() => onClickOutCoordinate(idx, point.lat, point.lng)}
                                onFocus={onClickInCoordinate}
                            />
                            <label>Lng:</label>
                            <input
                                type="number"
                                min="-180"
                                max="180"
                                step="any"
                                value={point.lng}
                                onChange={(e) => updatePoint(idx, point.lat, e.target.value)}
                                onBlur={() => onClickOutCoordinate(idx, point.lat, point.lng)}
                                onFocus={onClickInCoordinate}
                            />
                        </li>
                    ))}
                </ul>
                <button type="button" onClick={() => addNewPoint(pointList)}>add point</button>
            </div>
            <div className={styles.form_buttons}>
                <button type="submit">Compute</button>
                <button type="reset">Reset</button>
            </div>
        </form>
    )
}

const initial_point = { lat: "0.0000", lng: "0.0000" }