import React from 'react'
import { Suspense } from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { lazy } from 'react'
import Spinner from 'components/loaders/Spinner'
import { TitleNameProvider } from 'context/TitleNameContext'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { unregister } from './registerServiceWorker'

// import { Provider } from 'react-redux';
// import store from "./store/store";
import './index.css'

unregister();

const App = lazy(() => import('./App'))

ReactDOM.render(
  <React.StrictMode>
    {/* // <Provider store={store}> */}
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="mx-auto max-w-[430px] h-screen flex items-center justify-center">
            <Spinner color="#e7513b" />
          </div>
        }
      >
        <TitleNameProvider>
          <App />
        </TitleNameProvider>
      </Suspense>
    </BrowserRouter>
    {/* // </Provider> */}
  </React.StrictMode>
  ,
  document.getElementById('root')
)
serviceWorkerRegistration.register()
reportWebVitals()
