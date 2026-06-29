import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import AboutSection from "./pages/public/About";
import LocationPage from "./pages/public/Location";
import AdminLayout from "./components/layout/AdminLayout";
import AdminInventory from './pages/admin/Inventory';
import AdminDashboard from './pages/admin/Dashboard';
import AdminOrders from './pages/admin/Orders';
import AdminUsers from './pages/admin/Users';
import Login from './pages/public/LoginAdmin';
import AdminStores from './pages/admin/Stores';
import Home from "./pages/public/Home";
import UserLayout from './components/layout/UserLayout'
import UserProfile from './pages/user/Profile'
import UserOrders from './pages/user/OrdersU'
import PastelesPage from './pages/public/Pasteles';
import Postres from './pages/public/Postres';
import Checkout from './pages/public/Checkout';
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="login" element={<Login />}></Route>

        <Route path="/" element={<MainLayout />}>

          <Route index element={<Home />} />
          <Route path="about" element={<AboutSection />} />
          <Route path="ubicanos" element={<LocationPage />} />
          <Route path="pasteles" element={<PastelesPage />} />
          <Route path="postres" element={<Postres />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="account" element={<UserLayout />}>

            <Route index element={<UserProfile />} />
            <Route path="orders" element={<UserOrders />} />

          </Route>

        </Route>

        <Route path="/admin" element={<AdminLayout />}>

          <Route index element={<AdminDashboard />} />
          <Route path="inventory" element={<AdminInventory />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="stores" element={<AdminStores />} />
          <Route path="users" element={<AdminUsers />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;