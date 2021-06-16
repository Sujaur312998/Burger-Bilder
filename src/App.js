import React from 'react'
import Main from './Components/main'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './Components/redux/store'

const App = () => {
  return (
    <div className='App'>
      <Provider store={store}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </Provider>

    </div>
  )
}

export default App


