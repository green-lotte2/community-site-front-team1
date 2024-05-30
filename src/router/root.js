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

const root = createBrowserRouter([
    // Landing
    { path: '/', element: <LandingPage /> },

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

    // main
    { path: '/main', element: <MainPage /> },

    // private
    { path: '/group', element: <GroupPage /> },

    // article
    { path: '/list', element: <ListPage /> },
    { path: '/write', element: <WritePage /> },
    { path: '/view', element: <ViewPage /> },
    { path: '/modify', element: <ModifyPage /> },

    // admin
    { path: '/config', element: <ConfigPage /> },
    { path: '/userList', element: <UserListPage /> },
    { path: '/articleList', element: <ArticleListPage /> },
    { path: '/articleModify', element: <ArticleModifyPage /> },

    // cs
    { path: '/csList', element: <CsListPage /> },
    { path: '/csWrite', element: <CsWritePage /> },
    { path: '/csView', element: <CsViewPage /> },
    //{ path: '/csModify', element: <CsModifyPage /> },

]);
export default root;
