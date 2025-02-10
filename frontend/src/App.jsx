import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./contexts/AuthProvider";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import TradingPage from "./pages/TradingPage";
import PortfolioPage from "./pages/PortfolioPage";
import TransactionHistoryPage from "./pages/TransactionHistoryPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import PrivateRoute from "./components/Common/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Private Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/trading"
            element={
              <PrivateRoute>
                <TradingPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/portfolio"
            element={
              <PrivateRoute>
                <PortfolioPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <PrivateRoute>
                <TransactionHistoryPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <PrivateRoute>
                <LeaderboardPage />
              </PrivateRoute>
            }
          />

          {/* Redirect to Login if route not found */}
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
