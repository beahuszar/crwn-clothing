import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import {Route, Routes} from "react-router-dom";
import Shop from "./routes/shop/shop.component";

const App = () => (
  <Routes>
    <Route path="/" element={<Navigation />}>
      <Route index element={<Home />} />
      <Route path="shop" element={<Shop />} />
      <Route path="auth" element={<Authentication />} />
    </Route>
  </Routes>
);

export default App;
