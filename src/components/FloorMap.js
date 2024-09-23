import React, { useState, useEffect } from 'react';
import { UncontrolledReactSVGPanZoom } from 'react-svg-pan-zoom';
import '../styles/FloorMap.css';

const FloorMap = ({ initialFloor }) => { // Aceita a propriedade initialFloor
    const [viewer, setViewer] = useState(null);
    const [zoomValue, setZoomValue] = useState(1);

    useEffect(() => {
        if (viewer) {
            viewer.fitToViewer(); // Ajusta para caber na visualização
        }
    }, [viewer]);

    return (
        <div className="mapa-container">
            <h1>{initialFloor === "1-andar" ? "1º Andar" : "Outro Andar"}</h1>
            <UncontrolledReactSVGPanZoom
                width={800}
                height={600}
                ref={setViewer}
                tool="auto"
                background="#fff"
                detectAutoPan={false}
                onChangeValue={setZoomValue} // Atualiza o zoom
            >
                <svg width={1000} height={1000}>
                    <image href={`${initialFloor}.svg`} width={1000} height={1000} /> {/* Carrega o SVG do andar inicial */}
                </svg>
            </UncontrolledReactSVGPanZoom>
        </div>
    );
};

export default FloorMap;