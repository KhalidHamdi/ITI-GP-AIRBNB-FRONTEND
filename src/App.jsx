import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

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
import PasswordResetModal from "./components/modals/PasswordResetModal";
import ResetPasswordConfirm from "./components/modals/ResetPasswordConfirm";
import LandlordDetailPage from "./pages/landlord/LandlordDetailPage";
import BookingPage from "./components/payment/BookingPage";
import FilterModal from "./components/modals/FilterModal";
import PropertyContainer from "./pages/category/CategoryPage"; // Import PropertyContainer
import UserProfile from "./components/userprofile/UserProfile";
import MyFavoritesPage from "./components/home/MyFavoritesPage";

function App() {
  return (
    <div className="app">
      <Header />
      <LoginModal />
      <SignupModal />
      <PasswordResetModal />
      <AddProperty />
      <FilterModal />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Routes>
        <Route
          path="/reset-password/:uid/:token/"
          element={<ResetPasswordConfirm />}
        />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/properties/:id" element={<PropertyDetail />} />
        <Route path="/properties" element={<PropertyContainer />} />{" "}
        {/* New route */}
        <Route path="/properties" element={<PropertyContainer />} />{" "}
        {/* New route */}
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/chat" element={<Chat />} />
        <Route
          path="/conversationDetail/:id"
          element={<ConversationDetail />}
        />
        <Route path="/MyReservations" element={<MyReservationsPage />} />
        <Route path="/landlord/:id" element={<LandlordDetailPage />} />
        <Route path="/payment" element={<BookingPage />} />
        <Route path="/my-favorites" element={<MyFavoritesPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
