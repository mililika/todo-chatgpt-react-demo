import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ChatGptInputForm from "./components/ChatGptInputForm";
import Home from "./components/Home";
import IdeaPlanner from "./components/IdeaPlanner";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import RegistrationForm from "./components/RegistrationForm";
import TodoAi from "./components/TodoAi";
import Welcome from "./components/Welcome";
import AuthProvider from "./contexts/AuthContext";

function App() {
    return (
        <div className="min-h-screen dark:bg-gray-800">
            <Router>
                <AuthProvider>
                    <Navbar />
                    <Routes>
                        <Route path="*" element={<NotFound />} />
                        <Route path="/" element={<Welcome />} />
                        <Route path="/chat" element={<ChatGptInputForm />} />
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
                            element={<PrivateRoute element={<TodoAi />} />}
                        />
                        <Route
                            path="/ideas-plan"
                            element={<PrivateRoute element={<IdeaPlanner />} />}
                        />
                    </Routes>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;
