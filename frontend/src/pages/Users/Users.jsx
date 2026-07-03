import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../api/userAPI";
import "./Users.css";

export default function Users() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [tempStatus, setTempStatus] = useState("all");
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);

    try {
      const res = await getUsers({
        search,
        status: statusFilter === "all" ? "" : statusFilter,
      });

      setUsers(res?.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchUsers();
    }, 500);

    return () => clearTimeout(delay);
  }, [fetchUsers]);

  const applyFilter = () => {
    setStatusFilter(tempStatus);
    setShowFilter(false);
  };

  const resetFilter = () => {
    setTempStatus("all");
    setStatusFilter("all");
  };

  return (
    <div className="users-page">

      <div className="users-header">
        <h4>Daftar Pengguna</h4>
        <p>Beranda • Pengguna</p>
      </div>

      <div className="card-box mt-3">

        <div className="users-actions">

          <input
            className="search-input"
            placeholder="Cari Pengguna"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            className="btn btn-light"
            onClick={() => setShowFilter(!showFilter)}
          >
            Filter
          </button>

          <button
            className="btn btn-primary ms-auto"
            onClick={() => navigate("/users/create")}
          >
            + Tambah Pengguna
          </button>

          {showFilter && (
            <div className="filter-box">
              <h6>Status</h6>

              <div className="filter-options">

                <div
                  className={`filter-item ${tempStatus === "all" ? "active" : ""}`}
                  onClick={() => setTempStatus("all")}
                >
                  Semua
                </div>

                <div
                  className={`filter-item ${tempStatus === "active" ? "active" : ""}`}
                  onClick={() => setTempStatus("active")}
                >
                  Aktif
                </div>

                <div
                  className={`filter-item ${tempStatus === "inactive" ? "active" : ""}`}
                  onClick={() => setTempStatus("inactive")}
                >
                  Tidak Aktif
                </div>

              </div>

              <div className="filter-actions">
                <button className="btn btn-light" onClick={resetFilter}>
                  Reset
                </button>

                <button className="btn btn-primary" onClick={applyFilter}>
                  Terapkan
                </button>
              </div>
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center mt-4">Loading...</div>
        ) : users.length === 0 ? (
          <div className="text-center mt-4 text-muted">
            Data tidak ditemukan
          </div>
        ) : (
          <table className="table mt-3">
            <thead>
              <tr>
                <th>Username</th>
                <th>Nama</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.name}</td>

                  <td>
                    <span
                      className={
                        user.is_active ? "badge aktif" : "badge nonaktif"
                      }
                    >
                      {user.is_active ? "Aktif" : "Tidak Aktif"}
                    </span>
                  </td>

                  <td>
                    <button className="btn-action">👁</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </div>
  );
}