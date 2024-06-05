import React from 'react';
import SideBoxComponent from './SideBoxComponent';
import { Link } from 'react-router-dom';
import { ArticleListProvider } from './SideListProvider';

const SideBarComponent = () => {
    return (
        <ArticleListProvider>
            <section id="sideBar">
                <Link to="/main" className="boxTitle">
                    <img src="../images/zeroPie2.png" alt="" />
                    <div>
                        <p>ZeroPie</p>
                    </div>
                </Link>

                <SideBoxComponent sideBarCate={'private'}></SideBoxComponent>
                <SideBoxComponent sideBarCate={'article'}></SideBoxComponent>
                <SideBoxComponent sideBarCate={'admin'}></SideBoxComponent>
                <SideBoxComponent sideBarCate={'cs'}></SideBoxComponent>
            </section>
        </ArticleListProvider>
    );
};

export default SideBarComponent;
