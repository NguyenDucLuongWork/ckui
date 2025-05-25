import { useState } from 'react';

// A simple custom hook to toggle state
function useToggle(initialState = false) {
  const [state, setState] = useState(initialState);
  
  // Function to toggle the state
  const toggle = () => {
    setState(prev => !prev);
  };
  
  return [state, toggle];
}

// Another simple custom hook for a counter
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}

export default function CustomHookDemo() {
  const [isVisible, toggle] = useToggle(true);
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Custom Hook Demo</h2>
      
      <div className="mb-6 p-4 border rounded">
        <h3 className="text-lg font-semibold mb-2">useToggle Hook</h3>
        <button 
          onClick={toggle}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Toggle Content
        </button>
        
        {isVisible && (
          <div className="mt-3 p-3 bg-gray-100 rounded">
            This content can be toggled on and off using our custom useToggle hook!
          </div>
        )}
      </div>
      
      <div className="p-4 border rounded">
        <h3 className="text-lg font-semibold mb-2">useCounter Hook</h3>
        <div className="flex items-center gap-3">
          <button 
            onClick={decrement}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            -
          </button>
          <span className="text-xl font-bold">{count}</span>
          <button 
            onClick={increment}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            +
          </button>
          <button 
            onClick={reset}
            className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}