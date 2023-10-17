import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from './AuthContext';
import ball from '../Images/ball.png'
import '../style/Scss/Login.scss'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const {login} = useAuth();

    const handleLogin = () => {
            login(username, password);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div className="auto-login">
            <div className="login-form">
                <div className="login-container">
                    <div className="lineBlock">
                        <div className="line"></div>
                        <img className="ball" alt="Logo" src={ball}/>
                        <div className="line"></div>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            id="username"
                            placeholder="Login"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={error ? 'error-border' : ''}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={error ? 'error-border' : ''}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                    <button onClick={handleLogin}>Войти</button>
                </div>
            </div>
        </div>
    );
};
export default Login;
