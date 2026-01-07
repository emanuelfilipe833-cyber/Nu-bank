
import { GoogleGenAI } from "@google/genai";

export const getFinancialAdvice = async (userPrompt: string, balance: number) => {
  // Initialize with process.env.API_KEY directly as required by the coding guidelines.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
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
    
    // Use .text property to get the generated content.
    return response.text;
  } catch (error) {
    console.error("Erro ao chamar Gemini:", error);
    return "Desculpe, Emanuel. Tive um pequeno problema técnico agora. Pode tentar novamente em instantes?";
  }
};
