import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import CategoryPage from "./pages/category/CategoryPage";
import PropertyDetail from "./pages/property/PropertyDetail";
import Header from "./components/home/Header";
import Footer from "./components/home/Footer";
import AddProperty from "./components/property/addProperty";
import Chat from "./pages/chat/chat";
import ConversationDetail from "./components/chat/conversationDetails";

function App() {
  return (
    <div className="app">
      <Header />
      <AddProperty />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/properties/:id" element={<PropertyDetail />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/conversationDetail" element={<ConversationDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
