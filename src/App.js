import { useState, useEffect } from 'react';
import './App.css';
import api from './services/api.js';

function App() {

  const [input, setInput] = useState('')
  const [CEP, setCEP] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setError('');
    setCEP('');
    const fetchData = async () => {
      try {
        const response = await api.get(`${input}/json`);
        if ( response.data.erro ) {
          setError('Digite um CEP valido!');
        } else {
          setCEP(response.data);
        }
        console.log(response);
      } catch {
        setError('Ocorreu um erro desconhecido. Tente novamente mais tarde!');
      } 
    } 
    let qnt_digitos = input.length;
    if ( qnt_digitos === 8 ) {
      fetchData();
    } else if ( qnt_digitos > 8 ) {
      setError(' CEP invalido ');
    } 
  }, [input]);
  
  return (
    <div className="container">
      <h1 className="title">REACT - CEP</h1>
      <div className="containerInput">
        <input  type="text" placeholder="
        Digite seu CEP..." value={input} onChange={ (dados) => {
          setInput(dados.target.value);
        } } /> 
      </div>
      <p>{error}</p>
      {Object.keys(CEP).length > 0 && (
        <main className="main">
          <h2>CEP: {CEP.cep}</h2>
          <span>{CEP.logradouro}</span>
          <span>{CEP.complemento}</span>
          <span>{CEP.bairro}</span>
          <span>{CEP.localidade} - {CEP.uf}</span>
        </main>
      )}
    </div>
  );
}

export default App;