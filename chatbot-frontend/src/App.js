import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateBusiness from './pages/CreateBusiness';
import AdminPage from './pages/AdminPage';
import ChatPage from './pages/ChatPage';
import UserPage from "./pages/User";

const App = () => {
  return (
    
    <Router>
       <Routes>
        <Route path="/create-business" element={<CreateBusiness />} />
        <Route path="/admin/:businessId" element={<AdminPage />} />
        <Route path="/chat/:businessId" element={<ChatPage />} />
        <Route path="/create-user/:businessName" element={<UserPage />} /> 
      </Routes>
    </Router>
  );
};

export default App;
