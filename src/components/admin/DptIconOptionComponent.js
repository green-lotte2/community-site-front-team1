import {
    faBolt,
    faBriefcase,
    faCircleInfo,
    faCode,
    faComments,
    faEnvelope,
    faGears,
    faGlobe,
    faHeadset,
    faLightbulb,
    faMicrochip,
    faNetworkWired,
    faUser,
    faUserGear,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const DptIconOptionComponent = ({ selectOption }) => {
    return (
        <>
            <div className="custOption">
                <p className="option" onClick={selectOption} id="faUser">
                    <FontAwesomeIcon icon={faUser} />
                    &ensp;User
                </p>

                <p className="option" onClick={selectOption} id="faUserGear">
                    <FontAwesomeIcon icon={faUserGear} />
                    &ensp;UserGear
                </p>

                <p className="option" onClick={selectOption} id="faBriefcase">
                    <FontAwesomeIcon icon={faBriefcase} />
                    &ensp;Bag
                </p>

                <p className="option" onClick={selectOption} id="faBolt">
                    <FontAwesomeIcon icon={faBolt} />
                    &ensp;Bolt
                </p>

                <p className="option" onClick={selectOption} id="faNetworkWired">
                    <FontAwesomeIcon icon={faNetworkWired} />
                    &ensp;Network
                </p>

                <p className="option" onClick={selectOption} id="faGlobe">
                    <FontAwesomeIcon icon={faGlobe} />
                    &ensp;Global
                </p>

                <p className="option" onClick={selectOption} id="faCode">
                    <FontAwesomeIcon icon={faCode} />
                    &ensp;Code
                </p>

                <p className="option" onClick={selectOption} id="faHeadset">
                    <FontAwesomeIcon icon={faHeadset} />
                    &ensp;Headset
                </p>

                <p className="option" onClick={selectOption} id="faMicrochip">
                    <FontAwesomeIcon icon={faMicrochip} />
                    &ensp;Microchip
                </p>

                <p className="option" onClick={selectOption} id="faGears">
                    <FontAwesomeIcon icon={faGears} />
                    &ensp;Gears
                </p>

                <p className="option" onClick={selectOption} id="faComments">
                    <FontAwesomeIcon icon={faComments} />
                    &ensp;Comment
                </p>

                <p className="option" onClick={selectOption} id="faEnvelope">
                    <FontAwesomeIcon icon={faEnvelope} />
                    &ensp;Message
                </p>

                <p className="option" onClick={selectOption} id="faCircleInfo">
                    <FontAwesomeIcon icon={faCircleInfo} />
                    &ensp;Circle
                </p>

                <p className="option" onClick={selectOption} id="faLightbulb">
                    <FontAwesomeIcon icon={faLightbulb} />
                    &ensp;Lightbulb
                </p>
            </div>
        </>
    );
};

export default DptIconOptionComponent;
