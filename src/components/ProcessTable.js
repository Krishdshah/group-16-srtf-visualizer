import React from 'react';
import { motion } from 'framer-motion';

const ProcessTable = ({ processes, currentProcessId }) => {
  return (
    <div className="table-container">
      <h2>Processes Status</h2>
      <table>
        <thead>
          <tr>
            <th>Process</th>
            <th>Arrival Time</th>
            <th>Burst Time</th>
            <th>Remaining BT</th>
            <th>Completion Time</th>
            <th>Turn Around Time</th>
            <th>Waiting Time</th>
          </tr>
        </thead>
        <tbody>
          {processes.map((p) => (
            <motion.tr
              key={p.id}
              className={p.id === currentProcessId ? 'highlighted' : ''}
              layout
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <td style={{ color: p.color }}>P{p.id}</td>
              <td>{p.arrivalTime}</td>
              <td>{p.burstTime}</td>
              <td>{p.remainingTime}</td>
              <td>{p.completionTime === null ? '-' : p.completionTime}</td>
              <td>{p.turnAroundTime === null ? '-' : p.turnAroundTime}</td>
              <td>{p.waitingTime === null ? '-' : p.waitingTime}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProcessTable;