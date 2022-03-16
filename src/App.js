import Home from "./routes/home/home.component";
import {Outlet, Route, Routes} from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <div>
        <h1>I am the navigation bar</h1>
      </div>
      <Outlet />
    </div>
  )
};

const App = () => (
  <Routes>
    <Route path='/' element={<Navigation />}>
      <Route index element={<Home />} />
    </Route>
  </Routes>
);

export default App;
