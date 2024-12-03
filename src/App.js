import React, { useState } from 'react';
import './App.css';
import UserAccountForm from './UserAccountForm.js'
import UserLoginForm from './UserLoginForm.js';
import UserLogout from './UserLogout.js';
import ProductList from "./ProductList";
import Cart from "./Cart";
import Transaction from "./Transaction";
import ProductDataForm from './ProductDataForm.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import SupplierDataForm from './SupplierDataForm.js';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const handleNavClick = (page) => {
    setCurrentPage(page);
  }

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#"> Titulo principal</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button className="nav-link btn"
                onClick={() => handleNavClick('createAccount')}>Criar conta</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" 
                onClick={() => handleNavClick('login')}>Login</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" 
                onClick={() => handleNavClick('logout')}>Sair</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" 
                onClick={() => handleNavClick('product')}>Produtos</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" 
                onClick={() => handleNavClick('productList')}>Catálogo</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" 
                onClick={() => handleNavClick('cart')}>Carrinho</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" 
                onClick={() => handleNavClick('supplier')}>Fornecedores</button>
            </li>
          </ul>
        </div>
      </nav>
      {/*conteudo principal*/}
      <div className="container text-center mt-5">
        {currentPage === 'landing' && (
          <div className="mt-4">
            <h1 className="display-4">Segundo Bimestre</h1>
          </div>
        )}

        {/*criar conta*/}
        {currentPage === 'createAccount' && (
          <div className="mt-4">
            <UserAccountForm />
          </div>
        )}

        {/*login*/}
        {currentPage === 'login' && (
          <div className="mt-4">
            <UserLoginForm />
          </div>
        )}

        {/*sair*/}
        {currentPage === 'logout' && (
          <div className="mt-4">
            <UserLogout />
          </div>
        )}

        {/*produto*/}
        {currentPage === 'product' && (
          <div className="mt-4">
            <ProductDataForm />
          </div>
        )}

        {/*lista de produtos*/}
        {currentPage === 'productList' && (
          <div className="mt-4">
            <ProductList />
          </div>
        )}

        {/*carrinho*/}
        {currentPage === 'cart' && (
          <div className="mt-4">
            <Cart />
          </div>
        )}

        {/*fornecedores*/}
        {currentPage === 'supplier' && (
          <div className="mt-4">
            <SupplierDataForm />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;