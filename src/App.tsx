import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditCourse from './EditCourse';
import  './App.css';
import Home from './Home';
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element ={<Home />}/>
        <Route path="/edit-course" element={<EditCourse />} />
      </Routes>
    </Router>
  );
};

export default App;
