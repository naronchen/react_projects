// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LineChart, Line } from 'recharts';
import Chart from 'chart.js/auto';
import React, { useRef, useEffect } from 'react';



const Charts = ({drink}) => {
    const chartRef = useRef();

    const extractPercentages = (drinkObj) => {
      const measures = [];
      let sum = 0;
      for (let i = 1; i <= 4; i++) {
        const strMeasure = drinkObj[`strMeasure${i}`];
        if (strMeasure) {
          const parts = strMeasure.split(' ');
          const floatPart = parseFloat(eval(parts[0]));
          sum += floatPart;
          measures.push(floatPart);
        }
      }
      return measures.map((float) => Math.round((float / sum) * 100));
    };
    
    const percentages = extractPercentages(drink);
    console.log('drink in charts: ', drink);
    useEffect(() => {
      const chartData = {
        labels: [drink.strIngredient1,
          drink.strIngredient2,
          drink.strIngredient3,
          drink.strIngredient4,
                ],
        datasets: [{
          data: [percentages[0], percentages[1], percentages[2], percentages[3]],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF1384'],
        }],
      };
  
      const chartOptions = {
        cutoutPercentage: 50,
      };
  
      const myChart = new Chart(chartRef.current, {
        type: 'doughnut',
        data: chartData,
        options: chartOptions,
      });
  
      return () => {
        myChart.destroy();
      };
    }, []);

    // const renderLineChart = (
    //   // <LineChart width={400} height={400} data={data}>
    //   //   <Line type="monotone" dataKey="uv" stroke="red" />
    //   // </LineChart>

    // );
    
    return (
      <div style={{ width: '300px' }}>
       <canvas ref={chartRef}></canvas>
      </div>
    );
  };
  export default Charts;