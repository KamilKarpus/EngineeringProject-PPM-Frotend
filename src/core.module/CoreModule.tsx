import React from 'react';
import ModuleApp from './ModuleApp';
import { configureStore } from './reducers';
import { Provider } from 'react-redux';

const store = configureStore();

const CoreModule = () => {
  return (
    <Provider store={store}>
      <ModuleApp/>
    </Provider>
  );
};
export default CoreModule;


