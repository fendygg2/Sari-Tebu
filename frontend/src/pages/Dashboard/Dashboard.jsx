import { useEffect, useState } from "react";
import { getDashboard } from "../../api/dashboardAPI";
import TransactionChart from "../../components/Chart/TransactionChart";
import "./Dashboard.css";

export default function Dashboard() {
  const [data, setData] = useState({
    customersDebt: [],
    suppliersDebt: [],
    transactions: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getDashboard();
      setData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="dashboard-content">

      <div className="row g-3">

        <div className="col-md-6">
          <div className="card-box">
            <h5>Hutang Pelanggan</h5>

            <div className="table-box mt-3">
              <div className="table-header">
                <span>Nama Pelanggan</span>
                <span>Total</span>
              </div>

              {data.customersDebt.length === 0 ? (
                <div className="table-empty">Data tidak ditemukan</div>
              ) : (
                data.customersDebt.map((item, i) => (
                  <div key={i} className="table-row">
                    <span>{item.name}</span>
                    <span>Rp {item.total}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card-box">
            <h5>Hutang Supplier</h5>

            <div className="table-box mt-3">
              <div className="table-header">
                <span>Nama Supplier</span>
                <span>Total</span>
              </div>

              {data.suppliersDebt.map((item, i) => (
                <div key={i} className="table-row">
                  <span className="link">{item.name}</span>
                  <span>Rp {item.total}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <div className="card-box mt-4">
        <h5>Ringkasan Transaksi</h5>

        <div className="chart-placeholder">
          {data.transactions.length > 0 ? (
            <TransactionChart data={data.transactions} />
          ) : (
            "Tidak ada data"
          )}
        </div>
      </div>

    </div>
  );
}