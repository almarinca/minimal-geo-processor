import styles from './component.module.css';

export function FormInstructions() {
    return (
        <div className={styles.instructions}>
            <h2>📍 Enter Coordinates to Visualize a Summary of them</h2>
            <ul>
                <li>Add one or more points using <strong>latitude</strong> and <strong>longitude</strong>.</li>
                <li>Click <strong>“Add Point”</strong> to add more points.</li>
                <li>Click <strong>“X”</strong> to remove a point.</li>
                <li>Press <strong>“Compute”</strong> to display results on the map.</li>
                <li>Use <strong>“Reset”</strong> to clear all inputs and start over.</li>
            </ul>
        </div>
    )
}

