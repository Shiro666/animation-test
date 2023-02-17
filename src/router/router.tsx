import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import HomePage from "../pages/home/home";
import NotFoundPage from "../pages/not-found/NotFound";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    )
}