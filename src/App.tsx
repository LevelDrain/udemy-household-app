import { useEffect, useState } from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Report from './pages/Report';
import NoMatch from './pages/NoMatch';
import AppLayout from './components/layout/AppLayout';
import {theme} from './theme/theme'
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { Transaction } from './types/index';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

function App() {
    const[transactions, setTransactions]=useState<Transaction[]>([])

    useEffect(()=>{
        const fetchTransactions = async() =>{
            try{
                const querySnapshot = await getDocs(collection(db, 'Transactions'))
                querySnapshot.forEach((doc)=>{
                    console.log(doc.id, '=>', doc.data())
                })
            }catch(err){
                // error
            }
        }
        fetchTransactions()
    },[])

    return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
        <Routes>
            <Route path='/' element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path='/report' element={<Report />} />
            <Route path='*' element={<NoMatch />} />
            </Route>
        </Routes>
        </Router>
    </ThemeProvider>
    );
}

export default App;
