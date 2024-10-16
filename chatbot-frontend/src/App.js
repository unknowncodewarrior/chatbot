import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateBusinessPage from "./pages/CreateBusinessPage";
import AdminPage from "./pages/AdminPage";
import BusinessBotPage from "./pages/BusinessBotPage";
import ChatPage from './pages/ChatPage';
import IndexPage from "./pages";

const App = () => {
  return (
    <Router>
       <Routes>
        <Route path="/create-business" element={<CreateBusinessPage />} />
        <Route path="/admin" element={<AdminPage />} /> 
        <Route path="/business/:businessId" element={<BusinessBotPage />} />
        <Route path="/chat/:businessId" element={<ChatPage />} />
        <Route path="/" element={<IndexPage />} /> 
      </Routes>
    </Router>
  );
};

export default App;
