import React from 'react';
import { motion } from 'framer-motion';

const Metrics = ({ processes, isFinished }) => {
  if (!isFinished) return null;

  const totalTAT = processes.reduce((sum, p) => sum + p.turnAroundTime, 0);
  const totalWT = processes.reduce((sum, p) => sum + p.waitingTime, 0);
  const avgTAT = (totalTAT / processes.length).toFixed(2);
  const avgWT = (totalWT / processes.length).toFixed(2);

  return (
    <motion.div
      className="metrics-container"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <h3>Final Metrics 📊</h3>
      <p><strong>Average Turn Around Time:</strong> {avgTAT} ms</p>
      <p><strong>Average Waiting Time:</strong> {avgWT} ms</p>
    </motion.div>
  );
};

export default Metrics;