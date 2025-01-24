import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import withLoadingComponent from '../components/withLoadingComp';

const HomePage = React.lazy(() => import('../pages/home/home'));
const ThreePage = React.lazy(() => import('../pages/three/index'));
const NotFoundPage = React.lazy(() => import('../pages/not-found'));
const FireWorksPage = React.lazy(() => import('../pages/fireworks/index'));

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to={'/home'} />} />
                <Route path="home" element={withLoadingComponent(<HomePage />)} />
                <Route path="three" element={withLoadingComponent(<ThreePage />)} />
                <Route path="fireworks" element={withLoadingComponent(<FireWorksPage />)} />
                <Route path="*" element={withLoadingComponent(<NotFoundPage />)} />
            </Routes>
        </BrowserRouter>
    );
}
