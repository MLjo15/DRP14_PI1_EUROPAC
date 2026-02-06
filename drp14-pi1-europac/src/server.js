/**
 * @file backend/server.js
 * @description Ponto de entrada principal para o servidor backend da aplicação.
 * Este arquivo é responsável por:
 * - Inicializar o servidor Express.
 * - Carregar variáveis de ambiente.
 * - Configurar middlewares (CORS, JSON parser).
 * - Servir arquivos estáticos (se aplicável).
 * - Registrar as rotas da API.
 * - Definir rotas de manutenção ("anti-sleep").
 * - Iniciar o servidor na porta especificada.
 */

// --- IMPORTAÇÕES DE MÓDULOS ---
import express from "express"; // Framework web para Node.js.
import cors from "cors"; // Middleware para habilitar o Cross-Origin Resource Sharing.
import dotenv from "dotenv"; // Módulo para carregar variáveis de ambiente de um arquivo .env.
import path from 'path'; // Módulo nativo do Node.js para lidar com caminhos de arquivos.
import { fileURLToPath } from 'url'; // Utilitário para converter URLs de arquivo para caminhos.
import { setupRoutes } from "../routes.js"; // Função que configura as rotas da aplicação.
import { supabase } from "./supabaseClient.js"; // Cliente Supabase para interação com o banco de dados.

// --- CONFIGURAÇÃO INICIAL E VARIÁVEIS DE AMBIENTE ---
// Carrega as variáveis de ambiente do arquivo .env localizado na raiz do backend.
dotenv.config();

// Inicializa a aplicação Express.
const app = express();

// --- CONFIGURAÇÃO DE MIDDLEWARES ---

// 1. Configuração do CORS (Cross-Origin Resource Sharing)
// Define quais origens (frontends) podem fazer requisições para este backend.
const allowedOrigins = [
  process.env.VITE_FRONTEND_URL, // URL do frontend em produção (ex: https://meu-app.com)
  "http://localhost:5173",       // URL do frontend para desenvolvimento local
].filter(Boolean); // Remove entradas nulas ou vazias caso VITE_FRONTEND_URL não esteja definida.

console.log(`[CORS] Origens permitidas: ${allowedOrigins.join(", ") || "Nenhuma"}`);

app.use(
  cors({
    origin: function (origin, callback) {
      // Permite requisições sem 'origin' (ex: Postman, curl) ou que estejam na lista de permitidas.
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.warn(`[CORS] Requisição bloqueada da origem: ${origin}`);
        callback(new Error("Origem não permitida pelo CORS"));
      }
    },
  })
);

// 2. Middleware para parsear o corpo de requisições JSON.
app.use(express.json());

// 3. Middleware para servir arquivos estáticos.
// Útil se o build do seu frontend estiver em uma pasta acessível pelo backend.
const __filename = fileURLToPath(import.meta.url);
app.use(express.static(path.join(path.dirname(__filename), "..", "public")));

// --- REGISTRO DAS ROTAS DA APLICAÇÃO ---
// A função setupRoutes anexa todas as rotas da API (definidas em routes.js) ao app Express.
setupRoutes(app);

// --- ROTAS DE SERVIÇO E MANUTENÇÃO ---

// Rota de "saúde" para verificar se o servidor está no ar.
app.get("/api/health", (req, res) => res.json({ ok: true }));

// Rotas "anti-sleep" para serviços de monitoramento como o UptimeRobot.
// Mantém o serviço ativo em plataformas com planos gratuitos (ex: Render).
app.get("/api/ping", (req, res) => {
  console.log("[API] GET /api/ping - Render Ativo.");
  return res.status(200).send("Serviço ativo.");
});

app.head("/api/ping", (req, res) => {
  console.log("[API] HEAD /api/ping - Render Ativo.");
  return res.status(200).end();
});

// Função auxiliar para executar a rotina de manutenção do Supabase com lógica de intervalo.
async function performSupabaseMaintenance() {
  const MAINTENANCE_INTERVAL_DAYS = 6; // Executar a cada 6 dias
  const TASK_NAME = "Rotina de Manutenção"; // Usar o nome da tarefa conforme o log de exemplo do usuário

  try {
    // 1. Verificar o último registro de manutenção bem-sucedida.
    const { data: lastLog, error: logError } = await supabase
      .from("manutencao_log")
      .select("data_execucao")
      .eq("tarefa", TASK_NAME)
      .order("data_execucao", { ascending: false })
      .limit(1)
      .single();

    if (logError && logError.code !== 'PGRST116') { // PGRST116 indica que nenhuma linha foi encontrada.
      console.error("[API] Erro ao buscar log de manutenção:", logError.message);
      // Em caso de falha ao buscar o log, assume-se que a manutenção deve ser executada para segurança.
    }

    let shouldPerformMaintenance = true;
    if (lastLog) {
      const lastExecutionDate = new Date(lastLog.data_execucao);
      const sixDaysAgo = new Date();
      sixDaysAgo.setDate(sixDaysAgo.getDate() - MAINTENANCE_INTERVAL_DAYS);

      if (lastExecutionDate > sixDaysAgo) {
        shouldPerformMaintenance = false;
        console.log(`[API] ${TASK_NAME} não executada. Última execução em ${lastExecutionDate.toISOString()}. Próxima execução esperada após ${new Date(lastExecutionDate.getTime() + (MAINTENANCE_INTERVAL_DAYS * 24 * 60 * 60 * 1000)).toISOString()}`);
      }
    }

    if (shouldPerformMaintenance) {
      // 2. Executa uma consulta leve no Supabase para manter a conexão ativa.
      await supabase.from("COTACOES").select("id").limit(1);
      console.log(`[API] ${TASK_NAME} executada com sucesso.`);

      // 3. Registra a execução no log.
      const { error: insertError } = await supabase
        .from("manutencao_log")
        .insert({
          tarefa: TASK_NAME,
          status: "concluida",
          data_execucao: new Date().toISOString() // Armazena a hora UTC atual
        });
      if (insertError) {
        console.error("[API] Erro ao registrar log de manutenção:", insertError.message);
      }
      return { status: 200, message: "Manutenção concluída com sucesso (Supabase)." };
    } else {
      return { status: 200, message: "Manutenção não necessária no momento (intervalo de 6 dias)." };
    }
  } catch (e) {
    console.error(`[API] Erro na ${TASK_NAME}:`, e.message);
    // Registra a falha no log.
    await supabase.from("manutencao_log").insert({ tarefa: TASK_NAME, status: "falha", data_execucao: new Date().toISOString() });
    return { status: 500, message: "Erro na Manutenção: " + e.message };
  }
}

app.get("/api/maintenance", async (req, res) => {
  const result = await performSupabaseMaintenance();
  res.status(result.status).send(result.message);
});

// Adiciona o handler para requisições HEAD
app.head("/api/maintenance", async (req, res) => {
  const result = await performSupabaseMaintenance();
  // Para requisições HEAD, apenas o status e os cabeçalhos são importantes, o corpo é ignorado.
  res.status(result.status).end();
});

// --- TRATAMENTO DE ROTA NÃO ENCONTRADA (404) ---
// Este middleware deve ser o último, pois captura qualquer requisição que não correspondeu a uma rota anterior.
app.use((req, res) => {
  console.log(`[404] Rota não encontrada: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    error: "Endpoint não encontrado. Verifique se o prefixo /api/ está correto.",
  });
});

// --- INICIALIZAÇÃO DO SERVIDOR ---
// Define a porta a partir das variáveis de ambiente, com um fallback para 5000.
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor backend iniciado e ouvindo na porta ${PORT}`));
