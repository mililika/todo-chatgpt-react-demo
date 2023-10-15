import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Registration from "./pages/Registration";
import UserPage from "./pages/UserPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Registration />} />
                <Route path="/user-page" element={<UserPage />} />
                <Route path="/" element={<div>Hello World!</div>} />
            </Routes>
        </Router>
    );
}

export default App;
