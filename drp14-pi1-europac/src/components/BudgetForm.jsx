import React, { useState } from 'react';
import './BudgetForm.css';

function BudgetForm() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [assunto, setAssunto] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode adicionar a lógica para enviar o formulário
    console.log({ nome, email, telefone, assunto, mensagem });
  };

  return (
    <div className="budget-form-container">
      <div className="form-container">
        <h2>Entre em contato!</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="telefone">Telefone:</label>
          <input
            type="tel"
            id="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />

          <label htmlFor="assunto">Assunto:</label>
          <input
            type="text"
            id="assunto"
            value={assunto}
            onChange={(e) => setAssunto(e.target.value)}
            required
          />

          <label htmlFor="mensagem">Mensagem:</label>
          <textarea
            id="mensagem"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            required
          ></textarea>

          <button type="submit">Enviar Contato</button>
        </form>
      </div>

      <div className="contato-info">
        <h3>ENDEREÇO</h3>
        <p>Rua Miguel Mota, 380A - Vila Canero, São Paulo - SP, 03191-110</p>

        <h3>TELEFONE</h3>
        <p>+55 11 2966-4076</p>

        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.772592534882!2d-46.56586618501258!3d-23.57861546747535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5c1474136e65%3A0x6a0a09e02a0a2569!2sR.%20Miguel%20Mota%2C%20380A%20-%20Vila%20Canero%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2003191-110!5e0!3m2!1spt-BR!2sbr!4v1709403756184!5m2!1spt-BR!2sbr"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default BudgetForm;