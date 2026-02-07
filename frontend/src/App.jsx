import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CurrencyProvider } from './contexts/CurrencyContext';
import PublicLayout from './layouts/PublicLayout';
import ClientLayout from './layouts/ClientLayout';
import EmployeeLayout from './layouts/EmployeeLayout';
import BranchLayout from './layouts/BranchLayout';
import BranchRoute from './components/branch/BranchRoute';
import BranchLogin from './pages/branch/BranchLogin';
import BranchUnauthorized from './pages/branch/BranchUnauthorized';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SearchResults from './pages/SearchResults';
import VehicleDetails from './pages/VehicleDetails';
import Booking from './pages/Booking';
import PaymentStatus from './pages/PaymentStatus';
import MyBookings from './pages/MyBookings';
import Profile from './pages/Profile';
import EmployeeLogin from './pages/employee/EmployeeLogin';
import EmployeeRoute from './components/employee/EmployeeRoute';
import Dashboard from './pages/employee/Dashboard';
import MyShifts from './pages/employee/MyShifts';
import AssignedVehicles from './pages/employee/AssignedVehicles';
import LiveTracking from './pages/employee/LiveTracking';
import CheckInOut from './pages/employee/CheckInOut';
import Documents from './pages/employee/Documents';
import EmployeeProfile from './pages/employee/EmployeeProfile';
import Unauthorized from './pages/employee/Unauthorized';
import BranchDashboard from './pages/branch/Dashboard';
import BranchInventory from './pages/branch/Inventory';
import VehicleAllocation from './pages/branch/VehicleAllocation';
import Pricing from './pages/branch/Pricing';
import Employees from './pages/branch/Employees';
import Reports from './pages/branch/Reports';
import BranchProfile from './pages/branch/BranchProfile';

function App() {
  return (
    <CurrencyProvider>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/vehicle/:id" element={<VehicleDetails />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/payment-status" element={<PaymentStatus />} />
        </Route>

        {/* Client/Authenticated Routes */}
        <Route element={<ClientLayout />}>
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Employee Portal Routes */}
        <Route path="/employee/login" element={<EmployeeLogin />} />
        <Route path="/employee/unauthorized" element={<Unauthorized />} />
        <Route
          path="/employee/*"
          element={
            <EmployeeRoute>
              <EmployeeLayout />
            </EmployeeRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="my-shifts" element={<MyShifts />} />
          <Route path="assigned-vehicles" element={<AssignedVehicles />} />
          <Route path="tracking" element={<LiveTracking />} />
          <Route path="check-in-out" element={<CheckInOut />} />
          <Route path="documents" element={<Documents />} />
          <Route path="profile" element={<EmployeeProfile />} />
        </Route>

        {/* Branch Portal Routes */}
        <Route path="/branch/login" element={<BranchLogin />} />
        <Route path="/branch/unauthorized" element={<BranchUnauthorized />} />
        <Route
          path="/branch/*"
          element={
            <BranchRoute>
              <BranchLayout />
            </BranchRoute>
          }
        >
          <Route index element={<BranchDashboard />} />
          <Route path="inventory" element={<BranchInventory />} />
          <Route path="allocation" element={<VehicleAllocation />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="employees" element={<Employees />} />
          <Route path="reports" element={<Reports />} />
          <Route path="profile" element={<BranchProfile />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </CurrencyProvider>
  );
}

export default App;