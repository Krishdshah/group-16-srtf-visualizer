import React, { useState, useEffect, useCallback } from 'react';
import ProcessTable from './components/ProcessTable';
import GanttChart from './components/GanttChart';
import Controls from './components/Controls';
import Metrics from './components/Metrics';
import './App.css';

const initialProcesses = [
  { id: 1, arrivalTime: 0, burstTime: 8, priority: 0, color: '#ffadad' },
  { id: 2, arrivalTime: 1, burstTime: 4, priority: 0, color: '#ffd6a5' },
  { id: 3, arrivalTime: 2, burstTime: 9, priority: 0, color: '#caffbf' },
  { id: 4, arrivalTime: 3, burstTime: 5, priority: 0, color: '#9bf6ff' },
];

const App = () => {
  const [processes, setProcesses] = useState([]);
  const [time, setTime] = useState(0);
  const [currentProcessId, setCurrentProcessId] = useState(null);
  const [ganttChartData, setGanttChartData] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [log, setLog] = useState("Click 'Start' to begin the simulation.");

  const resetState = useCallback(() => {
    setProcesses(
      initialProcesses.map((p) => ({
        ...p,
        remainingTime: p.burstTime,
        completionTime: null,
        turnAroundTime: null,
        waitingTime: null,
      }))
    );
    setTime(0);
    setCurrentProcessId(null);
    setGanttChartData([]);
    setIsRunning(false);
    setIsFinished(false);
    setLog("Click 'Start' to begin the simulation.");
  }, []);

  useEffect(() => {
    resetState();
  }, [resetState]);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      let readyQueue = processes.filter(
        (p) => p.arrivalTime <= time && p.remainingTime > 0
      );

      if (readyQueue.length === 0) {
        if (processes.every((p) => p.remainingTime === 0)) {
          setIsRunning(false);
          setIsFinished(true);
          setLog('✅ All processes completed!');
          setCurrentProcessId(null);
          clearInterval(timer);
        } else {
          setLog(`CPU is idle at time ${time}.`);
          setTime((t) => t + 1);
        }
        return;
      }

      readyQueue.sort((a, b) => a.remainingTime - b.remainingTime);
      const shortestJob = readyQueue[0];

      if (shortestJob.id !== currentProcessId) {
        setLog(
          `Time ${time}: Process P${shortestJob.id} preempts/starts (Remaining: ${shortestJob.remainingTime}).`
        );
        setCurrentProcessId(shortestJob.id);
      }

      // Update Gantt Chart
      setGanttChartData((prev) => {
          const lastBlock = prev[prev.length - 1];
          if (lastBlock && lastBlock.processId === shortestJob.id) {
              lastBlock.end = time + 1;
              lastBlock.duration = lastBlock.end - lastBlock.start;
              return [...prev.slice(0, -1), lastBlock];
          } else {
              return [...prev, { processId: shortestJob.id, color: shortestJob.color, start: time, end: time + 1, duration: 1 }];
          }
      });

      // Update process state
      setProcesses((prev) =>
        prev.map((p) => {
          if (p.id === shortestJob.id) {
            const newRemainingTime = p.remainingTime - 1;
            if (newRemainingTime === 0) {
              const completionTime = time + 1;
              const turnAroundTime = completionTime - p.arrivalTime;
              const waitingTime = turnAroundTime - p.burstTime;
              setLog(`Time ${time + 1}: Process P${p.id} finished. 🏁`);
              return { ...p, remainingTime: 0, completionTime, turnAroundTime, waitingTime };
            }
            return { ...p, remainingTime: newRemainingTime };
          }
          return p;
        })
      );

      setTime((t) => t + 1);
    }, 800); // Animation speed: 800ms per time unit

    return () => clearInterval(timer);
  }, [isRunning, time, processes, currentProcessId]);

  return (
    <div className="App">
      <header>
        <h1>Shortest Remaining Time First (SRTF)</h1>
        <h2>(Preemptive CPU Scheduling)</h2>
      </header>
      <main>
        <Controls
          onStart={() => setIsRunning(true)}
          onReset={resetState}
          isRunning={isRunning}
          isFinished={isFinished}
        />
        <div className="log-box">
          <p><strong>Current Time: {time}</strong> | {log}</p>
        </div>
        <div className="content-wrapper">
          <ProcessTable processes={processes} currentProcessId={currentProcessId} />
          <GanttChart ganttChartData={ganttChartData} />
          <Metrics processes={processes} isFinished={isFinished} />
        </div>
      </main>
    </div>
  );
};

export default App;