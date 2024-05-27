import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../pages/main/MainPage';
import CompletePage from '../pages/member/CompletePage';
import RegisterPage from '../pages/member/RegisterPage';
import TermsPage from '../pages/member/TermsPage';
import SignupPage from '../pages/member/SignupPage';
import LoginPage from '../pages/member/LoginPage';
import LandingPage from '../pages/main/LandingPage ';
import ListPage from '../pages/artice/ListPage';
import WritePage from '../pages/artice/WritePage';
import ViewPage from '../pages/artice/ViewPage';
import UserListPage from '../pages/admin/UserListPage';
import UserModifyPage from '../pages/admin/UserModifyPage';
import ArticleListPage from '../pages/admin/ArticleListPage';

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
    { path: '/write', element: <WritePage /> },
    { path: '/view', element: <ViewPage /> },

    { path: '/write', element: <WritePage /> },
    { path: '/view', element: <ViewPage /> },

    // admin
    { path: '/userList', element: <UserListPage /> },
    { path: '/userModify', element: <UserModifyPage /> },
    { path: '/articleList', element: <ArticleListPage /> },

]);
export default root;
