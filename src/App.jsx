import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ModuleViewer from './pages/ModuleViewer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/module/:moduleId" element={<ModuleViewer />} />
      </Routes>
    </Router>
  );
}

export default App;
