import { Routes, Route } from "react-router-dom";
import ErrorPage from "./error-page";
import { Menu } from "./routes/menu/Menu";
import { GameLayout } from "./routes/game/Game";
import "./App.css";

export default function HomeApp() {
  return (
    <Routes>
      <Route path="/" element={<Menu />} errorElement={<ErrorPage />} />
      <Route path="game" element={<GameLayout />} errorElement={<ErrorPage />} />
    </Routes>
  );
}
