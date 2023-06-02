import React, { useEffect, useState } from "react";
import { MdInventory2 } from "react-icons/md";
import { Link } from "react-router-dom";



const TopMenu: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getDayOfWeek = () => {
    const days = [
      "Воскресенье",
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
    ];
    const dayIndex = currentDate.getDay();
    return days[dayIndex];
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light position-fixed top-0 start-0 w-100 shadow-lg" style={{ zIndex: 100 }}>
      <div className="container-fluid px-5">
        <div className="d-flex w-50 justify-content-between">
          <Link to="/" className="d-flex fs-4 gap-2 align-items-center text-success">
            <MdInventory2 />
            <span className="fs-6">INVENTORY</span>
          </Link>
          <div>
            <input type="search" className="form-control" placeholder="Search" />
          </div>
        </div>

        <div className="gap-3">
          
          <div className="text-end">{getDayOfWeek()}</div>
          <div className="">{currentDate.toLocaleString()}</div>
        </div>
      </div>
    </nav>
  );
};

export default TopMenu;
