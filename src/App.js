import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import {Route, Routes} from "react-router-dom";

const App = () => (
  <Routes>
    <Route path="/" element={<Navigation />}>
      <Route index element={<Home />} />
      <Route path="shop" element={<div>I am the shop</div>} />
    </Route>
  </Routes>
);

export default App;
