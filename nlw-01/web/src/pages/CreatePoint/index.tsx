import React, { useEffect, useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import api from '../../services/api';
import apiLocalesIBGE from '../../services/apiLocalesIBGE';

import logo from '../../assets/logo.svg';

import './styles.css';

interface Item {
  _id: string;
  title: string;
  image_url: string;
}

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const CreatePoint = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [ufs, setUFs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const [selectedUf, setSelectedUf] = useState('');
  const [selectedCity, setselectedCity] = useState('');
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setInitialPosition([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    api.get('items').then(res => {
      setItems(res.data);
    });
  }, []);

  useEffect(() => {
    apiLocalesIBGE
      .get<IBGEUFResponse[]>('estados', { params: { orderBy: 'nome' } })
      .then(res => {
        const ufInitials = res.data.map(uf => uf.sigla);
        setUFs(ufInitials);
      });
  }, []);

  useEffect(() => {
    apiLocalesIBGE
      .get<IBGECityResponse[]>(`estados/${selectedUf}/municipios`, {
        params: { orderBy: 'nome' },
      })
      .then(res => {
        const cities = res.data.map(city => city.nome);
        setCities(cities);
      });
  }, [selectedUf]);

  function handleSelectUF(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;
    setSelectedUf(uf);
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;
    setselectedCity(city);
  }

  function handleMapClink(event: LeafletMouseEvent) {
    const { latlng } = event;
    setSelectedPosition([latlng.lat, latlng.lng]);
  }

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta" />
        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>
      <form>
        <h1>
          Cadastro do
          <br />
          ponto de coleta
        </h1>
        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>
          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input type="text" name="name" id="name" />
          </div>
          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input type="text" name="email" id="email" />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">WhatsApp</label>
              <input type="text" name="whatsapp" id="whatsapp" />
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione um endereço no mapa</span>
          </legend>
          <Map center={initialPosition} zoom={15} onClick={handleMapClink}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectedPosition} />
          </Map>
          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select
                name="uf"
                id="uf"
                value={selectedUf}
                onChange={handleSelectUF}>
                <option value="0">Selecione um estado (UF)</option>
                {ufs.map(uf => (
                  <option key={uf} value={uf}>
                    {uf}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select
                name="city"
                id="city"
                value={selectedCity}
                onChange={handleSelectCity}>
                <option value="0">Selecione uma cidade</option>
                {cities.map(city => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <h2>Ítens de coleta</h2>
            <span>Selecione um ou mais ítens abaixo</span>
          </legend>
          <ul className="items-grid">
            {items.map(item => (
              <li key={item._id}>
                <img src={item.image_url} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </fieldset>
        <button type="submit">Cadastrar ponto de coleta</button>
      </form>
    </div>
  );
};

export default CreatePoint;
