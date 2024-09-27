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
import MyReservationsPage from "./components/home/ReservationsPage";
import LoginModal from "./components/modals/LoginModal";
import SignupModal from "./components/modals/SignupModal";

function App() {
  return (
    <div className="app">
      <Header />
      <LoginModal />
      <SignupModal />
      <AddProperty />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/properties/:id" element={<PropertyDetail />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/chat" element={<Chat />} />
        <Route
          path="/conversationDetail/:id"
          element={<ConversationDetail />}
        />
        <Route path="/MyReservations" element={<MyReservationsPage />} />
        <Route path="/landlord/:id" element={<LandlordDetailPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
