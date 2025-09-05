import React from 'react';
import { USER_PROFILE_IMAGE_URL } from '../constants';

const NavLink: React.FC<{ href: string, children: React.ReactNode, isActive?: boolean }> = ({ href, children, isActive }) => (
  <a
    href={href}
    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? 'bg-black/20 text-white' : 'text-gray-300 hover:bg-black/10 hover:text-white'
    }`}
  >
    {children}
  </a>
);

export const Header: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {
  return (
    <header className="bg-walmart-darkblue shadow-lg z-10">
      <div className="w-full mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-label="Open navigation menu"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center space-x-3">
              <svg
                fill="#fbc02d"
                height="1em"
                viewBox="0 0 16 16"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                className="header_wm-icon__EHukV"
                style={{ fontSize: "1.5rem", verticalAlign: "-0.25em" }}
              >
                <path
                  fillRule="evenodd"
                  d="M7.996 1c-.531 0-.953.297-.953.656l.328 3.664c.031.22.305.39.625.39.328 0 .602-.17.64-.39l.321-3.664c0-.36-.422-.656-.96-.656ZM2.988 4c-.312-.18-.781.04-1.047.5-.273.46-.226.977.094 1.156l3.328 1.555c.211.07.492-.078.657-.36.164-.28.148-.601-.024-.742L2.988 4Zm10.985 1.656c.312-.18.359-.695.093-1.156-.273-.46-.742-.68-1.054-.5l-3.008 2.11c-.172.14-.188.46-.024.742.165.28.446.43.657.359l3.336-1.555Zm-11.938 4.68c-.32.187-.367.703-.094 1.164.266.46.735.68 1.047.5l3.008-2.11c.172-.148.188-.468.024-.75-.165-.28-.446-.43-.657-.35l-3.328 1.546Zm8.602-1.547c-.211-.078-.492.07-.657.352-.164.28-.148.601-.024-.75L13.012 12c.312.18.781-.04 1.054-.5.266-.46.22-.977-.093-1.164l-3.336-1.547Zm-2.633 1.5c-.328 0-.602.164-.633.383l-.328 3.664c0 .367.422.664.953.664.54 0 .961-.297.961-.664l-.32-3.664c-.04-.219-.313-.383-.633-.383Z"
                />
              </svg>
              <h1 className="text-2xl font-semibold text-white tracking-wide">OneSource</h1>
            </div>
            <nav className="hidden md:flex items-baseline space-x-2">
              <NavLink href="#" isActive>Dashboard</NavLink>
              <NavLink href="#">Suppliers</NavLink>
              <NavLink href="#">Orders</NavLink>
              <NavLink href="#">Analytics</NavLink>
            </nav>
          </div>
          <div className="flex items-center">
            <button className="p-1 rounded-full text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-walmart-darkblue focus:ring-white">
              <span className="sr-only">View notifications</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="ml-4 relative">
              <div>
                <button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-walmart-darkblue focus:ring-white">
                  <span className="sr-only">Open user menu</span>
                  <img className="h-8 w-8 rounded-full" src={USER_PROFILE_IMAGE_URL} alt="User profile" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};