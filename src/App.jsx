import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./templates/pages/home/home";
import Notification from "./templates/pages/notification/notification";
import Order from "./templates/pages/order/order";
import NotFound from "./templates/pages/notFound/notFound";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster richColors></Toaster>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/order" element={<Order />}></Route>
          <Route path="/notification" element={<Notification />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
