import Agent from "./components/agent/Agent";
import Home from "./components/home/Home";
import HaveProducts from "./components/haveproducts/HaveProducts";
import WantProducts from "./components/wantproducts/WantProducts";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/agent" component={Agent} />
        <Route path="/ihave" component={HaveProducts} />
        <Route path="/iwant" component={WantProducts} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
