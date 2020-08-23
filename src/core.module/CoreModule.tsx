import React from 'react';
import { Provider } from "react-redux";
import { configureStore } from './reducers';
import { ErrorMessages } from './ErrorMessage';
import ModuleApp from './ModuleApp';

const store = configureStore();
const CoreModule = () => {
  return (
    <Provider store={store}>
      <ModuleApp/>
    </Provider>
  );
};
export default CoreModule;


