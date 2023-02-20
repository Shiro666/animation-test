import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const HomePage = React.lazy(() => import('../pages/home/home'));
const NotFoundPage = React.lazy(() => import('../pages/not-found'));

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}
