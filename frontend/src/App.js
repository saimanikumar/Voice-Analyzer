import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./style.scss";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Update from "./pages/Update";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import PaymentGateway from "./pages/PaymentGateway";
import Employ from "./pages/Employ";
import AddEmp from "./pages/AddEmp";
import NotFound from "./pages/NotFound";
import Speeches from "./pages/Speeches";
import { useAuth } from "./context/AuthContext";

const RequireAuth = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

function Layout() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/user/speeches" element={<RequireAuth><Speeches /></RequireAuth>} />
        <Route path="/user/update" element={<RequireAuth><Update /></RequireAuth>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/employ/edit/:id" element={<Employ />} />
        <Route path="/employ/add" element={<AddEmp />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="app">
      <div className="container">
        <Router>
          <Layout />
        </Router>
      </div>
    </div>
  );
}

export default App;
