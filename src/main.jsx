import { StrictMode, Suspense, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { RouterProvider } from 'react-router';
import { router } from './Router/Router.jsx';
import AuthProvider from './Context/AuthProvider.jsx';
import { ToastContainer } from 'react-toastify';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Loading from './Components/Loading.jsx';
import { ThemeProvider } from './Context/ThemeContext.jsx';
import { AnimatePresence,motion } from 'framer-motion';
import Loader from './Components/Loader.jsx';

const queryClient = new QueryClient();


const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Loader />
        </motion.div>
      ) : (
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <RouterProvider router={router} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
       <ThemeProvider>
        <Suspense fallback={<Loading />}>
      <App/>
      </Suspense>
        <ToastContainer />
       </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
