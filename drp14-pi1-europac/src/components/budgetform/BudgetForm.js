import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import './BudgetForm.css';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function BudgetForm() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [assunto, setAssunto] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

  const validarEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validarTelefone = (telefone) =>
    /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/.test(telefone);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setEnviando(true);
    setMensagemSucesso('');
    setMensagemErro('');

    const nomeTrim = nome.trim();
    const emailTrim = email.trim();
    const telefoneTrim = telefone.trim();
    const assuntoTrim = assunto.trim();
    const mensagemTrim = mensagem.trim();

    // Validações
    if (!nomeTrim) {
      setMensagemErro('Por favor, digite seu nome.');
      setEnviando(false);
      return;
    }

    if (!validarEmail(emailTrim)) {
      setMensagemErro('Por favor, digite um e-mail válido.');
      setEnviando(false);
      return;
    }

    if (!validarTelefone(telefoneTrim)) {
      setMensagemErro('Por favor, digite um telefone válido com DDD.');
      setEnviando(false);
      return;
    }

    if (!assuntoTrim) {
      setMensagemErro('Por favor, digite o assunto.');
      setEnviando(false);
      return;
    }

    if (!mensagemTrim) {
      setMensagemErro('Por favor, digite sua mensagem.');
      setEnviando(false);
      return;
    }

    const { data, error } = await supabase
      .from('COTACOES')
      .insert([
        {
          nome: nomeTrim,
          email: emailTrim,
          telefone: telefoneTrim,
          assunto: assuntoTrim,
          mensagem: mensagemTrim,
        },
      ]);

    if (error) {
      console.error('Erro ao enviar cotação para o Supabase:', error);
      setMensagemErro('Houve um erro ao enviar sua mensagem. Por favor, tente novamente.');
    } else {
      setMensagemSucesso('Sua mensagem foi enviada com sucesso! Em breve entraremos em contato.');
      setNome('');
      setEmail('');
      setTelefone('');
      setAssunto('');
      setMensagem('');

      if (data && data.length > 0) {
        await enviarEmail(data[0].id);
      } else {
        console.warn('Não foi possível obter o ID da cotação após a inserção.', data);
      }
    }

    setEnviando(false);
  };

  const enviarEmail = async (cotacaoId) => {
    try {
      const { data: emailData, error: emailError } = await supabase.functions.invoke('enviar-email-cotacao', {
        body: JSON.stringify({ cotacaoId }),
      });

      if (emailError) {
        console.error('Erro ao chamar a Edge Function de envio de email:', emailError);
      } else {
        console.log('Email enviado com sucesso:', emailData);
      }
    } catch (error) {
      console.error('Erro ao chamar a Edge Function:', error);
    }
  };

  return (
    <div className="budget-form-container">
      <div className="form-container">
        <h2>Entre em contato!</h2>
        {mensagemSucesso && <div className="success-message">{mensagemSucesso}</div>}
        {mensagemErro && <div className="error-message">{mensagemErro}</div>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            maxLength={100}
            required
          />

          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={100}
            required
          />

          <label htmlFor="telefone">Telefone:</label>
          <input
            type="tel"
            id="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            maxLength={20}
            required
          />

          <label htmlFor="assunto">Assunto:</label>
          <input
            type="text"
            id="assunto"
            value={assunto}
            onChange={(e) => setAssunto(e.target.value)}
            maxLength={150}
            required
          />

          <label htmlFor="mensagem">Mensagem:</label>
          <textarea
            id="mensagem"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            maxLength={1000}
            required
          ></textarea>

          <button type="submit" disabled={enviando}>
            {enviando ? 'Enviando...' : 'Enviar Contato'}
          </button>
        </form>
      </div>

      <div className="contato-info">
        <h3>ENDEREÇO</h3>
        <p>Rua Miguel Mota, 380A - Vila Canero, São Paulo - SP, 03191-110</p>

        <h3>TELEFONE</h3>
        <p>+55 11 2966-4076</p>

        <div className="map-container">
        <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.032673519187!2d-46.573806724669694!3d-23.56726997879577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5c2105a452d7%3A0x21c487a7331f8749!2sR.%20Miguel%20Mota%2C%20380a%20-%20Vila%20Canero%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2003191-110!5e0!3m2!1spt-BR!2sbr!4v1746013591328!5m2!1spt-BR!2sbr"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa da empresa"
            />

        </div>
      </div>
    </div>
  );
}

export default BudgetForm;
