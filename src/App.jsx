import { Outlet, useLocation, useNavigate } from 'react-router';
import { routes } from '@/routes/index';
import { useState, useLayoutEffect } from 'react';

import './App.scss'

export default function App() {
  const [url, setUrl] = useState('/');
  const navigate = useNavigate();
  const loc = useLocation();
  const goPath = (path) => {
    navigate(path);
    setUrl(path);
  }

  useLayoutEffect(() => {
    let pathUrl = loc.pathname;
    console.log(loc.pathname);
    if (loc.pathname === '/') {
      pathUrl = routes[0].children[0].path;
    }
    setUrl(pathUrl);
  }, [loc]);
  return <div className='App'>
    <div className='App-nav'>
      {
        routes[0].children.map((item) => {
          return <div className={item.path === url ? 'action' : ''} key={item.path} onClick={() => goPath(item.path)}>{item.name}</div>
        })
      }
    </div>
    <Outlet />
  </div>
};