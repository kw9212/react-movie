import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
// Routes는 해당되는 URL 찾으면 렌더링 해주는 역할

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<Detail />} />
    </Routes>
  );
}

export default App;
