
import React, { useState, useEffect, useRef } from 'react';
import { 
  Eye, EyeOff, User, HelpCircle, UserPlus, 
  QrCode, ArrowUpCircle, ArrowDownCircle, 
  Smartphone, BarChart3, CreditCard, Heart, 
  ShieldCheck, ShoppingBag, TrendingUp, MessageSquare, 
  Send, Sparkles, X, ChevronRight, Wallet
} from 'lucide-react';
import { QuickAction } from './components/QuickAction';
import { InfoCard } from './components/InfoCard';
import { getFinancialAdvice } from './services/geminiService';
import { Message } from './types';

const App: React.FC = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [balance] = useState(10534.00);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Olá, Emanuel! Como posso ajudar com suas finanças hoje?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const aiResponse = await getFinancialAdvice(userMsg, balance);
    setMessages(prev => [...prev, { role: 'model', text: aiResponse || '' }]);
    setIsLoading(false);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col relative bg-white pb-24">
      {/* Header section */}
      <header className="nubank-purple p-6 pb-12 text-white">
        <div className="flex justify-between items-center mb-8">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center cursor-pointer">
            <User className="w-6 h-6" />
          </div>
          <div className="flex gap-6">
            <button onClick={() => setShowBalance(!showBalance)}>
              {showBalance ? <Eye className="w-6 h-6" /> : <EyeOff className="w-6 h-6" />}
            </button>
            <HelpCircle className="w-6 h-6" />
            <UserPlus className="w-6 h-6" />
          </div>
        </div>
        <h1 className="text-xl font-bold">Olá, Emanuel</h1>
      </header>

      {/* Account Balance Section */}
      <div className="p-6 cursor-pointer -mt-6 bg-white rounded-t-3xl border-b border-gray-100 flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Conta</span>
          <ChevronRight className="text-gray-400 w-5 h-5" />
        </div>
        <div className="mt-2">
          {showBalance ? (
            <span className="text-2xl font-bold">R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          ) : (
            <div className="h-8 w-40 bg-gray-200 rounded-md animate-pulse"></div>
          )}
        </div>
      </div>

      {/* Quick Actions Scroll */}
      <div className="p-6 flex gap-4 overflow-x-auto no-scrollbar">
        <QuickAction icon={<QrCode className="w-6 h-6" />} label="Área Pix" />
        <QuickAction icon={<ArrowUpCircle className="w-6 h-6" />} label="Pagar" />
        <QuickAction icon={<ArrowDownCircle className="w-6 h-6" />} label="Transferir" />
        <QuickAction icon={<Smartphone className="w-6 h-6" />} label="Recarga" />
        <QuickAction icon={<TrendingUp className="w-6 h-6" />} label="Investir" />
        <QuickAction icon={<ShoppingBag className="w-6 h-6" />} label="Shopping" />
        <QuickAction icon={<Wallet className="w-6 h-6" />} label="Depositar" />
      </div>

      {/* My Cards Shortcut */}
      <div className="px-6 mb-6">
        <div className="bg-gray-100 p-4 rounded-xl flex items-center gap-4 cursor-pointer hover:bg-gray-200 transition-colors">
          <CreditCard className="w-6 h-6" />
          <span className="font-semibold text-sm">Meus cartões</span>
        </div>
      </div>

      {/* Info Sections */}
      <InfoCard 
        icon={<CreditCard className="w-6 h-6" />} 
        title="Cartão de Crédito"
      >
        <p className="text-gray-500 mb-2">Fatura atual</p>
        <p className="text-2xl font-bold">R$ 1.240,50</p>
        <p className="text-sm text-gray-400 mt-1">Limite disponível de R$ 8.500,00</p>
      </InfoCard>

      <InfoCard 
        icon={<TrendingUp className="w-6 h-6" />} 
        title="Investimentos"
      >
        <p className="text-sm text-gray-500">Seu dinheiro está rendendo 100% do CDI.</p>
        <div className="mt-4 p-3 bg-purple-50 rounded-lg flex items-center gap-3">
          <div className="bg-purple-100 p-2 rounded-full">
            <Sparkles className="nubank-text-purple w-5 h-5" />
          </div>
          <span className="text-sm font-medium nubank-text-purple">Conheça o Planejador IA</span>
        </div>
      </InfoCard>

      <InfoCard 
        icon={<ShieldCheck className="w-6 h-6" />} 
        title="Seguros"
      >
        <p className="text-sm text-gray-500">Proteção para você e seus bens.</p>
      </InfoCard>

      <InfoCard 
        icon={<ShoppingBag className="w-6 h-6" />} 
        title="Shopping"
      >
        <p className="text-sm text-gray-500">Vantagens e cashback nas melhores lojas.</p>
      </InfoCard>

      {/* Floating AI Assistant Button */}
      <button 
        onClick={() => setIsAssistantOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 nubank-purple rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all z-40"
      >
        <MessageSquare className="w-8 h-8" />
        <div className="absolute -top-1 -right-1 bg-red-500 w-4 h-4 rounded-full border-2 border-white"></div>
      </button>

      {/* AI Assistant Modal */}
      {isAssistantOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex flex-col justify-end">
          <div className="bg-white h-[85vh] rounded-t-3xl flex flex-col animate-slide-up">
            <div className="p-6 border-b flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sparkles className="nubank-text-purple w-6 h-6" />
                <h3 className="text-lg font-bold">Assistente Olá</h3>
              </div>
              <button onClick={() => setIsAssistantOpen(false)} className="p-2 bg-gray-100 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 no-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-purple-600 text-white rounded-tr-none' 
                      : 'bg-white text-gray-800 shadow-sm rounded-tl-none border border-gray-100'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-.5s]"></div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-6 border-t flex gap-2 bg-white">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Pergunte sobre seus gastos..."
                className="flex-1 bg-gray-100 p-4 rounded-xl outline-none focus:ring-2 focus:ring-purple-200"
              />
              <button 
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                className="w-14 h-14 nubank-purple flex items-center justify-center rounded-xl text-white disabled:opacity-50"
              >
                <Send className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab Bar (Mock) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-100 max-w-md mx-auto h-20 flex justify-around items-center px-4 z-30">
        <div className="flex flex-col items-center gap-1 nubank-text-purple">
          <ArrowUpCircle className="w-6 h-6" />
          <span className="text-[10px] font-bold">Início</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400">
          <BarChart3 className="w-6 h-6" />
          <span className="text-[10px] font-bold">Histórico</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400">
          <ShoppingBag className="w-6 h-6" />
          <span className="text-[10px] font-bold">Shopping</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400">
          <Heart className="w-6 h-6" />
          <span className="text-[10px] font-bold">Vida</span>
        </div>
      </nav>

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default App;
