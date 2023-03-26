
import { router } from "./Routes"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { RouterProvider } from "react-router-dom";

function App() {

  return (

    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
