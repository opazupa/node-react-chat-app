import './styles/index.css';

import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import RootStore from './stores/RootStore';

configure({ enforceActions: 'observed' }); // don't allow state modifications outside actions

ReactDOM.render(
  <Provider {...RootStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
