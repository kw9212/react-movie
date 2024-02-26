import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
// Routes는 해당되는 URL 찾으면 렌더링 해주는 역할

function App() {
  return (
    <Routes>
      <Route path={`${process.env.PUBLIC_URL}/`} element={<Home />} />
      <Route
        path={`${process.env.PUBLIC_URL}/movie/:id`}
        element={<Detail />}
      />
    </Routes>
  );
}

export default App;
