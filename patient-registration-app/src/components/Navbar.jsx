import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <h1 style={logoStyle}>Patient Management</h1>
        <div style={linkContainerStyle}>
          <Link to="/" style={linkStyle}>Patient List</Link>
          <Link to="/register" style={linkStyle}>Register Patient</Link>
        </div>
      </div>
    </nav>
  )
}

const navStyle = {
  background: '#4a90e2',
  color: 'white',
  padding: '10px 0',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
}

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 20px'
}

const logoStyle = {
  margin: 0,
  fontSize: '24px'
}

const linkContainerStyle = {
  display: 'flex',
  gap: '20px'
}

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontWeight: '500',
  padding: '5px 10px',
  borderRadius: '4px',
  transition: 'background 0.3s',
  ':hover': {
    background: 'rgba(255, 255, 255, 0.1)'
  }
}

export default Navbar