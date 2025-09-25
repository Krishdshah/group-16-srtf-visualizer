import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const PerformanceGraph = ({ processes, isFinished }) => {
  if (!isFinished) return null;

  // Format the data for the chart
  const chartData = processes.map(p => ({
    name: `P${p.id}`,
    'Turn Around Time': p.turnAroundTime,
    'Waiting Time': p.waitingTime,
  }));

  return (
    <motion.div
      className="graph-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.7 }}
    >
      <h3>Performance Metrics Graph</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="name" stroke="#f0f0f0" />
          <YAxis stroke="#f0f0f0" />
          <Tooltip 
            cursor={{fill: 'rgba(233, 69, 96, 0.1)'}}
            contentStyle={{ backgroundColor: '#16213e', border: '1px solid #0f3460' }} 
          />
          <Legend />
          <Bar dataKey="Turn Around Time" fill="#8884d8" />
          <Bar dataKey="Waiting Time" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default PerformanceGraph;