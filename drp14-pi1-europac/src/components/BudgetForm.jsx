import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import './BudgetForm.css';

// Inicialize o cliente Supabase com sua URL e chave de API
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
//const emailServiceApiKey = process.env.REACT_APP_EMAIL_SERVICE_API_KEY;

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setEnviando(true);
    setMensagemSucesso('');
    setMensagemErro('');

    // Validação no frontend
    if (!nome.trim()) {
      setMensagemErro('Por favor, digite seu nome.');
      setEnviando(false);
      return;
    }

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setMensagemErro('Por favor, digite um e-mail válido.');
      setEnviando(false);
      return;
    }

    // Validação aprimorada para telefone (10 ou 11 dígitos)
    const justNumbers = telefone.replace(/\D/g, '');
    if (justNumbers.length < 10 || justNumbers.length > 11) {
      setMensagemErro('Por favor, digite um telefone válido com 10 ou 11 dígitos.');
      setEnviando(false);
      return;
    }

    if (!assunto.trim()) {
      setMensagemErro('Por favor, digite o assunto.');
      setEnviando(false);
      return;
    }

    if (!mensagem.trim()) {
      setMensagemErro('Por favor, digite sua mensagem.');
      setEnviando(false);
      return;
    }

    const { data, error } = await supabase
      .from('COTACOES') // Substitua pelo nome da sua tabela no Supabase
      .insert([
        { nome, email, telefone, assunto, mensagem },
      ]);

    if (error) {
      console.error('Erro ao enviar cotação para o Supabase:', error);
      setMensagemErro('Houve um erro ao enviar sua mensagem. Por favor, tente novamente.');
    } else {
      console.log('Cotação enviada com sucesso para o Supabase:', data);
      setMensagemSucesso('Sua mensagem foi enviada com sucesso! Em breve entraremos em contato.');
      // Limpar o formulário após o sucesso
      setNome('');
      setEmail('');
      setTelefone('');
      setAssunto('');
      setMensagem('');

      // Chamar a função para enviar o email (Edge Function do Supabase)
      if (data && data.length > 0) {
        await enviarEmail(data[0].id);
      } else {
        console.warn('Não foi possível obter o ID da cotação após a inserção.', data);
        // Lógica alternativa ou tratamento de erro aqui
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
        // Aqui você pode decidir se quer mostrar uma mensagem de erro ao usuário
        // mesmo que a cotação tenha sido salva no banco de dados.
      } else {
        console.log('Email enviado com sucesso:', emailData);
      }
    } catch (error) {
      console.error('Erro ao chamar a Edge Function:', error);
    }
  };

  // Função para formatar o número de telefone enquanto o usuário digita
  const handlePhoneChange = (event) => {
    let value = event.currentTarget.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    if (value.length > 11) {
      value = value.slice(0, 11); // Limita a 11 dígitos
    }
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2'); // Coloca parênteses em volta dos dois primeiros dígitos
    value = value.replace(/(\d{4,5})(\d{4})$/, '$1-$2'); // Coloca hífen antes dos últimos 4 dígitos
    setTelefone(value);
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
            placeholder="Seu nome completo"
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="exemplo@email.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="telefone">Telefone:</label>
          <input
            type="tel"
            id="telefone"
            value={telefone}
            placeholder="(11) 99999-9999"
            onChange={handlePhoneChange}
            maxLength="15"
            required
          />

          <label htmlFor="assunto">Assunto:</label>
          <input
            type="text"
            id="assunto"
            value={assunto}
            placeholder="Sobre qual produto você gostaria de falar?"
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