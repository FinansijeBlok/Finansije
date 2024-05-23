import React, {useState} from "react";
import "./App.css";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { Transaction } from "./transaction";
import { transformSync } from "@babel/core";


const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState <number | string>('');
  const [category, setCategory] = useState<string>('');

  const addTransaction = () => {

    if(description && amount){

        const newTransaction : Transaction = {
          id: transactions.length ? transactions[transactions.length - 1].id + 1 : 1,
          description,
          amount: Number(amount),
          category,
      };

      setTransactions([...transactions, newTransaction]);
      setDescription('');
      setAmount('');
      setCategory('');
    }



  };

  const deleteTransaction = (id: number) => {
    setTransactions(transactions.filter(trans => trans.id !== id));
  }

  const calculateTotal = () => {
    return transactions.reduce((total, transaction) => total + transaction.amount, 0);
  };



  return (
    <div className="App">
      <h1>Transaction Tracker</h1>
      <div>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
        type = "text"
        placeholder = "Category"
        value = {category}
        onChange={(e) => setCategory(e.target.value)}
        />

        <button onClick={addTransaction}>Add Transaction</button>
      </div>
      <h2>Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.description}: ${transaction.amount}
            <button onClick={() => deleteTransaction(transaction.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Total: ${calculateTotal()}</h2>
    </div>
  );
};

export default App;
