import React, { useState } from "react";
import axios from 'axios';

const UserLoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [responseMessage, setResponseMessage] = useState('');

    // Handle form input change 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log('Salvando dados');
            const response = await axios.post('http://localhost:8080/users/login', formData);
            if (response.status === 200) {
                // Supondo que o token está em response.data.token
                const token = response.data.token;

                // Armazenar o token no Local Storage
                localStorage.setItem('authToken', token);

                setResponseMessage('Conta logada com sucesso!');
            } else {
                setResponseMessage('Erro ao logar na conta de usuário.');
            }
        } catch (error) {
            console.error('Erro ao conectar ao servidor:', error);
            setResponseMessage('Falha ao conectar ao servidor.');
        }
    };

    return (
        <div className="card mx-auto" style={{ maxWidth: '400px' }}>
            <div className="card-body">
                <h5 className="card-title">Entre na conta de usuário</h5>
                <div className="user-login-form">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Email:</label>
                            <input
                                className="form-control"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Senha:</label>
                            <input
                                className="form-control"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block mt-3">Entrar</button>
                    </form>
                    {responseMessage && <p>{responseMessage}</p>}
                </div>
            </div>
        </div>
    );
};

export default UserLoginForm;
