import React, { useState } from "react";
import axios from "axios";

const ProductDataForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const token = localStorage.getItem("authToken"); // Recuperar o token do Local Storage

  // Tratar evento de mudança nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Buscar produto pelo ID
  const handleSearch = async () => {
    if (!formData.id) {
      setResponseMessage("Por favor, informe o ID do produto.");
      return;
    }

    try {
      console.log("Buscando produto com ID:", formData.id);
      const response = await axios.get(
        `http://localhost:8080/products/getProductById`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: { id: formData.id },
        }
      );

      if (response.status === 200 && response.data) {
        const product = response.data;

        setFormData({
          id: formData.id,
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
        });

        setIsEditing(true);
        setResponseMessage("Produto encontrado com sucesso!");
      } else {
        setResponseMessage("Produto não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
      setResponseMessage("Falha ao conectar ao servidor.");
    }
  };

  // Atualizar produto
  const handleUpdate = async () => {
    try {
      console.log("Atualizando produto com ID:", formData.id);
      const response = await axios.put(
        `http://localhost:8080/products/updateProduct`,
        {
          id: formData.id,
          name: formData.name,
          description: formData.description,
          price: formData.price,
          stock: formData.stock,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setResponseMessage("Produto atualizado com sucesso!");
      } else {
        setResponseMessage("Erro ao atualizar produto.");
      }
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      setResponseMessage("Falha ao conectar ao servidor.");
    }
  };

  // Deletar produto
  const handleDelete = async () => {
    try {
      console.log("Deletando produto com ID:", formData.id);
      const response = await axios.delete(
        `http://localhost:8080/products/deleteProduct`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: { id: formData.id },
        }
      );

      if (response.status === 200) {
        setResponseMessage("Produto deletado com sucesso!");
        setFormData({ id: "", name: "", description: "", price: "", stock: "" });
        setIsEditing(false);
      } else {
        setResponseMessage("Erro ao deletar produto.");
      }
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      setResponseMessage("Falha ao conectar ao servidor.");
    }
  };

  // Limpar formulário
  const handleClear = () => {
    setFormData({ id: "", name: "", description: "", price: "", stock: "" });
    setResponseMessage("");
    setIsEditing(false);
  };

  return (
    <div className="card mx-auto" style={{ maxWidth: "400px" }}>
      <div className="card-body">
        <h5 className="card-title">Gerenciar Produtos</h5>
        <div className="user-account-form">
          <form>
            <div className="form-group">
              <label>ID do Produto (para busca): </label>
              <input
                className="form-control"
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
              />
              <button
                type="button"
                className="btn btn-info btn-block mt-2"
                onClick={handleSearch}
              >
                Buscar Produto
              </button>
            </div>
            <hr />
            {isEditing && (
              <>
                <div className="form-group">
                  <label>Produto: </label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <label>Descrição: </label>
                  <input
                    className="form-control"
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                  <label>Preço: </label>
                  <input
                    className="form-control"
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                  <label>Estoque: </label>
                  <input
                    className="form-control"
                    type="text"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-warning btn-block mt-3"
                  onClick={handleUpdate}
                >
                  Atualizar Produto
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-block mt-3"
                  onClick={handleDelete}
                >
                  Deletar Produto
                </button>
              </>
            )}
            <button
              type="button"
              className="btn btn-secondary btn-block mt-3"
              onClick={handleClear}
            >
              Limpar
            </button>
          </form>
          {responseMessage && <p>{responseMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductDataForm;