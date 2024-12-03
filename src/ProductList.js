import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");

  // Carregar os produtos ao montar o componente
  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("authToken"); // Recuperar o token do Local Storage

      try {
        const response = await axios.get("http://localhost:8080/products/allProducts", {
          headers: {
            Authorization: `Bearer ${token}`, // Adicionar o token no cabeçalho
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        setResponseMessage("Falha ao carregar produtos.");
      }
    };

    fetchProducts();
  }, []);

  // Adicionar produto ao carrinho
  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("authToken"); // Recuperar o token do Local Storage

    try {
      const response = await axios.post(
        "http://localhost:8080/cart/add",
        { productId: product.id },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Adicionar o token no cabeçalho
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setResponseMessage(`${product.name} foi adicionado ao carrinho com sucesso!`);
      } else {
        setResponseMessage("Erro ao adicionar produto ao carrinho.");
      }
    } catch (error) {
      console.error("Erro ao adicionar produto ao carrinho:", error);
      setResponseMessage("Falha ao conectar ao servidor.");
    }
  };

  return (
    <div className="card mx-auto" style={{ maxWidth: "400px" }}>
      <div className="card-body">
        <h5 className="card-title">Catálogo de Produtos</h5>
        <div className="product-list">
          {products.length === 0 ? (
            <p>Carregando produtos...</p>
          ) : (
            <ul>
              {products.map((product) => (
                <li key={product.id} className="mb-2">
                  {product.name} - R$ {product.price}
                  <button
                    className="btn btn-primary btn-sm ms-2"
                    onClick={() => handleAddToCart(product)}
                  >
                    Adicionar
                  </button>
                </li>
              ))}
            </ul>
          )}
          {responseMessage && <p>{responseMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductList;