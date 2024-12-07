import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Settings } from './pages/Settings';
import { Login } from './components/Login';
import { useStore } from './store/useStore';
import { UserProvider } from './context/UserContext';

export function App() {
  const currentUser = useStore((state) => state.currentUser);

  if (!currentUser) {
    return <Login />;
  }

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}