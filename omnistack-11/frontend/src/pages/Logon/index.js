import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import imgLogo from '../../assets/logo.svg';
import imgHeroes from '../../assets/heroes.png';

function Logon() {
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post('sessions', { id });

      localStorage.setItem('ngoId', id);
      localStorage.setItem('ngoName', response.data.name);

      history.push('/profile');
    } catch (err) {
      alert('Falha no login. Por favor, tente novamente!');
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={imgLogo} alt="Be The Hero Logo" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu Logon</h1>

          <input
            placeholder="Seu ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />

          <button className="btn-submit" type="submit">
            Entrar
          </button>

          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={imgHeroes} alt="Heroes" />
    </div>
  );
}

export default Logon;
