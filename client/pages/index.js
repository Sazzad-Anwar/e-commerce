import axios from 'axios';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import axiosInstance from '../config/axiosInstance';
import { BaseURL } from '../config/projectConfig';

export default function Home() {
  const [user, setUser] = useState();
  const [loginData, setLoginData] = useState();
  const [token, setToken] = useState();

  useEffect(() => {

  }, [])

  let login = async () => {
    try {
      let { data } = await axiosInstance.post('/user/login', {
        "email": "Celestino86@yahoo.com",
        "password": "Test123456*"
      })

      setLoginData(data.data)

      localStorage.setItem('token', data.data.refreshToken)

    } catch (error) {
      console.error(error);
    }
  }
  const getDetails = async () => {
    try {
      const { data } = await axiosInstance.get('/user/details', { withCredentials: true });
      setUser(data.data?.user)
    } catch (error) {
      setUser()
      if (error.response.status === 401) {
        return
      } else {
        setLoginData();
        console.log((error.response ? error.response.data.message : error.message));
      }
    }
  }

  const getAccessToken = async () => {
    let { data } = await axios.post(`${BaseURL}/user/refresh-token`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        contentType: 'application/json',
      },
    });

    if (data.code === 200) {
      setToken(data.refreshToken)
    } else {
      setToken('token is not found')
    }
  };

  const logout = async () => {
    try {
      const { data } = await axiosInstance.post('/user/logout', { withCredentials: true })
      setUser()
      setLoginData()
    } catch (error) {
      console.log((error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-row items-center justify-center w-full flex-1 px-20 text-center">
        {loginData && loginData.isLoggedIn && <button className="px-4 mx-4 py-4 bg-gray-500 hover:bg-red-300 rounded text-white" onClick={getDetails}>Get User</button>}
        {loginData && loginData.isLoggedIn && <button className="px-4 mx-4 py-4 bg-gray-500 hover:bg-red-300 rounded text-white" onClick={logout}>Logout</button>}
        {!loginData && <button className="px-4 mx-4 py-4 bg-gray-500 hover:bg-red-300 rounded text-white" onClick={login}>Login</button>}
        {!loginData && <button className="px-4 mx-4 py-4 bg-gray-500 hover:bg-red-300 rounded text-white" onClick={getAccessToken}>Get token</button>}

      </main>

      {loginData && loginData.isLoggedIn ? <p className="px-4 py-3 bg-green-400">Login Success</p> : <p className="px-4 py-3 bg-red-400">Logged out</p>}

      {token && <p className="px-4 py-3 bg-green-400">token</p>}

      {user && <div className="text-left bg-purple-700 text-white rounded px-4 py-2 hover:shadow-lg">
        <img src={user.photo} alt={user.name} className="rounded-full shadow-lg" />
        <p>{user.name}</p>
      </div>}
    </div>
  );
}
