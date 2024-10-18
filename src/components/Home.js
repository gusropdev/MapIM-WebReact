import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logoCompleto from '../assets/ufrrj-logo.png';
import '../styles/Home.css';

function Home() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleNavigation = () => {
        navigate('/mapa');
    };

    useEffect(() => {
        if (searchTerm.length >= 2) {
            fetchSuggestions();
        } else {
            setSuggestions([]);
        }
    }, [searchTerm]);

    const fetchSuggestions = async () => {
        try {
            const response = await fetch(`http://localhost:5096/api/search?query=${searchTerm}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            setSuggestions(data);
        } catch (error) {
            console.error('Erro ao buscar sugestões:', error);
            setSuggestions([]);
        }
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion.name);
        setSuggestions([]);
    };


    const handleSearch = async () => {
        if (searchTerm.trim() === '') return;

        try {
            const searchResponse = await fetch(`http://localhost:5096/api/search?query=${searchTerm}`);
            if (!searchResponse.ok) {
                throw new Error(`HTTP error! status: ${searchResponse.status}`);
            }
            const searchData = await searchResponse.json();

            if (searchData.length === 0) {
                console.error('Nenhum resultado encontrado');
                return;
            }

            const entity = searchData[0];
            console.log('Entidade encontrada:', entity);

            const detailsResponse = await fetch(`http://localhost:5096/api/search/details?entityId=${entity.id}&entityType=${entity.type}`);
            if (!detailsResponse.ok) {
                throw new Error(`HTTP error! status: ${detailsResponse.status}`);
            }
            const detailsData = await detailsResponse.json();
            console.log('Detalhes da sala:', detailsData);

            // Adicione um parâmetro para indicar que o SVG deve ser modificado
            navigate('/mapa', {
                state: {
                    roomFloor: detailsData.roomFloor,
                    roomSlug: detailsData.roomSlug,
                    highlightRoom: true // Novo parâmetro
                }
            });

        } catch (error) {
            console.error('Erro ao buscar detalhes:', error);
        }
    };

    return (
        <div className="home">
            <div className="content">
                <img src={logoCompleto} alt="UFRRJ Logo" className="logo" />
                <div className="search-container">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleInputChange}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        placeholder="Sala de aula, departamento..."
                        className="search-bar"
                    />
                    <button className="search-button" onClick={handleSearch} aria-label="Pesquisar"></button>
                    {suggestions.length > 0 && (
                        <ul className="suggestions-list">
                            {suggestions.map((suggestion) => (
                                <li
                                    key={suggestion.id}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    {suggestion.name} - {suggestion.type}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button className="nav-button" onClick={handleNavigation}>Navegar</button>
            </div>
        </div>
    );
}

export default Home;
