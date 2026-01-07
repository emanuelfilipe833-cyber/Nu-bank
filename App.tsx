
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
    <div className="max-w-md mx-auto min-h-screen flex flex-col relative bg-black pb-24 text-white">
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
      <div className="p-6 cursor-pointer -mt-6 bg-black rounded-t-3xl border-b border-zinc-900 flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Conta</span>
          <ChevronRight className="text-zinc-600 w-5 h-5" />
        </div>
        <div className="mt-2">
          {showBalance ? (
            <span className="text-2xl font-bold">R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          ) : (
            <div className="h-8 w-40 bg-zinc-800 rounded-md animate-pulse"></div>
          )}
        </div>
      </div>

      {/* Quick Actions Scroll */}
      <div className="p-6 flex gap-4 overflow-x-auto no-scrollbar bg-black">
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
        <div className="bg-zinc-900 p-4 rounded-xl flex items-center gap-4 cursor-pointer hover:bg-zinc-800 transition-colors">
          <CreditCard className="w-6 h-6 text-zinc-300" />
          <span className="font-semibold text-sm text-zinc-100">Meus cartões</span>
        </div>
      </div>

      {/* Info Sections */}
      <InfoCard 
        icon={<CreditCard className="w-6 h-6" />} 
        title="Cartão de Crédito"
      >
        <p className="text-zinc-500 mb-2">Fatura atual</p>
        <p className="text-2xl font-bold text-white">R$ 1.240,50</p>
        <p className="text-sm text-zinc-600 mt-1">Limite disponível de R$ 8.500,00</p>
      </InfoCard>

      <InfoCard 
        icon={<TrendingUp className="w-6 h-6" />} 
        title="Investimentos"
      >
        <p className="text-sm text-zinc-500">Seu dinheiro está rendendo 100% do CDI.</p>
        <div className="mt-4 p-3 bg-purple-900/20 rounded-lg flex items-center gap-3 border border-purple-900/30">
          <div className="bg-purple-900/40 p-2 rounded-full">
            <Sparkles className="nubank-text-purple w-5 h-5" />
          </div>
          <span className="text-sm font-medium nubank-text-purple">Conheça o Planejador IA</span>
        </div>
      </InfoCard>

      <InfoCard 
        icon={<ShieldCheck className="w-6 h-6" />} 
        title="Seguros"
      >
        <p className="text-sm text-zinc-500">Proteção para você e seus bens.</p>
      </InfoCard>

      <InfoCard 
        icon={<ShoppingBag className="w-6 h-6" />} 
        title="Shopping"
      >
        <p className="text-sm text-zinc-500">Vantagens e cashback nas melhores lojas.</p>
      </InfoCard>

      {/* Floating AI Assistant Button */}
      <button 
        onClick={() => setIsAssistantOpen(true)}
        className="fixed bottom-24 right-6 w-16 h-16 nubank-purple rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all z-40 border border-white/10"
      >
        <MessageSquare className="w-8 h-8" />
        <div className="absolute -top-1 -right-1 bg-red-500 w-4 h-4 rounded-full border-2 border-black"></div>
      </button>

      {/* AI Assistant Modal */}
      {isAssistantOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex flex-col justify-end backdrop-blur-sm">
          <div className="bg-zinc-900 h-[85vh] rounded-t-3xl flex flex-col animate-slide-up border-t border-zinc-800">
            <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900 rounded-t-3xl">
              <div className="flex items-center gap-2">
                <Sparkles className="nubank-text-purple w-6 h-6" />
                <h3 className="text-lg font-bold text-white">Assistente Olá</h3>
              </div>
              <button onClick={() => setIsAssistantOpen(false)} className="p-2 bg-zinc-800 rounded-full text-zinc-400">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-zinc-950 no-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-purple-700 text-white rounded-tr-none' 
                      : 'bg-zinc-800 text-zinc-100 shadow-sm rounded-tl-none border border-zinc-700'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-800 p-4 rounded-2xl shadow-sm border border-zinc-700 flex gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-.5s]"></div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-6 border-t border-zinc-800 flex gap-2 bg-zinc-900">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Pergunte sobre seus gastos..."
                className="flex-1 bg-zinc-800 text-white p-4 rounded-xl outline-none focus:ring-2 focus:ring-purple-900/50 placeholder-zinc-500 border border-zinc-700"
              />
              <button 
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                className="w-14 h-14 nubank-purple flex items-center justify-center rounded-xl text-white disabled:opacity-50 shadow-lg"
              >
                <Send className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-zinc-900 max-w-md mx-auto h-20 flex justify-around items-center px-4 z-30">
        <div className="flex flex-col items-center gap-1 nubank-text-purple">
          <ArrowUpCircle className="w-6 h-6" />
          <span className="text-[10px] font-bold">Início</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-zinc-600">
          <BarChart3 className="w-6 h-6" />
          <span className="text-[10px] font-bold">Histórico</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-zinc-600">
          <ShoppingBag className="w-6 h-6" />
          <span className="text-[10px] font-bold">Shopping</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-zinc-600">
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
          animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};

export default App;
