import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
        // Aqui você pode adicionar lógica adicional, como navegar para uma página específica
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
                        placeholder="Sala de aula, departamento..."
                        className="search-bar"
                    />
                    <button className="search-button" aria-label="Pesquisar"></button>
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
