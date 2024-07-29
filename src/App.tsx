import { useEffect, useState } from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Report from './pages/Report';
import NoMatch from './pages/NoMatch';
import AppLayout from './components/layout/AppLayout';
import { theme } from './theme/theme';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { Transaction } from './types/index';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { formatMonth } from './utils/formatting';
import { Schema } from './validations/schema';

function App() {
  // firestoreエラーかどうかを判定する型ガード
  function isFireStoreError(
    err: unknown
  ): err is { code: string; message: string } {
    return typeof err === 'object' && err !== null && 'code' in err;
  }

  // ※読み込むときはTransaction型、書き込むときはバリデーションつきのSchema型
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Transactions'));
        const transactionsData = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          } as Transaction; // 型アサーション
        });
        console.log(transactionsData);
        setTransactions(transactionsData);
      } catch (err) {
        if (isFireStoreError(err)) {
          console.error('Firestoreエラー：', err);
        } else {
          console.error('一般的なエラー：', err);
        }
      }
    };
    fetchTransactions();
  }, []);

  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth));
  });

  // 取引を保存する処理
  const handleSaveTransaction = async (transaction: Schema) => {
    console.log(transaction);
    try {
      // firestoreにデータを保存
      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, 'Transactions'), transaction);
      console.log('Document written with ID: ', docRef.id);

      const newTransaction = {
        id: docRef.id,
        ...transaction,
      } as Transaction;
      //Schema型にはidが含まれないのでTransaction型として含まれたオブジェクトを生成
      setTransactions((prevTransaction) => [
        ...prevTransaction,
        newTransaction,
      ]);
    } catch (err) {
      if (isFireStoreError(err)) {
        console.error('Firestoreエラー：', err);
      } else {
        console.error('一般的なエラー：', err);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route
              index
              element={
                <Home
                  monthlyTransactions={monthlyTransactions}
                  setCurrentMonth={setCurrentMonth}
                  onSaveTransaction={handleSaveTransaction}
                  setSelectedTransaction={setSelectedTransaction}
                  selectedTransaction={selectedTransaction}
                />
              }
            />
            <Route path="/report" element={<Report />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
