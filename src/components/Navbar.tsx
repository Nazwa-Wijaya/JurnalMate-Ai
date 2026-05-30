/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link, useLocation } from "react-router-dom";
import { BookOpen, Leaf, Search, Bookmark, HelpCircle, Menu, X } from "lucide-react";
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
    <nav className="sticky top-0 z-50 bg-literaku-ivory/85 backdrop-blur-md border-b border-literaku-sage/20 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2.5" id="nav-brand">
              <div className="flex items-center justify-center w-10 h-10 bg-literaku-emerald rounded-xl text-white shadow-xs hover:scale-105 transition-all relative">
                <BookOpen className="w-5 h-5 text-white" />
                <div className="absolute -bottom-1 -right-1 bg-literaku-lime text-literaku-forest p-0.5 rounded-md shadow-xs">
                  <Leaf className="w-2.5 h-2.5 fill-current" />
                </div>
              </div>
              <span className="font-display font-black text-xl tracking-tight text-literaku-forest">
                literaKu
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
                      ? "text-literaku-deep bg-literaku-mint font-bold shadow-3xs border border-literaku-sage/35"
                      : "text-literaku-textMuted hover:text-literaku-emerald hover:bg-literaku-soft"
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
              className="flex items-center justify-center p-2 rounded-lg text-literaku-textMuted hover:text-literaku-forest hover:bg-literaku-soft focus:outline-none"
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
        <div className="md:hidden border-b border-literaku-sage/20 bg-literaku-ivory">
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
                      ? "text-literaku-deep bg-literaku-mint border border-literaku-sage/35"
                      : "text-literaku-textMuted hover:text-literaku-emerald hover:bg-literaku-soft"
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
