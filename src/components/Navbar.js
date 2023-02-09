import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  let history=useNavigate()
  const handleClick=()=>{
    localStorage.removeItem('token')
    history("/login")
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">iNoteBook</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">About</Link>
          </li>
        </ul>

        {!localStorage.getItem('token')?<form className="mx-5">
          <Link class="btn btn-primary mx-1" to="/login" role="button">Login</Link>
          <Link class="btn btn-primary mx-1" to="/signup" role="button">Sign Up</Link>
        </form>:<button onClick={handleClick } className='btn btn-primary mx-5'>Logout</button>}
      </div>
    </nav>
  )
}

export default Navbar
