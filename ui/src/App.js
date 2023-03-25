
import {router} from "./Routes"
import { ToastContainer, toast } from "react-toastify";

import { RouterProvider } from "react-router-dom";

function App() {

  return (

    <div className="App">
      <RouterProvider router={router}/>
      <ToastContainer/>
    </div>
  );
}

export default App;
