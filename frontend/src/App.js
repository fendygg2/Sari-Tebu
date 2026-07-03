import { BrowserRouter, Routes, Route } from "react-router-dom";

import Auth from "./pages/Auth/Auth";
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/Users/Users";
import CreateUser from "./pages/Users/CreateUser";
import Products from "./pages/Products/Products";
import CreateProduct from "./pages/Products/CreateProduct";

import MainLayout from "./layouts/MainLayout";
// import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Auth />} />

        {/* <Route element={<ProtectedRoute />}> */}
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/create" element={<CreateUser />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/create" element={<CreateProduct />} />
          </Route>
        {/* </Route> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;