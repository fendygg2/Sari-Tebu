import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../api/productAPI";
import "./Products.css";

export default function Products() {
  const navigate = useNavigate();
  const filterRef = useRef();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [showFilter, setShowFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [lossOnly, setLossOnly] = useState(false);

  const [tempStatus, setTempStatus] = useState("all");
  const [tempLoss, setTempLoss] = useState(false);

  useEffect(() => {
    const delay = setTimeout(async () => {
      setLoading(true);

      try {
        const res = await getProducts({
          search,
          status: statusFilter === "all" ? "" : statusFilter,
          loss: lossOnly,
        });

        setProducts(res?.data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [search, statusFilter, lossOnly]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="products-page">

      <div className="products-header">
        <h4>Daftar Produk</h4>
        <p>Beranda • Produk</p>
      </div>

      <div className="card-box mt-3">

        <div className="products-actions">

          <input
            className="search-input"
            placeholder="Cari Produk"
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
            onClick={() => navigate("/products/create")}
          >
            + Tambah Produk
          </button>

          {showFilter && (
            <div ref={filterRef} className="filter-box animate">

              <h6>Filter</h6>

              <p>Status</p>
              <div className="filter-radio">

                <label className={tempStatus === "all" ? "active" : ""}>
                  <input
                    type="radio"
                    checked={tempStatus === "all"}
                    onChange={() => setTempStatus("all")}
                  />
                  Semua
                </label>

                <label className={tempStatus === "active" ? "active" : ""}>
                  <input
                    type="radio"
                    checked={tempStatus === "active"}
                    onChange={() => setTempStatus("active")}
                  />
                  Aktif
                </label>

                <label className={tempStatus === "inactive" ? "active" : ""}>
                  <input
                    type="radio"
                    checked={tempStatus === "inactive"}
                    onChange={() => setTempStatus("inactive")}
                  />
                  Tidak Aktif
                </label>

              </div>

              <p className="mt-2">Jual Rugi</p>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={tempLoss}
                  onChange={() => setTempLoss(!tempLoss)}
                />
                <span className="slider"></span>
              </label>

              <div className="filter-actions">
                <button
                  className="btn btn-light"
                  onClick={() => {
                    setTempStatus("all");
                    setTempLoss(false);
                  }}
                >
                  Reset
                </button>

                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setStatusFilter(tempStatus);
                    setLossOnly(tempLoss);
                    setShowFilter(false);
                  }}
                >
                  Terapkan
                </button>
              </div>

            </div>
          )}

        </div>

        {loading ? (
          <div className="text-center mt-4">Loading...</div>
        ) : (
          <table className="table mt-3">
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </div>
  );
}