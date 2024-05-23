import React, { useState } from "react";
import "./App.css";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { Transaction } from "./transaction";
import { transformSync } from "@babel/core";


const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number | string>('');
  const [category, setCategory] = useState<string>('');

  const addTransaction = () => {

    if (description && amount && Number(amount) > 0) {

      const newTransaction: Transaction = {
        id: transactions.length ? transactions[transactions.length - 1].id + 1 : 1,
        description: description[0].toUpperCase() + description.substring(1).toLowerCase(),
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
    return calculatePrihod() - calculateTrosak();
  };

  const calculatePrihod = () => {
    var prihodi = transactions.filter(trans => trans.category === 'Prihod');

    return prihodi.reduce((total, transaction) => total + transaction.amount, 0);
  };

  const calculateTrosak = () => {
    var troskovi = transactions.filter(trans => trans.category === 'Trosak');

    return troskovi.reduce((total, transaction) => total + transaction.amount, 0);
  };

  const Prihodi = () => {
    return transactions.filter(trans => trans.category === 'Prihod');
  }

  const Troskovi = () => {
    return transactions.filter(trans => trans.category === 'Trosak');
  }


  return (
    <div className="App">
      <h1>Transaction Tracker</h1>
      <div className = "input-container">

        <TextField id="outlined-basic" label="Amount" variant="outlined" type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />

        <FormControl>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value={'Prihod'}>Prihod</MenuItem>
            <MenuItem value={'Trosak'}>Trosak</MenuItem>
          </Select>
        </FormControl>

        <TextField id="outlined-basic" label="Description" variant="outlined" onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Description" value={description} />

        <Button variant="contained" onClick={addTransaction}>Add Transaction</Button>

      </div>

      <div id="transactions-list">

        <h2>Ukupni Prihodi: ${calculatePrihod()}</h2>

        <ul>
          {Prihodi().map((transaction) => (
            <li key={transaction.id} className="transaction-listItem">

              ({transaction.category}) {transaction.description}: ${transaction.amount}
              <Button className="delete-btn" variant="contained" color="error" onClick={() => deleteTransaction(transaction.id)}>Delete</Button>

            </li>

          ))}
        </ul>
      </div>

      <div id="transactions-list">
        <h2>Ukupni Troskovi: ${calculateTrosak()}</h2>
        <ul>
          {Troskovi().map((transaction) => (
            <li key={transaction.id} className="transaction-listItem">

              ({transaction.category}) {transaction.description}: ${transaction.amount}
              <Button className="delete-btn" variant="contained" color="error" onClick={() => deleteTransaction(transaction.id)}>Delete</Button>

            </li>

          ))}
        </ul>
      </div>



      <h2>Total: ${calculateTotal()}</h2>

    </div>
  );
};

export default App;
