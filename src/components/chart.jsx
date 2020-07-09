import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function Chart({ list, color }) {

  console.log(list);
   
  
  return (
    <ResponsiveContainer>
      <LineChart data={list}>
        <Line type="monotone" dataKey="growthPct" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>

  );
}

export default Chart;