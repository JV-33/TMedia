import NavLink from '../components/navLink';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <img src="/logo.png" alt="Logo" className="main-logo" />
        <img src="/a.png" alt="Additional Logo" className="additional-logo" />
        <NavLink href="/dashboard">Dashboard</NavLink>
        <img src="/b.png" alt="Additional Logo" className="additional-logo" />
        <NavLink href="/connectors">Connectors</NavLink>
        <img src="/c.png" alt="Additional Logo" className="additional-logo" />
        <NavLink href="/devices">Devices</NavLink>
        <img src="/d.png" alt="Additional Logo" className="additional-logo" />
        <NavLink href="/settings">General Settings</NavLink>
      </div>
      <div className="user-info">
        <img src="/e.png" alt="User" className="user-icon" />
        <span>Roberts ▼</span> 
      </div>
    </nav>
  );
};

export default Navbar;
