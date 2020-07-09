import React from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip } from 'recharts';

function CountryChart({ data }) {
  console.log(data);

  return (
    <div>
      <LineChart width={500} height={300} data={data}>
        <Line type="monotone" dataKey="cases" stroke="#8884d8" />
        <Line type="monotone" dataKey="deaths" stroke="#82ca9d" />
        <Line type="monotone" dataKey="recovered" stroke="#82ca9d" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name"/>
        <YAxis/>
        <Tooltip />
      </LineChart>

    </div>
  );
};

export default CountryChart;