import React, { useState, useEffect } from 'react';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import CalculatorPage from './pages/CalculatorPage.jsx';
import CalendarPage from './pages/CalendarPage.jsx';
import NotesPage from './pages/NotesPage.jsx';
import ConverterPage from './pages/ConverterPage.jsx';
import DevToolsPage from './pages/DevToolsPage.jsx';

export default function App() {
  const [route, setRoute] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || '#/');
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    switch (route) {
      case '#/calculator':
        return <CalculatorPage />;
      case '#/calendar':
        return <CalendarPage />;
      case '#/notes':
        return <NotesPage />;
      case '#/converter':
        return <ConverterPage />;
      case '#/dev-tools':
        return <DevToolsPage />;
      case '#/':
      case '':
      default:
        return <Home />;
    }
  };

  return (
    <Layout currentRoute={route}>
      {renderPage()}
    </Layout>
  );
}
