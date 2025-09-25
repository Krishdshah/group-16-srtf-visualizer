import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GanttChart = ({ ganttChartData }) => {
  return (
    <div className="gantt-container">
      <h2>Gantt Chart</h2>
      <div className="gantt-chart">
        <AnimatePresence>
          {ganttChartData.map((block, index) => (
            <motion.div
              key={index}
              className="gantt-block"
              style={{ background: block.color, width: `${block.duration * 25}px` }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              title={`P${block.processId} (${block.start}-${block.end})`}
            >
              P{block.processId}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="gantt-timeline">
        {Array.from({ length: 30 }, (_, i) => (
          <div key={i} className="timeline-mark">
            <span>{i}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GanttChart;