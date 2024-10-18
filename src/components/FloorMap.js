import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import '../styles/FloorMap.css';

const FloorMap = () => {
    const [currentFloor, setCurrentFloor] = useState("1-andar");
    const [svgContent, setSvgContent] = useState('');
    const location = useLocation();
    const roomFloor = location.state?.roomFloor;
    const roomSlug = location.state?.roomSlug;
    const highlightRoom = location.state?.highlightRoom;

    useEffect(() => {
        if (roomFloor) {
            setCurrentFloor(roomFloor);
        }
    }, [roomFloor]);

    useEffect(() => {
        const fetchSvg = async () => {
            try {
                const response = await fetch(`/${currentFloor}.svg`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                let svgText = await response.text();

                if (highlightRoom && roomSlug) {
                    const highlightColor = 'green'; // Cor de destaque

                    // Função para substituir o estilo tanto em <rect> quanto em <path>
                    const replaceStyle = (match) => {
                        // Remove qualquer fill ou style existente
                        let newMatch = match.replace(/fill="[^"]*"/g, '')
                            .replace(/style="[^"]*"/g, '');

                        // Adiciona o novo estilo
                        if (newMatch.endsWith('/>')) {
                            // Para elementos sem conteúdo
                            newMatch = newMatch.replace(/\/>$/, ` style="fill:${highlightColor}" />`);
                        } else {
                            // Para elementos com conteúdo
                            newMatch = newMatch.replace(/>$/, ` style="fill:${highlightColor}">`);
                        }
                        return newMatch;
                    };

                    // Substitui para <rect> e <path>
                    svgText = svgText.replace(
                        new RegExp(`<(rect|path)[^>]*id="${roomSlug}"[^>]*>`, 'g'),
                        replaceStyle
                    );
                }

                // Ajuste as dimensões do SVG
                svgText = svgText.replace(/<svg[^>]*>/, '<svg width="100%" height="100%" viewBox="0 0 2480 3509">');

                setSvgContent(svgText);
            } catch (error) {
                console.error('Erro ao carregar o SVG:', error);
            }
        };

        fetchSvg();
    }, [currentFloor, highlightRoom, roomSlug]);

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
            {svgContent ? (
                <TransformWrapper
                    initialScale={1}
                    minScale={0.5}
                    maxScale={5}
                    wheelSensitivity={0.5}
                    limitToBounds={false}
                    centerOnInit={true}
                    initialPositionX={0}
                    initialPositionY={0}
                >
                    <TransformComponent
                        wrapperStyle={{
                            width: "100%",
                            height: "calc(100vh - 100px)", // Ajuste conforme necessário
                        }}
                    >
                        <div className="svg-container">
                            <div dangerouslySetInnerHTML={{ __html: svgContent }} />
                        </div>
                    </TransformComponent>
                </TransformWrapper>
            ) : (
                <p>Carregando mapa...</p>
            )}
        </div>
    );
};

export default FloorMap;
