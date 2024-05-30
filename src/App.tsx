import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
function App() {
  return (
    <main className="max-w-7xl mx-auto flex flex-col min-h-dvh">
      <Navbar />
      <Outlet />
    </main>
  );
}
export default App;
