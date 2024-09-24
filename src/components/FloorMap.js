import React, { useState, useEffect } from 'react';
import { UncontrolledReactSVGPanZoom } from 'react-svg-pan-zoom';
import '../styles/FloorMap.css';

const FloorMap = () => {
    const [viewer, setViewer] = useState(null);
    const [currentFloor, setCurrentFloor] = useState("1-andar"); // Estado para o andar atual
    const [zoomValue, setZoomValue] = useState(1);

    useEffect(() => {
        if (viewer) {
            viewer.fitToViewer(); // Ajusta para caber na visualização
        }
    }, [viewer, currentFloor]);

    const handleFloorChange = (floor) => {
        setCurrentFloor(floor); // Atualiza o andar atual
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
                miniatureProps={{ position: 'none' }} // Remove o minimapa
                toolbarProps={{ position: 'none' }} // Remove a barra de ferramentas
                onChangeValue={setZoomValue} // Atualiza o zoom
                scaleFactorMin={0.7} // Define o zoom mínimo
                scaleFactorMax={4.5}   // Define o zoom máximo
            >
                <svg width={1000} height={1000}>
                    <image href={`${currentFloor}.svg`} width={1000} height={1000} /> {/* Carrega o SVG do andar atual */}
                </svg>
            </UncontrolledReactSVGPanZoom>
        </div>
    );
};

export default FloorMap;