import { Navigate, createBrowserRouter } from 'react-router-dom';
import MainPage from '../pages/main/MainPage';
import CompletePage from '../pages/member/CompletePage';
import RegisterPage from '../pages/member/RegisterPage';
import TermsPage from '../pages/member/TermsPage';
import SignupPage from '../pages/member/SignupPage';
import LoginPage from '../pages/member/LoginPage';
import ListPage from '../pages/artice/ListPage';
import WritePage from '../pages/artice/WritePage';
import ViewPage from '../pages/artice/ViewPage';
import ModifyPage from '../pages/artice/ModifyPage';
import UserListPage from '../pages/admin/UserListPage';
import ArticleListPage from '../pages/admin/ArticleListPage';
import FindIdPage from '../pages/member/FindIdPage';
import FindPwPage from '../pages/member/FindPwPage';
import UpdatePwPage from '../pages/member/UpdatePwPage';
import ArticleModifyPage from '../pages/admin/ArticleModifyPage';
import CsListPage from '../pages/cs/CsListPage';
import CsWritePage from '../pages/cs/CsWritePage';
import CsViewPage from '../pages/cs/CsViewPage';
import ConfigPage from '../pages/admin/ConfigPage';
import GroupPlanPage from '../pages/member/GroupPlanPage';
import GroupPage from '../pages/private/GroupPage';
import ChatPage from '../pages/private/ChatPage';
import ProjectPage from '../pages/private/ProjectPage';
import CalendarPage from '../pages/private/CalendarPage';
import MyPage from '../pages/private/MyPage';
import PlanOrderPage from '../pages/member/PlanOrderPage';
import DocPage from '../pages/private/DocPage';
import PrivateRoute from './PrivateRoute';
import CsTermsPage from '../pages/cs/CsTermsPage';
import AdminMain from '../pages/admin/AdminMain';
import SocialKakao from '../components/auth/SocialKakao';
import KakaoRedirect from '../components/auth/KakaoRedirect';

const root = createBrowserRouter([
    // member
    { path: '/login', element: <LoginPage /> },
    { path: '/signup', element: <SignupPage /> },
    { path: '/terms', element: <TermsPage /> },
    { path: '/register', element: <RegisterPage /> },
    { path: '/complete', element: <CompletePage /> },
    { path: '/findId', element: <FindIdPage /> },
    { path: '/findPw', element: <FindPwPage /> },
    { path: '/updatePw', element: <UpdatePwPage /> },
    { path: '/groupPlan', element: <GroupPlanPage /> },
    { path: '/planOrder', element: <PlanOrderPage /> },

    //auth Test
    { path: '/auth', element: <KakaoRedirect /> },
    { path: '/test', element: <SocialKakao /> },

    // main
    {
        path: '/',
        element: (
            <PrivateRoute allowedRoles={['USER', 'ADMIN', 'MANAGER']}>
                <MainPage />
            </PrivateRoute>
        ),
    },

    // private
    {
        path: '/group',
        element: (
            <PrivateRoute allowedRoles={['USER', 'ADMIN', 'MANAGER']}>
                <GroupPage />
            </PrivateRoute>
        ),
    },

    {
        path: '/chat',
        element: (
            <PrivateRoute allowedRoles={['USER', 'ADMIN', 'MANAGER']}>
                <ChatPage />
            </PrivateRoute>
        ),
    },

    {
        path: '/project',
        element: (
            <PrivateRoute allowedRoles={['USER', 'ADMIN', 'MANAGER']}>
                <ProjectPage />
            </PrivateRoute>
        ),
    },

    {
        path: '/calendar',
        element: (
            <PrivateRoute allowedRoles={['USER', 'ADMIN', 'MANAGER']}>
                <CalendarPage />
            </PrivateRoute>
        ),
    },

    {
        path: '/mypage',
        element: (
            <PrivateRoute allowedRoles={['USER', 'ADMIN', 'MANAGER']}>
                <MyPage />
            </PrivateRoute>
        ),
    },

    {
        path: '/doc',
        element: (
            <PrivateRoute allowedRoles={['USER', 'ADMIN', 'MANAGER']}>
                <DocPage />
            </PrivateRoute>
        ),
    },

    // article
    {
        path: '/list',
        element: (
            <PrivateRoute allowedRoles={['USER', 'ADMIN', 'MANAGER']}>
                <ListPage />
            </PrivateRoute>
        ),
    },

    {
        path: '/write',
        element: (
            <PrivateRoute allowedRoles={['USER', 'ADMIN', 'MANAGER']}>
                <WritePage />
            </PrivateRoute>
        ),
    },

    {
        path: '/view',
        element: (
            <PrivateRoute allowedRoles={['USER', 'ADMIN', 'MANAGER']}>
                <ViewPage />
            </PrivateRoute>
        ),
    },

    {
        path: '/modify',
        element: (
            <PrivateRoute allowedRoles={['USER', 'ADMIN', 'MANAGER']}>
                <ModifyPage />
            </PrivateRoute>
        ),
    },

    // admin
    {
        path: '/config',
        element: (
            <PrivateRoute allowedRoles={['ADMIN', 'MANAGER']}>
                <ConfigPage />
            </PrivateRoute>
        ),
    },

    {
        path: '/userList',
        element: (
            <PrivateRoute allowedRoles={['ADMIN', 'MANAGER']}>
                <UserListPage />
            </PrivateRoute>
        ),
    },

    {
        path: '/articleList',
        element: (
            <PrivateRoute allowedRoles={['ADMIN', 'MANAGER']}>
                <ArticleListPage />
            </PrivateRoute>
        ),
    },

    {
        path: '/admin',
        element: (
            <PrivateRoute allowedRoles={['ADMIN', 'MANAGER']}>
                <AdminMain />
            </PrivateRoute>
        ),
    },

    {
        path: '/articleModify',
        element: (
            <PrivateRoute allowedRoles={['ADMIN', 'MANAGER']}>
                <ArticleModifyPage />
            </PrivateRoute>
        ),
    },

    // cs
    {
        path: '/csList',
        element: (
            <PrivateRoute allowedRoles={['USER', 'ADMIN', 'MANAGER']}>
                <CsListPage />
            </PrivateRoute>
        ),
    },

    {
        path: '/csWrite',
        element: (
            <PrivateRoute allowedRoles={['USER', 'ADMIN', 'MANAGER']}>
                <CsWritePage />
            </PrivateRoute>
        ),
    },

    {
        path: '/csView',
        element: (
            <PrivateRoute allowedRoles={['USER', 'ADMIN', 'MANAGER']}>
                <CsViewPage />
            </PrivateRoute>
        ),
    },

    {
        path: '/csTerms',
        element: (
            <PrivateRoute allowedRoles={['USER', 'ADMIN', 'MANAGER']}>
                <CsTermsPage />
            </PrivateRoute>
        ),
    },

    //{ path: '/csModify', element: <CsModifyPage /> },
]);
export default root;
