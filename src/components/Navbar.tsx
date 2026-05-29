/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link, useLocation } from "react-router-dom";
import { BookOpen, Search, Bookmark, HelpCircle, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { name: "Home", path: "/", icon: BookOpen },
    { name: "Cari Paper", path: "/search", icon: Search },
    { name: "Library Saya", path: "/library", icon: Bookmark },
    { name: "About", path: "/about", icon: HelpCircle },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2.5" id="nav-brand">
              <div className="flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-xl text-white shadow-sm hover:scale-105 transition-all">
                <BookOpen className="w-5.5 h-5.5" />
              </div>
              <span className="font-display font-black text-xl tracking-tight text-indigo-950">
                JurnalMate <span className="text-indigo-600 font-extrabold">AI</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  id={`nav-link-${item.name.toLowerCase().replace(/\s/g, "-")}`}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    active
                      ? "text-indigo-650 bg-indigo-50 font-bold shadow-xs border border-indigo-100/30"
                      : "text-slate-600 hover:text-indigo-600 hover:bg-slate-100/60"
                  }`}
                >
                  <Icon className="w-4.5 h-4.5" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-center p-2 rounded-lg text-slate-500 hover:text-slate-600 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
              id="mobile-menu-btn"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-100 bg-white">
          <div className="px-2 pt-2 pb-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  id={`mobile-nav-link-${item.name.toLowerCase().replace(/\s/g, "-")}`}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                    active
                      ? "text-indigo-700 bg-indigo-50 border border-indigo-100/40"
                      : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
