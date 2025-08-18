import Labs from "./Labs";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import Kambaz from "./Kambaz";
import Logout from "./Kambaz/Account/Logout";
import store from "./Kambaz/store";
import { Provider } from "react-redux";
export default function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <div >
          <Routes>
            <Route path="/" element={<Navigate to="Kambaz" />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/Labs/*" element={<Labs />} />
            <Route path="/Kambaz/*" element={<Kambaz />} />
          </Routes>

        </div>
        <footer className="text-center mt-4" style={{ width: '100%', fontSize: '0.6em', bottom: 10 }}>
          <div>Github Frontend React Repo: https://github.com/AntonMenchaca/kambaz-react-web-cs5610-summer2-2025/tree/quizzes-project</div>
          <div>Github Node Repo: https://github.com/AntonMenchaca/kambaz-node-server-app</div>
          <p>Anton Menchaca CS5610 2025 - Summer 2</p>
        </footer>
      </Provider>
    </HashRouter>);
}