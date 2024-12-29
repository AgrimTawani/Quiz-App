import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Modal, Subjects, WaitingScreen, GamePage, Result } from './components';

const App = () => {

  return (
    <Router>
      <Routes>
        {/* Redirect to /subjects if authenticated, otherwise show Modal */}
        <Route 
          path="/" 
          element={<Modal />} 
        />
        {/* Normal routes without protection */}
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/waiting/:subject" element={<WaitingScreen />} />
        <Route path="/game/:room" element={<GamePage />} />
        <Route path="/result/:room" element={<Result />} />
      </Routes>
    </Router>
  );
};

export default App;
