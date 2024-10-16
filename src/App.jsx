import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "./redux/authSlice";
import Home from "./pages/home/Home";
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

// ---------------------------------- ----------- -------------------------------------//
// ---------------------------------- components -------------------------------------//
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
import PropertyContainer from "./pages/category/CategoryPage";
import UserProfile from "./components/userprofile/UserProfile";
import MyFavoritesPage from "./components/home/MyFavoritesPage";
import AddAdsModal from "./components/modals/AddAdsModal";
import ContactSupport from "./components/ContactSupport"; 
import TermsPage from "./components/terms/TermsPage";
import Team from "./components/home/Team";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./theme"; 

function App() {
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(false); 

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className={`app ${darkMode ? "dark-mode" : ""}`}> 
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} /> 
        <LoginModal />
        <SignupModal />
        <PasswordResetModal />
        <AddProperty />
        <FilterModal />
        <AddAdsModal />

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
          theme={darkMode ? "dark" : "colored"}
        />

        <Routes>
          <Route path="/reset-password/:uid/:token/" element={<ResetPasswordConfirm />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          <Route path="/properties" element={<PropertyContainer />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/conversationDetail/:id" element={<ConversationDetail />} />
          <Route path="/MyReservations" element={<MyReservationsPage />} />
          <Route path="/landlord/:id" element={<LandlordDetailPage />} />
          <Route path="/payment" element={<BookingPage />} />
          <Route path="/my-favorites" element={<MyFavoritesPage />} />
          <Route path="/contact-support" element={<ContactSupport />} /> 
          <Route path="terms" element={<TermsPage/>} />
          <Route path="team" element={<Team/>} />

        </Routes>
        <Footer darkMode={darkMode} />
      </div>
    </ThemeProvider>
  );
}

export default App;