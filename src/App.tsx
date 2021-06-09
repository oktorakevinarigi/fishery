import { Provider } from "react-redux";
import store from './redux/store'
import Routes from "./pages"
import 'antd/dist/antd.css';
import "react-block-ui/style.css";

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
