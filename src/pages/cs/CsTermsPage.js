import React, { useEffect, useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import axios from 'axios';
import { RootUrl } from '../../api/RootUrl';
const rootURL = RootUrl();
const CsTermsPage = () => {
    const [privacy, setPrivacy] = useState('');
    const [terms, setTerms] = useState('');

    const getTerms = async () => {
        axios
            .get(`${rootURL}/terms`)
            .then((data) => {
                setPrivacy(data.data.result1);
                setTerms(data.data.result2);

                console.log(data.data.result1);
                console.log(data.data.result2);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getTerms();
    }, []);

    return (
        <MainLayout>
            <div className="contentBox boxStyle7">
                <div className="contentColumn csTerms">
                    <p>제로파이 이용 약관</p>
                    <textarea name="" readOnly id="" value={terms}></textarea>
                </div>

                <div className="contentColumn csTerms">
                    <p>개인 정보 동의 이용 약관</p>
                    <textarea name="" id="" readOnly value={privacy}></textarea>
                </div>
            </div>
        </MainLayout>
    );
};

export default CsTermsPage;
