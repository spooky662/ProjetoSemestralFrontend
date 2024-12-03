import React from "react";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remover o token do Local Storage
    localStorage.removeItem("authToken");

    // Opcional: Mensagem de sucesso (alert ou redirecionamento)
    alert("Você foi desconectado com sucesso!");

    // Redirecionar para a página de login
    navigate("/login");
  };

  return (
    <div className="card mx-auto" style={{ maxWidth: "400px" }}>
      <div className="card-body">
        <h5 className="card-title">Sair da Conta</h5>
        <p>Deseja encerrar sua sessão?</p>
        <button
          onClick={handleLogout}
          className="btn btn-danger btn-block mt-3"
        >
          Sair
        </button>
      </div>
    </div>
  );
};

export default UserLogout;