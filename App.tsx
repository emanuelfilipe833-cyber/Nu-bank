
import React, { useState, useEffect, useRef } from 'react';
import { 
  Eye, EyeOff, User, HelpCircle, UserPlus, 
  QrCode, ArrowUpCircle, ArrowDownCircle, 
  Smartphone, BarChart3, CreditCard, Heart, 
  ShieldCheck, ShoppingBag, TrendingUp, MessageSquare, 
  Send, Sparkles, X, ChevronRight, Wallet, 
  Copy, CheckCircle2, ScanLine
} from 'lucide-react';
import { QuickAction } from './components/QuickAction.tsx';
import { InfoCard } from './components/InfoCard.tsx';
import { getFinancialAdvice } from './services/geminiService.ts';
import { Message } from './types.ts';

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black/90 z-[60] flex flex-col justify-end backdrop-blur-md">
    <div className="bg-zinc-900 h-[75vh] rounded-t-3xl flex flex-col animate-slide-up border-t border-zinc-800">
      <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <button onClick={onClose} className="p-2 bg-zinc-800 rounded-full text-zinc-400 active-scale">
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-6 text-zinc-300">
        {children}
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [balance] = useState(10534.00);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Olá, Emanuel! Vi que seu saldo é de R$ 10.534,00. Quer uma dica de como investir esse valor hoje?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);
    try {
      const aiResponse = await getFinancialAdvice(userMsg, balance);
      setMessages(prev => [...prev, { role: 'model', text: aiResponse || 'Sem resposta no momento.' }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: 'Ops, tive um erro ao processar. Verifique sua conexão.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col relative bg-black pb-24 text-white overflow-x-hidden">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 bg-zinc-800 border border-zinc-700 px-6 py-3 rounded-full shadow-2xl z-[100] flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="text-green-500 w-5 h-5" />
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}

      {/* Header section */}
      <header className="nubank-purple p-6 pb-12 text-white">
        <div className="flex justify-between items-center mb-8">
          <div 
            className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center cursor-pointer active-scale"
            onClick={() => setActiveModal('profile')}
          >
            <User className="w-6 h-6" />
          </div>
          <div className="flex gap-6">
            <button className="active-scale" onClick={() => setShowBalance(!showBalance)}>
              {showBalance ? <Eye className="w-6 h-6" /> : <EyeOff className="w-6 h-6" />}
            </button>
            <button className="active-scale" onClick={() => setActiveModal('help')}><HelpCircle className="w-6 h-6" /></button>
            <button className="active-scale" onClick={() => setActiveModal('invite')}><UserPlus className="w-6 h-6" /></button>
          </div>
        </div>
        <h1 className="text-xl font-bold">Olá, Emanuel</h1>
      </header>

      {/* Account Balance Section */}
      <div 
        className="p-6 cursor-pointer -mt-6 bg-black rounded-t-3xl border-b border-zinc-900 flex flex-col gap-1 active:bg-zinc-900 transition-colors"
        onClick={() => setActiveModal('account_details')}
      >
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
        <QuickAction onClick={() => setActiveModal('pix')} icon={<QrCode className="w-6 h-6" />} label="Área Pix" />
        <QuickAction onClick={() => setActiveModal('pay')} icon={<ArrowUpCircle className="w-6 h-6" />} label="Pagar" />
        <QuickAction onClick={() => setActiveModal('transfer')} icon={<ArrowDownCircle className="w-6 h-6" />} label="Transferir" />
        <QuickAction onClick={() => setActiveModal('recharge')} icon={<Smartphone className="w-6 h-6" />} label="Recarga" />
        <QuickAction onClick={() => setActiveModal('invest')} icon={<TrendingUp className="w-6 h-6" />} label="Investir" />
        <QuickAction onClick={() => showToast('Empréstimos em breve')} icon={<Wallet className="w-6 h-6" />} label="Empréstimo" />
      </div>

      {/* My Cards Shortcut */}
      <div className="px-6 mb-6">
        <div 
          className="bg-zinc-900 p-4 rounded-xl flex items-center gap-4 cursor-pointer active:bg-zinc-800 transition-colors border border-zinc-800"
          onClick={() => setActiveModal('cards')}
        >
          <CreditCard className="w-6 h-6 text-zinc-300" />
          <span className="font-semibold text-sm text-zinc-100">Meus cartões</span>
        </div>
      </div>

      {/* Info Sections */}
      <InfoCard 
        onClick={() => setActiveModal('credit_card')}
        icon={<CreditCard className="w-6 h-6" />} 
        title="Cartão de Crédito"
      >
        <p className="text-zinc-500 mb-2 font-medium">Fatura atual</p>
        <p className="text-2xl font-bold text-white">R$ 1.240,50</p>
        <p className="text-sm text-zinc-600 mt-1">Limite disponível de R$ 8.500,00</p>
      </InfoCard>

      <InfoCard 
        onClick={() => setActiveModal('invest')}
        icon={<TrendingUp className="w-6 h-6" />} 
        title="Investimentos"
      >
        <p className="text-sm text-zinc-500">Seu dinheiro está rendendo 100% do CDI.</p>
        <div 
          className="mt-4 p-3 bg-purple-900/20 rounded-lg flex items-center gap-3 border border-purple-900/30 active:scale-95 transition-transform"
          onClick={(e) => { e.stopPropagation(); setIsAssistantOpen(true); }}
        >
          <div className="bg-purple-900/40 p-2 rounded-full">
            <Sparkles className="nubank-text-purple w-5 h-5" />
          </div>
          <span className="text-sm font-medium nubank-text-purple">Conheça o Planejador IA</span>
        </div>
      </InfoCard>

      {/* Floating AI Assistant Button */}
      <button 
        onClick={() => setIsAssistantOpen(true)}
        className="fixed bottom-24 right-6 w-16 h-16 nubank-purple rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all z-40 border border-white/10"
      >
        <MessageSquare className="w-8 h-8" />
      </button>

      {/* MODAIS DE AÇÃO */}
      {activeModal === 'pix' && (
        <Modal title="Área Pix" onClose={() => setActiveModal(null)}>
          <div className="grid grid-cols-2 gap-4">
            <div onClick={() => showToast('Chave copiada!')} className="p-6 bg-zinc-800 rounded-2xl flex flex-col items-center gap-3 active:scale-95 transition-transform cursor-pointer border border-zinc-700">
              <Copy className="w-8 h-8 text-purple-500" />
              <span className="text-sm font-bold">Pix Copia e Cola</span>
            </div>
            <div onClick={() => showToast('Câmera aberta!')} className="p-6 bg-zinc-800 rounded-2xl flex flex-col items-center gap-3 active:scale-95 transition-transform cursor-pointer border border-zinc-700">
              <ScanLine className="w-8 h-8 text-purple-500" />
              <span className="text-sm font-bold">Ler QR Code</span>
            </div>
          </div>
          <div className="mt-8 space-y-4">
            <h4 className="font-bold">Enviar</h4>
            <div className="bg-zinc-800 p-4 rounded-xl flex justify-between items-center cursor-pointer" onClick={() => showToast('Contatos carregados')}>
              <span>Transferir para contato</span>
              <ChevronRight className="w-5 h-5 text-zinc-500" />
            </div>
          </div>
        </Modal>
      )}

      {activeModal === 'cards' && (
        <Modal title="Meus Cartões" onClose={() => setActiveModal(null)}>
          <div className="bg-gradient-to-br from-purple-600 to-purple-900 p-8 rounded-2xl mb-6 shadow-xl relative overflow-hidden h-48 border border-white/10">
            <div className="absolute top-4 right-4 text-white/50 italic font-bold">Olá</div>
            <div className="mt-12 text-lg font-mono tracking-widest text-white">**** **** **** 1234</div>
            <div className="mt-4 flex justify-between items-end">
              <span className="text-sm font-bold uppercase text-white">Emanuel</span>
              <span className="text-xs opacity-70 text-white">05/29</span>
            </div>
          </div>
          <div className="space-y-3">
             <button onClick={() => showToast('Configurações abertas')} className="w-full py-4 bg-zinc-800 rounded-xl font-bold text-white mb-2">Configurar Cartão</button>
             <button onClick={() => showToast('Cartão bloqueado')} className="w-full py-4 border border-zinc-800 rounded-xl font-bold text-red-500">Bloquear Cartão Temporariamente</button>
          </div>
        </Modal>
      )}

      {activeModal === 'recharge' && (
        <Modal title="Recarga de Celular" onClose={() => setActiveModal(null)}>
          <div className="space-y-4">
            <label className="text-sm text-zinc-500">Qual o número do celular?</label>
            <input type="tel" placeholder="(00) 00000-0000" className="w-full bg-zinc-800 p-4 rounded-xl outline-none border border-zinc-700 focus:border-purple-500 text-white" />
            <button onClick={() => showToast('Recarga solicitada!')} className="w-full nubank-purple py-4 rounded-xl font-bold text-white shadow-lg">Continuar para Pagamento</button>
          </div>
        </Modal>
      )}

      {/* AI Assistant Modal */}
      {isAssistantOpen && (
        <div className="fixed inset-0 bg-black/80 z-[70] flex flex-col justify-end backdrop-blur-sm">
          <div className="bg-zinc-900 h-[85vh] rounded-t-3xl flex flex-col animate-slide-up border-t border-zinc-800">
            <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
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
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-purple-700 text-white rounded-tr-none shadow-lg' : 'bg-zinc-800 text-zinc-100 shadow-sm rounded-tl-none border border-zinc-700'}`}>
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
                placeholder="Diga algo sobre seu saldo..."
                className="flex-1 bg-zinc-800 text-white p-4 rounded-xl outline-none focus:ring-2 focus:ring-purple-900/50 border border-zinc-700 placeholder-zinc-500"
              />
              <button onClick={handleSendMessage} disabled={!input.trim() || isLoading} className="w-14 h-14 nubank-purple flex items-center justify-center rounded-xl text-white disabled:opacity-50 active-scale">
                <Send className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-zinc-900 max-w-md mx-auto h-20 flex justify-around items-center px-4 z-30">
        <div className="flex flex-col items-center gap-1 nubank-text-purple cursor-pointer active:opacity-70 transition-opacity">
          <ArrowUpCircle className="w-6 h-6" />
          <span className="text-[10px] font-bold">Início</span>
        </div>
        <div onClick={() => setActiveModal('account_details')} className="flex flex-col items-center gap-1 text-zinc-600 cursor-pointer active:opacity-70 transition-opacity">
          <BarChart3 className="w-6 h-6" />
          <span className="text-[10px] font-bold">Histórico</span>
        </div>
        <div onClick={() => setActiveModal('shopping')} className="flex flex-col items-center gap-1 text-zinc-600 cursor-pointer active:opacity-70 transition-opacity">
          <ShoppingBag className="w-6 h-6" />
          <span className="text-[10px] font-bold">Shopping</span>
        </div>
        <div onClick={() => showToast('Seguros em breve')} className="flex flex-col items-center gap-1 text-zinc-600 cursor-pointer active:opacity-70 transition-opacity">
          <Heart className="w-6 h-6" />
          <span className="text-[10px] font-bold">Vida</span>
        </div>
      </nav>
    </div>
  );
};

export default App;
