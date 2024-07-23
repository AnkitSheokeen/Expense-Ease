import React, { useEffect, useState } from 'react'
import Cards from './Cards';


export default function Main(props) {
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [submissions, setSubmissions] = useState(() => {
        const savedSubmissions = localStorage.getItem('submissions');
        return savedSubmissions ? JSON.parse(savedSubmissions) : [];
    });
    

    const handleTypeChange = (e) => {
        setType(e.target.value);
        setCategory('');
    };
      const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };
    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };


    const handleSubmit = () => {
        if (type && category && amount) {
            const newSubmission = { type, category, amount: parseFloat(amount), date };
            const updatedSubmissions = [...submissions, newSubmission];
            setSubmissions(updatedSubmissions);
            localStorage.setItem('submissions', JSON.stringify(updatedSubmissions));
            setType('');
            setCategory('');
            setAmount('');
            setDate('');
            props.showAlert('Added Succsessfully', 'success');
        } else {
            props.showAlert('Please fill out all fields', 'danger');
        }
    };
    const handleDelete = (index) => {
        const newSubmissions = submissions.filter((_, i) => i !== index);
        setSubmissions(newSubmissions);
        localStorage.setItem('submissions', JSON.stringify(newSubmissions));
    };

    useEffect(() => {
        let newBalance = 0;
        const incomeData = {};
        const expenseData = {};

        submissions.forEach((submission) => {
            if (submission.type === 'Income') {
                newBalance += submission.amount;
                if (incomeData[submission.category]) {
                    incomeData[submission.category] += submission.amount;
                } else {
                    incomeData[submission.category] = submission.amount;
                }
            } else if (submission.type === 'Expense') {
                newBalance -= submission.amount;
                if (expenseData[submission.category]) {
                    expenseData[submission.category] += submission.amount;
                } else {
                    expenseData[submission.category] = submission.amount;
                }
            }
        });

        props.setBalance(newBalance);
        props.setIncome(incomeData);
        props.setExpenses(expenseData);
    }, [submissions, props]);

    const incomeCategories = ['Salary', 'Bonus','Business', 'Gifts', 'Saving', 'Passive income','Freelance', 'Investments'];
    const expenseCategories = ['Car','EMI', 'Cloths', 'Travel', 'MF', 'Shopping', 'Outing','Food', 'Rent', 'Utilities', 'Other'];    
  
    return (
    <div className="card">
        <div className="card-header">
            <strong className='h3 text-left'>Expense Tracker</strong>
        </div>
        <div className="card-body text-center">
            <h5 className="card-title">Total Balance: {props.balance}₹</h5>
            <p className="card-text text-muted ">Update your expenses</p>  
        </div>

        <div className="container mt-5">
            <form>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="type" className="form-label">Type</label>
                        <select id="type" className="form-select" value={type} onChange={handleTypeChange}>
                            <option value="" disabled hidden>Choose...</option>
                            <option value="Income">Income</option>
                            <option value="Expense">Expense</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select id="category" className="form-select" value={category} onChange={handleCategoryChange} disabled={!type} placeholder="Choose...">
                        <option value="" disabled hidden>Choose...</option>
                        {
                            (type === 'Income' ? incomeCategories : expenseCategories).map((categoryOption, index) => (
                                <option key={index} value={categoryOption}>{categoryOption}</option>
                            ))
                        }
                        </select>
                    </div>
                    
                
                    <div className="col-md-6 my-4">
                        <label htmlFor="amount" className="form-label">Amount</label>
                        <input type="number" className="form-control" id="amount" value={amount} onChange={handleAmountChange} placeholder="Amount"/>
                    </div>
                    <div className="col-md-6 my-4">
                        <label htmlFor="date" className="form-label">Date</label>
                        <input type="date" className="form-control" id="date" value={date} onChange={(e) => setDate(e.target.value)}/>
                    </div>
                </div>
            </form>
        </div>
        <div className="container" style={{ maxHeight: '150px', overflowY: 'scroll', marginBottom: '2px' }}>
            {submissions.slice().reverse().map((submission, index) => (
                <Cards key={index} submission={submission} index={submissions.length - 1 - index} handleDelete={handleDelete} />
            ))}
        </div>
        <div className="card-footer text-muted bg-white text-center">
            <button type="button" className="btn btn-primary  btn-block w-100" onClick={handleSubmit}>Submit</button>
        </div>  
    </div>
  )
}
