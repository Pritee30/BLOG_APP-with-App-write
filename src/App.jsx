
import { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux'
import './App.css'
import authService from './appwrite/auth';
import { login } from "./store/authSlice";
import { Footer, Header } from './components/Index';
import { Outlet } from 'react-router-dom';

function App() { 
 const [loading, setLoading] = useState(true);
 const dispatch = useDispatch()

 useEffect ( () => {
 authService.getCurrentUser()
 .then( (userData) => {
  if(userData){
    dispatch(login({userData}))
  }else{
    dispatch(logout())
  }
 })
 .finally( () => setLoading(false))
 },[])

  // console.log(import.meta.env.VITE_APPWRITE_URL);

  return !loading ? (
    <>
      <div className='min-h-screen flex-wrap content-between'>heyy im appwrite
        <div className='w-full block'>
          <Header/>
       <main>
          <Outlet />
       </main>

          <Footer/>

        </div>
      </div>
    </>
  ) : null
}

export default App
