import "./App.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Dashboard from "./dashboard/Dashboard";

function App() {
  // const [user] = useAuthState(auth);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Dashboard} />
          {/* <Route component={Redirect} /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
