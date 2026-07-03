import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../api/productAPI";
import "./CreateProduct.css";

export default function CreateProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("image", image);

    await createProduct(formData);
    navigate("/products");
  };

  return (
    <div className="create-product">

      <div className="products-header">
        <h4>Tambah Produk</h4>
      </div>

      <div className="card-box mt-3">
        <h5>Tambah</h5>

        <form onSubmit={handleSubmit}>

          <div className="upload-box">
            <input type="file" onChange={handleImage} />
            {preview ? <img src={preview} alt="preview" /> : <span>Pilih Gambar</span>}
          </div>

          <input
            className="form-control mt-3"
            placeholder="Nama"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <textarea
            className="form-control mt-3"
            placeholder="Deskripsi"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <div className="mt-3">
            <button className="btn btn-primary">Kirim</button>
            <button
              type="button"
              className="btn btn-danger ms-2"
              onClick={() => navigate("/products")}
            >
              Kembali
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}