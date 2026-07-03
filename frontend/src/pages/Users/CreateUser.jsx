import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../api/userAPI";

export default function CreateUser() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    is_active: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await createUser(form);

    if (res.status === "success") {
      navigate("/users");
    } else {
      alert("Gagal tambah user");
    }
  };

  return (
    <div className="card-box">

      <h4>Tambah Pengguna</h4>

      <form onSubmit={handleSubmit}>

        <input
          className="form-control mb-3"
          placeholder="Nama"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="form-control mb-3"
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <div className="mb-3">
          <label>
            <input
              type="radio"
              checked={form.is_active}
              onChange={() => setForm({ ...form, is_active: true })}
            />
            Aktif
          </label>

          <label className="ms-3">
            <input
              type="radio"
              checked={!form.is_active}
              onChange={() => setForm({ ...form, is_active: false })}
            />
            Tidak Aktif
          </label>
        </div>

        <button className="btn btn-primary">Kirim</button>
        <button
          type="button"
          className="btn btn-danger ms-2"
          onClick={() => navigate("/users")}
        >
          Kembali
        </button>

      </form>
    </div>
  );
}