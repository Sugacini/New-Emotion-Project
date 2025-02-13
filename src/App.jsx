import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function DynamicComponent({ id }) {
  return <div className="dynamic">📌 New Div {id}</div>;
}

function App() {
  const [components, setComponents] = useState([]);

  const addDiv = () => {
    const newComponent = <DynamicComponent key={components.length} id={components.length + 1} />;
    setComponents([...components, newComponent]); // Append new div as a component
  };

  return (
    <div className="container">
      <button onClick={addDiv}>➕ Add Div</button>
      <div className="component-container">
        {components}
      </div>
    </div>
  );
}

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

export default App
