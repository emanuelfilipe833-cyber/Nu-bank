
export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
