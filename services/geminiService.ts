
import { GoogleGenAI } from "@google/genai";

export const getFinancialAdvice = async (userPrompt: string, balance: number) => {
  // Verificação de segurança para evitar erro de 'process is undefined' ou chave nula
  const apiKey = typeof process !== 'undefined' && process.env?.API_KEY ? process.env.API_KEY : '';
  
  if (!apiKey) {
    console.warn("API_KEY não encontrada no ambiente.");
    return "Oi Emanuel! Para eu te dar dicas financeiras, preciso que a chave da IA esteja configurada. Mas posso te dizer que seu saldo de R$ " + balance.toLocaleString('pt-BR') + " é um ótimo começo!";
  }

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: `Você é o assistente financeiro do Emanuel no aplicativo "Olá". O Emanuel tem um saldo atual de R$ ${balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}. 
        Seja amigável, conciso e use um tom moderno de neobanco. Ajude-o a economizar, investir ou entender seus gastos. Responda sempre em Português do Brasil.`,
        temperature: 0.7,
      },
    });
    
    return response.text || "Estou pensando em uma resposta melhor...";
  } catch (error) {
    console.error("Erro ao chamar Gemini:", error);
    return "Desculpe, Emanuel. Tive um pequeno problema técnico agora. Pode tentar novamente em instantes?";
  }
};
