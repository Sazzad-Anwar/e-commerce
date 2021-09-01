import axios from 'axios';
import Head from 'next/head';
import { useEffect, useState } from 'react';
axios.defaults.withCredentials = true;

export default function Home() {
  const [user, setUser] = useState();

  useEffect(() => {

  }, [])

  let login = async () => {
    try {
      let { data } = await axios.post('http://localhost:8080/api/v1/user/login', {
        "email": "Celestino86@yahoo.com",
        "password": "Test123456*"
      })

      console.table(data.data);

    } catch (error) {
      console.error(error);
    }
  }
  const getDetails = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/v1/user/details', { withCredentials: true });
      setUser(data.data?.user)
    } catch (error) {
      console.log((error.response ? error.response.data.message : error.message));
    }
  }

  const logout = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/v1/user/logout', { withCredentials: true })
      setUser()
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
        <button className="px-4 mx-4 py-4 bg-gray-500 hover:bg-red-300 rounded text-white" onClick={getDetails}>Get User</button>
        <button className="px-4 mx-4 py-4 bg-gray-500 hover:bg-red-300 rounded text-white" onClick={logout}>Logout</button>
        <button className="px-4 mx-4 py-4 bg-gray-500 hover:bg-red-300 rounded text-white" onClick={login}>Login</button>
      </main>

      {user && <div className="text-left bg-purple-700 text-white rounded px-4 py-2 hover:shadow-lg">
        <img src={user.photo} alt={user.name} className="rounded-full shadow-lg" />
        <p>{user.name}</p>
      </div>}

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
  );
}
