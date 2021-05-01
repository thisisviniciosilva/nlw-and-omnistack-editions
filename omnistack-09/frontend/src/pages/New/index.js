import React, { useState, useMemo } from 'react';
import api from '../../services/api';
import './style.css';

import camera from '../../assets/camera.svg';

export default function New({ history }) {
  const [thumbnail, setThumbnail] = useState(null);

  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();
    const user_id = localStorage.getItem('user');

    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price);

    await api.post('/spots', data, {
      headers: { user_id },
    });

    history.push('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        className={thumbnail ? 'has-thumbnail' : ''}
        id="thumbnail"
        style={{ backgroundImage: `url(${preview})` }}
      >
        <input
          type="file"
          onChange={event => setThumbnail(event.target.files[0])}
        />
        <img src={camera} alt="Selecione" />
      </label>

      <label htmlFor="company">EMPRESA*</label>
      <input
        id="company"
        type="text"
        placeholder="Sua empresa incível"
        value={company}
        onChange={event => setCompany(event.target.value)}
      />

      <label htmlFor="techs">
        TECNOLOGIAS*&nbsp;
        <span>(separadas por vírgula)</span>
      </label>
      <input
        id="techs"
        type="text"
        placeholder="Quais tecnologias usam?"
        value={techs}
        onChange={event => setTechs(event.target.value)}
      />

      <label htmlFor="techs">
        PREÇO*&nbsp;
        <span>(em branco para GRATUITO)</span>
      </label>
      <input
        id="price"
        type="text"
        placeholder="Valor cobrado por dia"
        value={price}
        onChange={event => setPrice(event.target.value)}
      />

      <button className="btn" type="submit">
        Cadastrar
      </button>
    </form>
  );
}
