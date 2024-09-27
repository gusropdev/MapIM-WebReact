import React, { useState, useEffect } from 'react';
import { UncontrolledReactSVGPanZoom } from 'react-svg-pan-zoom';
import '../styles/FloorMap.css';

const FloorMap = () => {
    const [viewer, setViewer] = useState(null);
    const [currentFloor, setCurrentFloor] = useState("1-andar");
    const [zoomValue, setZoomValue] = useState(1);

    useEffect(() => {
        if (viewer) {
            viewer.fitToViewer();
        }
    }, [viewer, currentFloor]);

    const handleFloorChange = (floor) => {
        setCurrentFloor(floor);
    };

    return (
        <div className="mapa-container">
            <div className="navigation-buttons">
                <button onClick={() => handleFloorChange("1-andar")}>1</button>
                <button onClick={() => handleFloorChange("2-andar")}>2</button>
                <button onClick={() => handleFloorChange("3-andar")}>3</button>
            </div>
            <h1>{currentFloor === "1-andar" ? "1º Andar" : currentFloor === "2-andar" ? "2º Andar" : "3º Andar"}</h1>
            <UncontrolledReactSVGPanZoom
                width={1000}
                height={window.innerHeight}
                ref={setViewer}
                tool="auto"
                background="#fff"
                detectAutoPan={false}
                miniatureProps={{ position: 'none' }}
                toolbarProps={{ position: 'none' }}
                onChangeValue={setZoomValue}
                scaleFactorMin={0.7}
                scaleFactorMax={4.5}
            >
                <svg width={1000} height={1000}>
                    <image href={`${currentFloor}.svg`} width={1000} height={1000} /> {/* Carrega o SVG do andar atual */}
                </svg>
            </UncontrolledReactSVGPanZoom>
        </div>
    );
};

export default FloorMap;