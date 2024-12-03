import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Transaction = ({ cart }) => {
  const [paymentMethod, setPaymentMethod] = useState(""); // Método de pagamento
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleTransaction = async () => {
    const token = localStorage.getItem("authToken"); // Recupera o token do Local Storage

    if (!token) {
      setResponseMessage("Usuário não autenticado. Faça login para continuar.");
      return;
    }

    if (!paymentMethod) {
      setResponseMessage("Por favor, selecione um método de pagamento.");
      return;
    }

    const endpoint =
      paymentMethod === "pix"
        ? "http://localhost:8080/transaction/payment/pix"
        : "http://localhost:8080/transaction/payment/credit-card";

    try {
      const response = await axios.post(
        endpoint,
        { cart, total },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
          },
        }
      );

      if (response.status === 200) {
        setResponseMessage("Pagamento realizado com sucesso!");
        navigate("/success");
      } else {
        setResponseMessage("Erro ao processar o pagamento.");
      }
    } catch (error) {
      console.error("Erro ao finalizar o pagamento:", error);
      setResponseMessage("Falha ao conectar ao servidor.");
    }
  };

  return (
    <div className="card mx-auto" style={{ maxWidth: "400px" }}>
      <div className="card-body">
        <h5 className="card-title">Finalizar Compra</h5>
        {cart.length === 0 ? (
          <p>O carrinho está vazio. Adicione itens para continuar.</p>
        ) : (
          <div>
            <ul>
              {cart.map((item) => (
                <li key={item.id}>
                  {item.name} - R$ {item.price.toFixed(2)} x {item.quantity}
                </li>
              ))}
            </ul>
            <h3>Total: R$ {total.toFixed(2)}</h3>
            <div className="mt-3">
              <label htmlFor="paymentMethod">Escolha o método de pagamento:</label>
              <select
                id="paymentMethod"
                className="form-select mt-2"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="">Selecione...</option>
                <option value="pix">PIX</option>
                <option value="credit-card">Cartão de Crédito</option>
              </select>
            </div>
            <div className="mt-3">
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={handleTransaction}
              >
                Finalizar Compra
              </button>
              <Link to="/">
                <button type="button" className="btn btn-secondary btn-block mt-2">
                  Cancelar
                </button>
              </Link>
            </div>
          </div>
        )}
        {responseMessage && <p className="mt-3">{responseMessage}</p>}
      </div>
    </div>
  );
};

export default Transaction;