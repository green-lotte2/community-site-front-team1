import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../pages/main/MainPage';
import CompletePage from '../pages/member/CompletePage';
import RegisterPage from '../pages/member/RegisterPage';
import TermsPage from '../pages/member/TermsPage';
import SignupPage from '../pages/member/SignupPage';
import LoginPage from '../pages/member/LoginPage';
import LandingPage from '../pages/main/LandingPage ';
import ListPage from '../pages/artice/ListPage';

const root = createBrowserRouter([
    // Landing
    { path: '/', element: <LandingPage /> },

    // member
    { path: '/login', element: <LoginPage /> },
    { path: '/signup', element: <SignupPage /> },
    { path: '/terms', element: <TermsPage /> },
    { path: '/register', element: <RegisterPage /> },
    { path: '/complete', element: <CompletePage /> },

    // main
    { path: '/main', element: <MainPage /> },

    // article
    { path: '/list', element: <ListPage /> },

    //
]);
export default root;
