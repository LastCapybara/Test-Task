import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavigationMenu: React.FC = () => {
  const location = useLocation();

  return (
    <div className="sidebar bg-light pt-5 p-4 shadow-lg " >
      <div className="d-flex flex-column align-items-center my-5">
        <div className="rounded-circle overflow-hidden bg-secondary" style={{ width: '100px', height: '100px' }}>
          <img src="https://via.placeholder.com/100" alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
      <ul className="nav flex-column gap-2">
        <li className="nav-item">
          <Link to="/orders" className={`nav-link rounded-pill ${location.pathname === '/orders' ? 'link-success' : 'link-dark'}`}>
            ПРИХОД
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/products" className={`nav-link rounded-pill ${location.pathname === '/products' ? 'link-success' : 'link-dark'}`}>
            ПРОДУКТЫ
          </Link>
        </li>
        <li className="nav-item">
          <Link to="#" className={`nav-link rounded-pill ${location.pathname === '#' ? 'link-success' : 'link-dark'}`}>
            ГРУППЫ
          </Link>
        </li>
        <li className="nav-item">
          <Link to="#" className={`nav-link rounded-pill ${location.pathname === '#' ? 'link-success' : 'link-dark'}`}>
            ПОЛЬЗОВАТЕЛИ
          </Link>
        </li>
        <li className="nav-item">
          <Link to="#" className={`nav-link rounded-pill ${location.pathname === '#' ? 'link-success' : 'link-dark'}`}>
            НАСТРОЙКИ
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavigationMenu;
