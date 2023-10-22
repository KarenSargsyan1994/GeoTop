import axios from "axios";
import React, {createContext, useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [items, setItems] = useState([]);
    const [item, setItem] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    if (token && !user) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.get('api/user').then(({data}) => {
            setUser(data);
            navigate('/list')
        })
            .catch(() => {
                logout();
                navigate('/login')
            })
    }

    const login = (username, password) => {
        axios.post('api/login', {name: username, password}).then(({data}) => {
            if (data?.token) {
                localStorage.setItem('token', data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
                axios.get('api/user').then(({data}) => {
                    setUser(data);
                    navigate('/list')
                })
            }

        })
    };
    const addItem = (data) => {
        const config = {
            headers: {'content-type': 'multipart/form-data'}
        }
        axios.post('/api/item', data, config).then(()=>{
            navigate('/list')
        })
    }
    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');

    };
    const getItem = (id) => {
        return axios.get(`/api/items/${id}`).then(({data}) => {
            setItem(data.item)
            return data.item
        })
    };
    const getItems = () => {
        return axios.get('/api/items').then(({data}) => {
            setItems(data.items)
            return data
        })
    }
    const updateItem = (id,formData) => {
        const config = {
            headers: {'content-type': 'multipart/form-data'}
        }
        formData.images = formData.images.filter((image) => image instanceof File);
        return axios.post(`/api/items/${id}`,{...formData}, config).then(({data}) => {
            setItems(data.items)
            return data
        })
    }
    const deleteItem = (id) => {
        return axios.delete(`api/items/${id}`).then(({data}) => {
        getItems();
        })
    }
  const deleteImages = (id) => {
        return axios.delete(`api/images/${id}`);
    }

    return (
        <AuthContext.Provider value={{user, login, logout, addItem, getItems, getItem, item, items, updateItem, deleteItem, deleteImages}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
