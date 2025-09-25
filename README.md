# SRTF Scheduling Algorithm Visualizer 📊

An interactive educational tool built with React to demonstrate the **Shortest Remaining Time First (SRTF)** CPU scheduling algorithm. This application provides a real-time, animated visualization of process execution, preemption, and the calculation of key performance metrics.

***

## Demo & Screenshots

This animation shows the SRTF algorithm in action, visualizing the preemption process as new jobs with shorter burst times arrive in the ready queue.

![SRTF Visualizer Screenshot]("SRTF Visualizer Screenshot.jpg")

*A full screen recording of the project is available in the file: `Group 16_Screen Recording.mp4`*

***

## ✨ Features

-   **Dynamic Process Table**: Watch the status of each process—including its Remaining Burst Time, Completion Time, Turn Around Time, and Waiting Time—update in real-time.
-   **Animated Gantt Chart**: A Gantt chart is built dynamically, block by block, showing which process is using the CPU at any given moment.
-   **Step-by-Step Log**: A clear, descriptive log explains every decision the scheduler makes, such as process arrival, execution, preemption, and completion.
-   **Preemption Visualization**: The currently executing process is highlighted, and context switches due to preemption are clearly shown.
-   **Final Metrics Calculation**: Once all processes are complete, the application automatically calculates and displays the **Average Turn Around Time** and **Average Waiting Time**.
-   **Interactive Controls**: Simple "Start" and "Reset" buttons give you full control over the simulation.

***

## 🛠️ Technology Stack

This project was built using modern web technologies:

-   **Frontend**: [React.js](https://reactjs.org/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Styling**: Plain CSS with a modern design
-   **Development Environment**: [Node.js](https://nodejs.org/) & [npm](https://www.npmjs.com/)

***

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

You need to have [Node.js](https://nodejs.org/en/download/) (which includes npm) installed on your computer.

### Installation & Setup

1.  **Clone the repository**
    ```sh
    git clone [https://github.com/your-username/srtf-visualizer.git](https://github.com/your-username/srtf-visualizer.git)
    ```

2.  **Navigate to the project directory**
    ```sh
    cd srtf-visualizer
    ```

3.  **Install NPM packages**
    ```sh
    npm install
    ```

4.  **Run the application**
    ```sh
    npm start
    ```
    The application will open automatically in your browser at `http://localhost:3000`.

***

## 🧑‍💻 Created By

This project was created by:

-   **Krish D Shah** (RA2411026010004)
-   **Naman Duhan** (RA2411026010004)