import React, { useState, useEffect } from 'react';

/*
  OS CONCEITOS DO REACT:
    COMPONENTE: É uma função que retorna algum conteúdo HTML, CSS e/ou JS. O
      componente pode ser qualquer trecho de código isolado que não prejudique
      o comportamento de outros componentes dentro da aplicação.

      • Nomeclatura em CamelCase. Ex.: Header, TimeLine
      • Usa-se como uma tag HTML. Ex.: <Hearder />, <TimeLine />
      • É recomendável ter apenas um componente por arquivo.

    PROPRIEDADE: É uma informação que o componente PAI passa para o componente
      FILHO. Ex.: <Header title="Hello World!" />. O componente filho pode
      acessar os valores passados através parâmetro PROPS.

    ESTADO: São informações mantidas pelo componente.

      • Usa-se a função useState() de dentro do REACT.
      • Conceito de IMUTABILIDADE: O React nunca vai alterar um dado, mas sim
        criar um novo dado a partir do valor atual do dado.
 */

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

import api from './services/api';

import './global.css';
import './App.css';
import './Main.css';
import './Sidebar.css';

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const devs = await api.get('/devs');

      setDevs(devs.data);
    }

    loadDevs();
  }, []);

  async function handleSubmit(data) {
    const dev = await api.post('/devs', data);

    setDevs([...devs, dev.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleSubmit} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
