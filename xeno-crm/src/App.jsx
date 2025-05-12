import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Campaigns from "./pages/Campaigns";
import DataIngestion from "./pages/DataIngestion";
import OrderList from "./pages/OrderList";
import CampaignCreation from "./pages/CampaignCreation";
import CampaignHistory from "./pages/CampaignHistory";
import AISuggestions from "./pages/AISuggestions";
import CampaignPreview from "./pages/CampaignPreview";
import CampaignAnalytics from "./pages/CampaignAnalytics";
import Login from "./pages/Login";

// Layout wrapper for all authenticated pages
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 bg-gray-600 hidden md:flex">
          <Sidebar />
        </div>
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
          {children}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/campaigns"
          element={
            <Layout>
              <Campaigns />
            </Layout>
          }
        />
        <Route
          path="/ingestion"
          element={
            <Layout>
              <DataIngestion />
            </Layout>
          }
        />
        <Route
          path="/orders"
          element={
            <Layout>
              <OrderList />
            </Layout>
          }
        />
        <Route
          path="/create-campaign"
          element={
            <Layout>
              <CampaignCreation />
            </Layout>
          }
        />
        <Route
          path="/campaign-history"
          element={
            <Layout>
              <CampaignHistory />
            </Layout>
          }
        />
        <Route
          path="/ai-suggestions"
          element={
            <Layout>
              <AISuggestions />
            </Layout>
          }
        />
        <Route
          path="/campaign-preview"
          element={
            <Layout>
              <CampaignPreview />
            </Layout>
          }
        />
        <Route
          path="/analytics/:campaignId"
          element={
            <Layout>
              <CampaignAnalytics />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
