import { useState, useEffect } from 'react';

export default function HooksDemo() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`Count thay đổi: ${count}`);
  }, [count]);

  return (
    <div>
      <h2>Hooks Demo</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Tăng</button>
    </div>
  );
}