import React, { useState } from "react";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState([]); // Estado do carrinho
  const [responseMessage, setResponseMessage] = useState(""); // Mensagem de resposta

  // Handle removing a product from the cart
  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Handle form submission (e.g., checkout)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken"); // Recuperar o token do Local Storage

    if (!token) {
      setResponseMessage("Usuário não autenticado. Faça login para continuar.");
      return;
    }

    try {
      console.log("Enviando dados do carrinho...");
      const response = await axios.post(
        "http://localhost:8080/cart/checkout",
        { cart },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Adicionar o token no cabeçalho
          },
        }
      );

      if (response.status === 200) {
        setResponseMessage("Compra finalizada com sucesso!");
        setCart([]); // Limpa o carrinho após o sucesso
      } else {
        setResponseMessage("Erro ao finalizar a compra.");
      }
    } catch (error) {
      console.error("Erro ao finalizar a compra:", error);
      setResponseMessage("Falha ao conectar ao servidor.");
    }
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="card mx-auto" style={{ maxWidth: "400px" }}>
      <div className="card-body">
        <h5 className="card-title">Carrinho de Compras</h5>
        <div className="cart-form">
          {cart.length === 0 ? (
            <p>O carrinho está vazio.</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <ul>
                {cart.map((item) => (
                  <li key={item.id}>
                    {item.name} - R$ {item.price.toFixed(2)} x {item.quantity}
                    <button
                      type="button"
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="btn btn-danger btn-sm ms-2"
                    >
                      Remover
                    </button>
                  </li>
                ))}
              </ul>
              <h3>Total: R$ {total.toFixed(2)}</h3>
              <button
                type="submit"
                className="btn btn-primary btn-block mt-3"
              >
                Finalizar Compra
              </button>
            </form>
          )}
          {responseMessage && <p>{responseMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default Cart;