import Layout from '../common/Layout';
import '../styles/global-style.css';
import { store, persistor } from '../store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

export default function App({ Component, pageProps }){
  return <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PersistGate>
  </Provider>
}