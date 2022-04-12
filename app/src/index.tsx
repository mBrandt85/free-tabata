import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import Providers from './providers'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
  document.getElementById('root')
)
