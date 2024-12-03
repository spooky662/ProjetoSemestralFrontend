import React, { useState } from "react";
import axios from "axios";

const SupplierDataForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cnpj: "",
  });

  const [supplierData, setSupplierData] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");

  // Tratar evento de mudança nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Tratar o envio para salvar os dados
  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken"); // Recupera o token do local storage

    try {
      const response = await axios.post(
        "http://localhost:8080/suppliers/newSupplier",
        {
          name: formData.name,
          email: formData.email,
          cnpj: formData.cnpj,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
          },
        }
      );

      if (response.status === 200) {
        setResponseMessage("Fornecedor criado com sucesso!");
        setFormData({
          name: "",
          email: "",
          cnpj: "",
        });
      } else {
        setResponseMessage("Erro ao criar fornecedor.");
      }
    } catch (error) {
      console.error(error);
      setResponseMessage("Falha ao conectar ao servidor.");
    }
  };

  // Buscar fornecedor pelo email
  const handleSearch = async () => {
    if (!formData.email) {
      setResponseMessage("Por favor, informe o e-mail do fornecedor.");
      return;
    }

    const token = localStorage.getItem("authToken"); // Recupera o token do local storage

    try {
      const response = await axios.get(
        `http://localhost:8080/suppliers/getSupplierById`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
          },
          params: { email: formData.email }, // Busca pelo email como parâmetro
        }
      );

      if (response.status === 200 && response.data) {
        setSupplierData(response.data);
        setResponseMessage("Fornecedor encontrado com sucesso!");
      } else {
        setResponseMessage("Fornecedor não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar fornecedor:", error);
      setResponseMessage("Falha ao conectar ao servidor.");
    }
  };

  return (
    <div className="card mx-auto" style={{ maxWidth: "400px" }}>
      <div className="card-body">
        <h5 className="card-title">Cadastro de Fornecedores</h5>
        <div className="user-account-form">
          <form>
            <div className="form-group">
              <label>Email do Fornecedor (para busca): </label>
              <input
                className="form-control"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <button
                type="button"
                className="btn btn-info btn-block mt-2"
                onClick={handleSearch}
              >
                Buscar Fornecedor
              </button>
            </div>
            {supplierData && (
              <div className="mt-3">
                <h6>Fornecedor Encontrado:</h6>
                <p>Nome: {supplierData.name}</p>
                <p>Email: {supplierData.email}</p>
                <p>CNPJ: {supplierData.cnpj}</p>
              </div>
            )}
            <hr />
            <div className="form-group">
              <label>Nome: </label>
              <input
                className="form-control"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label>Email: </label>
              <input
                className="form-control"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label>CNPJ: </label>
              <input
                className="form-control"
                type="text"
                name="cnpj"
                value={formData.cnpj}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <button
                type="button"
                className="btn btn-primary btn-block mt-3"
                onClick={handleSave}
              >
                Cadastrar
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-block mt-3"
                onClick={() =>
                  setFormData({
                    name: "",
                    email: "",
                    cnpj: "",
                  })
                }
              >
                Limpar
              </button>
            </div>
          </form>
          {responseMessage && <p>{responseMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default SupplierDataForm;