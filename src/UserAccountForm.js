import React, { useState } from "react";
import axios from 'axios';

const UserAccountForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        data_nasc: '',
        password: '',
    })

    // Handle form input change 
    const handleChange = (e) => {
        console.log('Entrou aqui')
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submisssion
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log('Salvando dados');
            const response = await axios.post('http://localhost:8080/users/novouser', formData,{
                headers:{
                    'Content-Type':'application/json'
                }
            });
            

            if (response.status === 200) {
                setResponseMessage('Conta criada com suscesso!');
            }
            else {
                setResponseMessage('Erro ao criar conta de usuario.');
            }
        } catch (error) {
            console.error(error);
            setResponseMessage('Falha ao conectar ao servidor.');
        }
    };

    const [responseMessage, setResponseMessage] = useState('');

    return (
        <div className="card mx-auto" style={{ maxWidth: '400px' }}>
            <div className="card-body">
                <h5 className="card-title">Crie sua conta de usuário</h5>
                < div className="user-account-form" >
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Email:</label>
                            <input
                                className="form-control"
                                type="email"
                                name="email"
                                values={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Data de nascimento:</label>
                            <input
                                className="form-control"
                                type="date"
                                name="data_nasc"
                                values={formData.data_nasc}
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
                                values={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block mt-3">Criar Conta</button>
                    </form>
                    {responseMessage && <p>{responseMessage}</p>}
                </div >
            </div>
        </div>
    );
};

export default UserAccountForm;