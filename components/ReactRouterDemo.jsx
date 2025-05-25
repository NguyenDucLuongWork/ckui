import { useNavigate } from 'react-router-dom';

export default function ReactRouterDemo() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>React Router Demo</h2>
      <button onClick={() => navigate('/hooks')}>Đi tới Hooks</button>
      <button onClick={() => navigate('/fetch-api')}>Đi tới Fetch API</button>
    </div>
  );
}