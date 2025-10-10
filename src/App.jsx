import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Pages
import Dashboard from "./pages/Dashboard";
import LiveMoniter from "./pages/LiveMoniter";
import Alerts from "./pages/AlertScreen";
import UserManagement from "./pages/UserManagement";
import Settings from "./pages/Settings";

// Layout
import Layout from "./components/Layout";

function App() {


   return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/live" element={<LiveMoniter />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/user" element={<UserManagement />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
