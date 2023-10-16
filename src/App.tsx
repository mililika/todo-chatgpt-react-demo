import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import PlanGenerator from "./components/PlanGenerator";
import PrivateRoute from "./components/PrivateRoute";
import RegistrationForm from "./components/RegistrationForm";
import Welcome from "./components/Welcome";
import AuthProvider from "./contexts/AuthContext";

function App() {
    return (
        <div className="h-screen dark:bg-gray-800">
            <Router>
                <AuthProvider>
                    <Navbar />
                    <Routes>
                        <Route path="*" element={<NotFound />} />
                        <Route path="/" element={<Welcome />} />
                        <Route
                            path="/register"
                            element={<RegistrationForm />}
                        />
                        <Route path="/login" element={<LoginForm />} />

                        <Route
                            path="/home"
                            element={<PrivateRoute element={<Home />} />}
                        />
                        <Route
                            path="/todo"
                            element={
                                <PrivateRoute element={<PlanGenerator />} />
                            }
                        />
                        <Route
                            path="/ideas-plan"
                            element={
                                <PrivateRoute element={<PlanGenerator />} />
                            }
                        />
                    </Routes>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;
