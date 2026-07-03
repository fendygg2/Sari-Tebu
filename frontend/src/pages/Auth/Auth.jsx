import { useState } from "react";
import { loginApi, registerApi } from "../../api/authAPI";
import { saveToken } from "../../utils/storage";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import logo from "./Logo sari tebu.svg";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    fullname: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      const res = await loginApi(form);

      if (res.status === "success") {
        saveToken(res.data);
        navigate("/dashboard");
      } else {
        alert("Login gagal");
      }
    } else {
      const res = await registerApi(form);

      if (res.status === "success") {
        alert("Register berhasil");
        setIsLogin(true);
      } else {
        alert("Register gagal");
      }
    }
  };

  return (
    <div className="auth-page-container position-relative p-0">
      
      <div>
        <div className="col-md-7 d-none d-md-block left-side">
        </div>
        <div className="col-md-5 bg-white d-none d-md-block"></div>
      </div>

      <div 
        className="position-absolute top-50 start-50 translate-middle w-100 px-3" 
        style={{ maxWidth: "450px", zIndex: 10 }}
      >
        <div className="auth-card slide-once bg-white p-4 p-md-5 shadow-lg" style={{ borderRadius: "20px" }}>
          
          <div className="d-flex justify-content-center align-items-center mb-4">
            <img src={logo} alt="Logo" width="50" height="50" className="me-2" />
            <h2 className="fw-bold m-0" style={{ color: "#1b5e20" }}>Sari Tebu</h2>
          </div>

          <div className="auth-tabs mb-4">
            <div 
              className="auth-slider"
              style={{ left: isLogin ? "0%" : "50%" }}
            ></div>

            <button
              className={`tab ${isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>

            <button
              className={`tab ${!isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          <h3 className="fw-bold text-center mb-4">
            {isLogin ? "Selamat Datang" : "Buat Akun"}
          </h3>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <input
                className="form-control mb-3"
                placeholder="Nama Lengkap"
                onChange={(e) =>
                  setForm({ ...form, fullname: e.target.value })
                }
              />
            )}

            <input
              className="form-control mb-3"
              placeholder="Username"
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
            />

            <input
              type="password"
              className="form-control mb-4"
              placeholder="Password"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <button className="btn btn-primary w-100">
              {isLogin ? "Masuk" : "Daftar"}
            </button>

          </form>
        </div>
      </div>

    </div>
  );
}