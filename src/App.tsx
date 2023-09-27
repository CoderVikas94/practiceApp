import { BrowserRouter, useRoutes } from "react-router-dom";
import "./App.css";
import routes from "./routes/routes";
import { Toaster } from "react-hot-toast";

function App() {
  const route = useRoutes(routes());
  return <>{route}</>;
}

const AppWrapper = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <App />
    </BrowserRouter>
  );
};

export default AppWrapper;
