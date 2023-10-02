import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppComponent } from './components';
import './index.css';
import reportWebVitals from './reportWebVitals';

const rootId = 'root';
const rootElement = document.getElementById('root');
const queryClient = new QueryClient();

if (!rootElement) {
  throw new Error(`Could not find element with id '${rootId}'`);
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppComponent />
    </QueryClientProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
