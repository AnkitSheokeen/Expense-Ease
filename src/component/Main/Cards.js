import React from 'react';
import './style.css'; 

export default function Cards({ index, submission, handleDelete }) {
    return (
        <div className="card-custom">
            <div className={`card-icon ${submission.type === 'Income' ? 'income' : 'expense'}`}>
                {submission.type === 'Income' ? '₹' : '₹'}
            </div>
            <div className="card-content">
                <strong>{submission.category}</strong>
                <p>{submission.amount}₹ - {submission.date}</p>
            </div>
            <button className="card-delete-btn" onClick={() => handleDelete(index)}>
            <i className="fa-solid fa-trash"></i>
            </button>
        </div>
    );
}
