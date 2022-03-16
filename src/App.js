import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import {Route, Routes} from "react-router-dom";
import SignIn from "./routes/sign-in/sign-in.component";

const App = () => (
  <Routes>
    <Route path="/" element={<Navigation />}>
      <Route index element={<Home />} />
      <Route path="shop" element={<div>I am the shop</div>} />
      <Route path="sign-in" element={<SignIn />} />
    </Route>
  </Routes>
);

export default App;
