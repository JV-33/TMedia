import Link from 'next/link';
import React from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
    return (
      <Link href={href} legacyBehavior>
        <a className="navbar-link">{children}</a>
      </Link>
    );
  };
  

export default NavLink;
