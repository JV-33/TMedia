import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
      <img src="/logo.png" alt="Logo" className="main-logo" />
        <img src="/a.png" alt="Additional Logo" className="additional-logo" />
        <Link href="/dashboard">
          <span className="navbar-link">Dashboard</span>
        </Link>
        <img src="/b.png" alt="Additional Logo" className="additional-logo" />
        <Link href="/connectors">
          <span className="navbar-link">Connectors</span>
        </Link>
        <img src="/c.png" alt="Additional Logo" className="additional-logo" />
        <Link href="/devices">
          <span className="navbar-link">Devices</span>
        </Link>
        <img src="/d.png" alt="Additional Logo" className="additional-logo" />
        <Link href="/settings">
          <span className="navbar-link">General Settings</span>
        </Link>
      </div>
      <div className="user-info">
      <img src="/e.png" alt="Additional Logo" className="additional-logo" />
        <span> Roberts ▼</span> 
      </div>
    </nav>
  );
}

export default Navbar;
