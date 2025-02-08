import React from 'react'
import { useLocation,useNavigate } from 'react-router-dom'

const Home = () => {
  const location = useLocation()
  const user = location.state.username;
  return (
    <div>
      <h1>
        hellow {user} Welcome
      </h1>
    </div>
  )
}

export default Home