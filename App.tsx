
import React, { useState, useEffect, useRef } from 'react';
import { 
  Eye, EyeOff, User, HelpCircle, UserPlus, 
  QrCode, ArrowUpCircle, ArrowDownCircle, 
  Smartphone, BarChart3, CreditCard, Heart, 
  ShieldCheck, ShoppingBag, TrendingUp, MessageSquare, 
  Send, Sparkles, X, ChevronRight, Wallet,
  PiggyBank, Receipt, BadgePercent, LayoutGrid
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
    { role: 'model', text: 'Olá, Emanuel! Vi que você tem R$ 10.534,00 na conta. Como posso te ajudar a fazer esse dinheiro render hoje?' }
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
    <div className="max-w-md mx-auto min-h-screen flex flex-col relative bg-black pb-28">
      {/* Dynamic Header */}
      <header className="nu-purple pt-12 pb-8 px-6 text-white relative overflow-hidden">
        <div className="flex justify-between items-center mb-8">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all">
            <User className="w-6 h-6" />
          </div>
          <div className="flex gap-4">
            <button onClick={() => setShowBalance(!showBalance)} className="p-2 hover:bg-white/10 rounded-full transition-all">
              {showBalance ? <Eye className="w-6 h-6" /> : <EyeOff className="w-6 h-6" />}
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full transition-all">
              <HelpCircle className="w-6 h-6" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full transition-all">
              <UserPlus className="w-6 h-6" />
            </button>
          </div>
        </div>
        <h1 className="text-xl font-bold tracking-tight">Olá, Emanuel</h1>
      </header>

      {/* Account Info Section */}
      <section className="px-6 py-6 cursor-pointer hover:bg-zinc-900/40 transition-all group">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            Conta
            <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:translate-x-1 transition-transform" />
          </h2>
        </div>
        <div className="mt-1">
          {showBalance ? (
            <span className="text-2xl font-bold tracking-tight">R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          ) : (
            <div className="h-8 w-44 bg-zinc-800/50 rounded-md animate-pulse"></div>
          )}
        </div>
      </section>

      {/* Quick Actions Scrollable */}
      <div className="px-4 py-4 flex gap-3 overflow-x-auto no-scrollbar scroll-smooth">
        <QuickAction icon={<QrCode className="w-6 h-6" />} label="Área Pix" />
        <QuickAction icon={<ArrowUpCircle className="w-6 h-6" />} label="Pagar" />
        <QuickAction icon={<ArrowDownCircle className="w-6 h-6" />} label="Transferir" />
        <QuickAction icon={<Wallet className="w-6 h-6" />} label="Depositar" />
        <QuickAction icon={<Smartphone className="w-6 h-6" />} label="Recarga" />
        <QuickAction icon={<PiggyBank className="w-6 h-6" />} label="Caixinhas" />
        <QuickAction icon={<TrendingUp className="w-6 h-6" />} label="Investir" />
      </div>

      {/* Shortcut: My Cards */}
      <div className="px-6 py-4">
        <div className="bg-zinc-900/80 p-5 rounded-2xl flex items-center gap-4 cursor-pointer hover:bg-zinc-800 transition-all border border-zinc-800/50">
          <CreditCard className="w-6 h-6 text-zinc-300" />
          <span className="font-semibold text-sm">Meus cartões</span>
        </div>
      </div>

      {/* Main Content Cards */}
      <div className="space-y-1">
        <InfoCard 
          icon={<CreditCard className="w-6 h-6" />} 
          title="Cartão de Crédito"
        >
          <p className="text-zinc-500 text-sm mb-1">Fatura atual</p>
          <p className="text-2xl font-bold">R$ 1.240,50</p>
          <p className="text-sm text-zinc-500 mt-1">Limite disponível de R$ 8.500,00</p>
        </InfoCard>

        <InfoCard 
          icon={<TrendingUp className="w-6 h-6" />} 
          title="Investimentos"
        >
          <div className="flex flex-col gap-3">
            <p className="text-sm text-zinc-400">O seu dinheiro está rendendo 100% do CDI.</p>
            <div className="p-4 bg-purple-900/10 rounded-2xl flex items-center gap-4 border border-purple-900/20">
              <div className="bg-purple-900/30 p-2 rounded-full">
                <BadgePercent className="nu-text-purple w-5 h-5" />
              </div>
              <span className="text-sm font-semibold nu-text-purple italic">Planejador IA disponível</span>
            </div>
          </div>
        </InfoCard>

        <InfoCard 
          icon={<ShieldCheck className="w-6 h-6" />} 
          title="Seguros"
        >
          <p className="text-sm text-zinc-500">Sua vida, casa e celular protegidos.</p>
        </InfoCard>

        <InfoCard 
          icon={<ShoppingBag className="w-6 h-6" />} 
          title="Shopping"
        >
          <p className="text-sm text-zinc-500">Cashback e ofertas em mais de 100 lojas.</p>
        </InfoCard>
      </div>

      {/* Floating Action Button (AI) */}
      <button 
        onClick={() => setIsAssistantOpen(true)}
        className="fixed bottom-28 right-6 w-14 h-14 nu-purple rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all z-40 border border-white/20"
      >
        <Sparkles className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 bg-red-500 w-3 h-3 rounded-full border-2 border-black"></span>
      </button>

      {/* Assistant Modal Overlay */}
      {isAssistantOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex flex-col justify-end backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-zinc-900 h-[88vh] rounded-t-[32px] flex flex-col animate-slide-up border-t border-zinc-800 shadow-2xl">
            <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900 rounded-t-[32px]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 nu-purple rounded-lg flex items-center justify-center">
                   <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Assistente Olá</h3>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Powered by Gemini</p>
                </div>
              </div>
              <button onClick={() => setIsAssistantOpen(false)} className="p-2 bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-zinc-950 no-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-purple-700 text-white rounded-tr-none' 
                      : 'bg-zinc-900 text-zinc-100 shadow-lg rounded-tl-none border border-zinc-800/50'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-900 p-5 rounded-3xl shadow-lg border border-zinc-800/50 flex gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-.5s]"></div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-6 border-t border-zinc-800 bg-zinc-900 pb-10">
              <div className="flex gap-2 bg-zinc-800 p-1.5 rounded-[20px] border border-zinc-700/50">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Fale com sua IA financeira..."
                  className="flex-1 bg-transparent text-white px-4 py-3 rounded-xl outline-none placeholder-zinc-500 text-sm"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading}
                  className="w-12 h-12 nu-purple flex items-center justify-center rounded-2xl text-white disabled:opacity-40 transition-all shadow-lg active:scale-95"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Tab Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-2xl border-t border-zinc-900 max-w-md mx-auto h-20 flex justify-around items-center px-6 z-30">
        <button className="flex flex-col items-center gap-1 nu-text-purple scale-110">
          <LayoutGrid className="w-6 h-6" />
          <span className="text-[10px] font-bold">Início</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-zinc-500 hover:text-zinc-300 transition-colors">
          <BarChart3 className="w-6 h-6" />
          <span className="text-[10px] font-bold">Planejar</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-zinc-500 hover:text-zinc-300 transition-colors">
          <ShoppingBag className="w-6 h-6" />
          <span className="text-[10px] font-bold">Shopping</span>
        </button>
      </nav>

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};

export default App;
