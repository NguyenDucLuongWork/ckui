import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ReduxToolkitDemo from './components/ReduxToolkitDemo';
import ReactRouterDemo from './components/ReactRouterDemo';
import TailwindCSSDemo from './components/TailwindCSSDemo';
import HooksDemo from './components/HooksDemo';
import CustomHookDemo from './components/CustomHookDemo';
import FetchAPIDemo from './components/FetchAPIDemo';

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/redux-toolkit">Redux Toolkit</Link></li>
            <li><Link to="/react-router">React Router</Link></li>
            <li><Link to="/tailwind-css">Tailwind CSS</Link></li>
            <li><Link to="/hooks">Hooks</Link></li>
            <li><Link to="/custom-hook">Custom Hook</Link></li>
            <li><Link to="/fetch-api">Fetch API</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/redux-toolkit" element={<ReduxToolkitDemo />} />
          <Route path="/react-router" element={<ReactRouterDemo />} />
          <Route path="/tailwind-css" element={<TailwindCSSDemo />} />
          <Route path="/hooks" element={<HooksDemo />} />
          <Route path="/custom-hook" element={<CustomHookDemo />} />
          <Route path="/fetch-api" element={<FetchAPIDemo />} />
          <Route path="/" element={<ReduxToolkitDemo />} />
        </Routes>
      </div>
    </Router>
  );
}