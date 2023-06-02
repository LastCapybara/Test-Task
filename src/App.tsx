import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import NavigationMenu from './components/NavigationMenu';
import TopMenu from './components/TopMenu';
import Orders from './components/Orders';
import Products from './components/Products';

const App: React.FC = () => {
  const location = useLocation();
  const previousLocation = React.useRef<string | null>(null);

  React.useEffect(() => {
    previousLocation.current = location.pathname;
  }, [location]);

  const shouldAnimate = previousLocation.current !== location.pathname;

  return (
    <div className="">
      <div className='mb-5'>
        <TopMenu />
      </div>

      <div className='d-flex h-100 min-vh-100'>
        <NavigationMenu />

        <div className='mx-5 my-4 container-fluid h-100'>
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              classNames={shouldAnimate ? 'fade' : ''}
              timeout={300}
            >
              <Routes location={location}>
                <Route path="/orders" element={<Orders />} />
                <Route path="/products" element={<Products />} />
              </Routes>
            </CSSTransition>
          </TransitionGroup>
        </div>

      </div>

    </div>
  );
};

export default App;
