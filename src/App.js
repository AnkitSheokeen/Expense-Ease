
import { useState} from 'react';
import './App.css';
import Main from './component/Main/Main';
import PieChart from './component/PieChart/PieChart';
import Alert from './component/Alert';


function App() {


  const [income, setIncome] = useState({});
  const [expenses, setExpenses] = useState({});
  const [balance, setBalance] = useState(0);

  const calculateTotal = (data) => {
    return Object.values(data).reduce((total, amount) => total + amount, 0);
  };

  const totalIncome = calculateTotal(income);
  const totalExpenses = calculateTotal(expenses);

  const [alert, setAlert] = useState(); //alert message
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    })
  }

  return (
    <>
    <div className='app'>
      <div className='floating-container'>
        <Main setBalance={setBalance} setIncome={setIncome} setExpenses={setExpenses} balance={balance} showAlert={showAlert}/>
      </div>
      <div className='income-container'>
        <PieChart data={income} amount={totalIncome} title="Income" />
      </div>
        <div className='expenses-container'>
      <PieChart data={expenses} amount={totalExpenses} title="Expense" />
      </div>
      <Alert alert={alert}/>
    </div>
    
    </>
  );
}

export default App;
