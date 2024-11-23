import React, { useState } from 'react';
import { Droplet, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white">
      {/* Top Bar */}
      {/* <div className="bg-[#f8f9fa] border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <a href="/" className="text-sm text-gray-600 hover:text-primary">Skip to main content</a>
              <span className="text-gray-400">|</span>
              <button className="text-sm text-gray-600 hover:text-primary">Screen Reader Access</button>
            </div>
            <div className="flex items-center gap-4">
              <select className="text-sm border rounded px-2 py-1">
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
              </select>
              <div className="flex gap-2">
                <button className="text-sm px-2 py-1 bg-gray-200 rounded">A-</button>
                <button className="text-sm px-2 py-1 bg-gray-200 rounded">A</button>
                <button className="text-sm px-2 py-1 bg-gray-200 rounded">A+</button>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Logo Bar */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Left Side - Emblem and Text */}
            <div className="flex items-center gap-4">
              <img 
                src="https://jalshakti.gov.in/themes/jalshakti/images/national_emblem.svg"
                alt="National Emblem"
                className="h-16"
              />
              <div className="text-[#00548F]">
                <div className="text-lg font-bold">भारत सरकार</div>
                <div className="text-lg font-bold">Government of India</div>
                <div className="text-sm">जल शक्ति मंत्रालय, भूजल विभाग</div>
                <div className="text-sm">Ministry of Jal Shakti, Department of Groundwater</div>
              </div>
            </div>

            {/* Right Side - Campaign Logos */}
            <div className="flex items-center gap-4">
              <img 
                src="https://jalshakti.gov.in/themes/jalshakti/images/JAL_JEEVAN_Logo.png"
                alt="Jal Jeevan Mission"
                className="h-14"
              />
              <img 
                src="https://zeevector.com/wp-content/uploads/G20-Logo-PNG-India@zeevector.png"
                alt="G20"
                className="h-14"
              />
              <img 
                src="https://jalshakti.gov.in/themes/jalshakti/images/logo_azadi.svg"
                alt="Azadi Ka Amrit Mahotsav"
                className="h-14"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-[#00548F] shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block w-full`}>
              <ul className="flex flex-col md:flex-row md:items-center py-2 md:py-0">
                <li>
                  <Link 
                    to="/" 
                    className={`block px-4 py-2 text-white hover:bg-[#003a75] ${
                      isActive('/') ? 'bg-[#003a75]' : ''
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/terms" 
                    className={`block px-4 py-2 text-white hover:bg-[#003a75] ${
                      isActive('/terms') ? 'bg-[#003a75]' : ''
                    }`}
                  >
                    Groundwater Terms
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/noc" 
                    className={`block px-4 py-2 text-white hover:bg-[#003a75] ${
                      isActive('/noc') ? 'bg-[#003a75]' : ''
                    }`}
                  >
                    NOC Guidelines
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/training" 
                    className={`block px-4 py-2 text-white hover:bg-[#003a75] ${
                      isActive('/training') ? 'bg-[#003a75]' : ''
                    }`}
                  >
                    Training
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/reports" 
                    className={`block px-4 py-2 text-white hover:bg-[#003a75] ${
                      isActive('/reports') ? 'bg-[#003a75]' : ''
                    }`}
                  >
                    AI Reports
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}