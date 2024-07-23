import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, title, amount }) => {
    const colors = [
        '#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', 
        '#9966FF', '#FF9F40', '#FF6384', '#36A2EB', 
        '#FF6384', '#FFCE56'
    ];

    const chartData = {
        labels: Object.keys(data),
        datasets: [
            {
                data: Object.values(data),
                backgroundColor: colors.slice(0, Object.keys(data).length),
                hoverBackgroundColor: colors.slice(0, Object.keys(data).length),
            },
        ],
    };

    const options = {
        animation: {
            duration: 100,
            easing: 'easeOutCubic', 
        },
        hover: {
            animationDuration: 0,
            
        },
        plugins: {
            tooltip: {
                enabled: true,
                mode: 'index',
                intersect: false,
                animation: false, // Disable tooltip animation
            },
        },
    };

    return (
        <div className="pie-chart-container">
            <h3>{title} {amount===0?'':`${amount}₹`}</h3>
            {Object.keys(data).length > 0 ? (
                <Pie data={chartData} options={options} />
            ) : (
                <p></p>
            )}
        </div>
    );
};

export default PieChart;
