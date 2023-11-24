import { Provider } from 'react-redux';
import store from '../src/redux/store';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import reportWebVitals from '../reportWebVitals';
import LoginPage from '<import>/app/login/page';

function App({ Component, pageProps }) {
    const router = useRouter();
  
    useEffect(() => {
      // Manejar cambios de rutas
      const handleRouteChange = (url) => {
        // Realizar acciones al cambiar de ruta (si es necesario)
      };
  
      router.events.on('routeChangeStart', handleRouteChange);
  
      return () => {
        router.events.off('routeChangeStart', handleRouteChange);
      };
    }, [router.events]);
  
    return (
      <Provider store={store}>
        <Component {...pageProps} />
        <LoginPage/>
      </Provider>
    );
  }
  
  export default App;
  