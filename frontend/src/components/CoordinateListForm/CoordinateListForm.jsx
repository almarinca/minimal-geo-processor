"use client"
import styles from "./component.module.css";
import { useState } from "react"

export default function CoordinateListForm({ onSubmit, onReset }) {
    const [pointList, setPointList] = useState([{ ...initial_point }])

    function handleSubmit(event) {
        event.preventDefault()
        onSubmit(pointList)
    }

    function resetPoints(event) {
        event.preventDefault()
        setPointList([{ ...initial_point }])
        onReset()
    }

    function addNewPoint(pointList) {
        const newPointList = [...pointList]
        newPointList.push({ ...initial_point })
        setPointList(newPointList)
    }

    function updatePoint(idx, lat, lng) {
        if (
            Number(lat) < -90 || Number(lat) > 90 ||
            Number(lng) < -180 || Number(lng) > 180 ||
            lat === 'e' || lng === 'e' ||
            lat === 'E' || lng === 'E'
        ) return
        const newPointList = [...pointList]
        newPointList[idx].lat = lat
        newPointList[idx].lng = lng
        setPointList(newPointList)
    }

    function removePoint(idx) {
        const newPointList = pointList.filter((val, i) => {
            return i != idx
        })
        if (newPointList.length === 0) {
            newPointList.push({ ...initial_point })
        }
        setPointList(newPointList)
    }

    function onClickInCoordinate(event) {
        event.target.select();
    }

    function onClickOutCoordinate(idx, lat, lng) {
        const newPointList = [...pointList]
        newPointList[idx].lat = Number(Number(lat).toFixed(4))
        newPointList[idx].lng = Number(Number(lng).toFixed(4))
        setPointList(newPointList)
    }

    return (
        <form className={styles.coordinates_form} onSubmit={handleSubmit} onReset={resetPoints}>
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
                            <span
                                className={styles.remove_point_btn}
                                onClick={() => removePoint(idx)}
                            >❌</span>
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

const initial_point = { lat: 0, lng: 0 }