import ReactDOM from 'react-dom/client'
import App from './App'
import store from './store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { Page } from './styles'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <Page>
        <App />
      </Page>
    </Router>
  </Provider>
)
