/**
 * @file backend/routes.js
 * @description Define todas as rotas da API para a aplicação.
 * Este arquivo centraliza a lógica para:
 * - Autenticação com a API do Google Calendar (OAuth2).
 * - CRUD (Create, Read) para Barbearias e Agendamentos.
 * - Cálculo de horários de disponibilidade.
 */

import express from "express";
import { supabase } from "./supabaseClient.js";

/**
 * Configura e anexa todas as rotas da API à instância do aplicativo Express.
 * @param {express.Application} app - A instância do aplicativo Express.
 */
export function setupRoutes(app) {
  // Middleware de log simples para todas as requisições /api, auxiliando na depuração.
  app.use('/api', (req, res, next) => {
    try {
      console.log(`[API] ${req.method} ${req.originalUrl}`);
      // Loga o corpo da requisição para POST, útil para depurar payloads.
      if (req.method === 'POST' && req.body) {
        console.log('[API] body:', JSON.stringify(req.body).slice(0, 1000));
      }
    } catch (err) {
      // Ignora erros de logging para não quebrar a aplicação.
    }
    next();
  });
}
