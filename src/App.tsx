import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AllUsersList from "./components/AllUsersList";
import LoginForm from "./components/LogInForm/LoginForm";
import PrivateRoute from "./components/PrivateRoute";
import AuthProvider from "./contexts/AuthContext";
import Registration from "./pages/Registration";
import UserPage from "./pages/UserPage";

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/register" element={<Registration />} />
                    <Route path="/login" element={<LoginForm />} />

                    <Route
                        path="/user-page"
                        element={<PrivateRoute element={<UserPage />} />}
                    />
                    <Route path="/" element={<div>Hello World!</div>} />
                    <Route
                        path="/users-list"
                        element={<PrivateRoute element={<AllUsersList />} />}
                    />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
