import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ExploreNepal from './pages/ExploreNepal';
import ProblemsSolutions from './pages/ProblemsSolutions';
import LearningResources from './pages/LearningResources';
import AITutor from './pages/AITutor';
import About from './pages/About';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<ExploreNepal />} />
          <Route path="/problems" element={<ProblemsSolutions />} />
          <Route path="/resources" element={<LearningResources />} />
          <Route path="/ai" element={<AITutor />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;