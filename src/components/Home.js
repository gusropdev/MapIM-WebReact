import React from 'react';
import logoCompleto from '../assets/ufrrj-logo.png';
import '../styles/Home.css';

function Home() {
    return (
        <div className="home">
            <div className="content">
                <img src={logoCompleto} alt="UFRRJ Logo" className="logo" />
                <div className="search-container">
                    <input type="text" placeholder="Sala de aula, departamento..." className="search-bar" />
                    <button className="search-button" aria-label="Pesquisar"></button>
                </div>
                <button className="nav-button">Navegar</button>
            </div>
        </div>
    );
}

export default Home;
