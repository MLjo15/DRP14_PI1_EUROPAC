import React, { useState } from 'react';
import './OrcamentoForm.css';

function OrcamentoForm() {
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
    <div className="orcamento-form-container">
      <div className="form-container">
        <h2>O café está pronto! Vamos conversar?</h2>
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
        <p>Rua Lorem Ipsum Dolor Sit Amet, 321 - São Bernardo - SP - Brasil - CEP: 12345-321</p>

        <h3>TELEFONE</h3>
        <p>+55 11 1212-4545</p>

        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.486665715568!2d-46.54148768502206!3d-23.61864888465063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5b1f5f5f5f5f5%3A0x1a2b3c4d5e6f7g8h!2sRua%20Lorem%20Ipsum%20Dolor%20Sit%20Amet%2C%20321%20-%20S%C3%A3o%20Bernardo%20do%20Campo%2C%20SP%2C%20Brasil!5e0!3m2!1spt-BR!2sbr!4v1678888888888!5m2!1spt-BR!2sbr"
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

export default OrcamentoForm;