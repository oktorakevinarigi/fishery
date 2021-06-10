import { Provider } from "react-redux";
import store from './redux/store'
import Routes from "./pages"

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
