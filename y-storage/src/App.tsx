import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainView from './view/mainView';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={MainView} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
