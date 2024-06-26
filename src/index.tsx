import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { Provider } from 'react-redux';
import { store } from './redux';
import { fetchOffers } from './redux/slices/offers/offers-thunks';
import { Toaster } from 'react-hot-toast';
import { checkAuth } from './redux/slices/user/user-thunks';

store.dispatch(checkAuth());
store.dispatch(fetchOffers());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const AppWrapper = () => (
  <Fragment>
    <App />
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: {
          fontSize: '16px',
          maxWidth: '500px',
          padding: '10px 15px',
          backgroundColor: '#363636',
          color: '#fff',
        },
      }}
    />
  </Fragment>
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  </React.StrictMode>
);
