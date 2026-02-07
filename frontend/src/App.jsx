import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CurrencyProvider } from './contexts/CurrencyContext';
import PublicLayout from './layouts/PublicLayout';
import ClientLayout from './layouts/ClientLayout';
import EmployeeLayout from './layouts/EmployeeLayout';
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

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </CurrencyProvider>
  );
}

export default App;