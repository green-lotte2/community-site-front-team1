import React from 'react';
import SideBoxComponent from './SideBoxComponent';
import { Link } from 'react-router-dom';
import { ArticleListProvider } from './SideListProvider';
import { useSelector } from 'react-redux';

const SideBarComponent = () => {
    const loginSlice = useSelector((state) => state.loginSlice) || {};
    const role = loginSlice.userRole;

    return (
        <ArticleListProvider>
            <section id="sideBar">
                <Link to="/" className="boxTitle">
                    <img src="../images/zeroPie2.png" alt="" />
                    <div>
                        <p>ZeroPie</p>
                    </div>
                </Link>

                <SideBoxComponent sideBarCate={'private'}></SideBoxComponent>
                <SideBoxComponent sideBarCate={'article'}></SideBoxComponent>
                {(role === 'MANAGER' || role === 'ADMIN') && <SideBoxComponent sideBarCate={'admin'} />}
                <SideBoxComponent sideBarCate={'cs'}></SideBoxComponent>
            </section>
        </ArticleListProvider>
    );
};

export default SideBarComponent;
