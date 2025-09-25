import React, { useState, useEffect, useCallback } from 'react';
import ProcessTable from './components/ProcessTable';
import GanttChart from './components/GanttChart';
import Controls from './components/Controls';
import Metrics from './components/Metrics';
import DeveloperPage from './components/DeveloperPage'; // Import the new component
import './App.css';

// Initial data for the processes
const initialProcesses = [
  { id: 1, arrivalTime: 0, burstTime: 8, priority: 0, color: '#ffadad' },
  { id: 2, arrivalTime: 1, burstTime: 4, priority: 0, color: '#ffd6a5' },
  { id: 3, arrivalTime: 2, burstTime: 9, priority: 0, color: '#caffbf' },
  { id: 4, arrivalTime: 3, burstTime: 5, priority: 0, color: '#9bf6ff' },
];

const App = () => {
  // State variables for the simulation
  const [processes, setProcesses] = useState([]);
  const [time, setTime] = useState(0);
  const [currentProcessId, setCurrentProcessId] = useState(null);
  const [ganttChartData, setGanttChartData] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [log, setLog] = useState("Click 'Start' to begin the simulation.");

  // Function to reset the simulation to its initial state
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

  // Effect to initialize the state when the component mounts
  useEffect(() => {
    resetState();
  }, [resetState]);

  // The main simulation logic effect
  useEffect(() => {
    if (!isRunning) return;

    // Set up an interval to tick every 800ms
    const timer = setInterval(() => {
      // Find processes that have arrived and are not yet completed
      let readyQueue = processes.filter(
        (p) => p.arrivalTime <= time && p.remainingTime > 0
      );

      // If no process is ready to run
      if (readyQueue.length === 0) {
        // Check if all processes are finished
        if (processes.every((p) => p.remainingTime === 0)) {
          setIsRunning(false);
          setIsFinished(true);
          setLog('✅ All processes completed!');
          setCurrentProcessId(null);
          clearInterval(timer);
        } else {
          // If processes are yet to arrive, CPU is idle
          setLog(`CPU is idle at time ${time}.`);
          setTime((t) => t + 1);
        }
        return;
      }

      // SRTF Logic: Sort the ready queue by the shortest remaining time
      readyQueue.sort((a, b) => a.remainingTime - b.remainingTime);
      const shortestJob = readyQueue[0];

      // Check for preemption or start of a new process
      if (shortestJob.id !== currentProcessId) {
        setLog(
          `Time ${time}: Process P${shortestJob.id} preempts/starts (Remaining: ${shortestJob.remainingTime}).`
        );
        setCurrentProcessId(shortestJob.id);
      }

      // Update the Gantt Chart data
      setGanttChartData((prev) => {
          const lastBlock = prev[prev.length - 1];
          // If the same process is running, extend its block
          if (lastBlock && lastBlock.processId === shortestJob.id) {
              lastBlock.end = time + 1;
              lastBlock.duration = lastBlock.end - lastBlock.start;
              return [...prev.slice(0, -1), lastBlock];
          } else {
              // Otherwise, add a new block for the new process
              return [...prev, { processId: shortestJob.id, color: shortestJob.color, start: time, end: time + 1, duration: 1 }];
          }
      });

      // Update the state of the running process
      setProcesses((prev) =>
        prev.map((p) => {
          if (p.id === shortestJob.id) {
            const newRemainingTime = p.remainingTime - 1;
            // If the process finishes in this tick
            if (newRemainingTime === 0) {
              const completionTime = time + 1;
              const turnAroundTime = completionTime - p.arrivalTime;
              const waitingTime = turnAroundTime - p.burstTime;
              setLog(`Time ${time + 1}: Process P${p.id} finished. 🏁`);
              return { ...p, remainingTime: 0, completionTime, turnAroundTime, waitingTime };
            }
            // Otherwise, just decrement its remaining time
            return { ...p, remainingTime: newRemainingTime };
          }
          return p;
        })
      );

      // Move time forward
      setTime((t) => t + 1);
    }, 800); // Animation speed: 800ms per time unit

    // Cleanup function to clear the interval
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
        
        {/* Render the Developer Page component at the bottom */}
        <DeveloperPage />

      </main>
    </div>
  );
};

export default App;