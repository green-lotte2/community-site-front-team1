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

const iconMap = {
    faBolt: faBolt,
    faBriefcase: faBriefcase,
    faUserGear: faUserGear,
    faNetworkWired: faNetworkWired,
    faCode: faCode,
    faCircleInfo: faCircleInfo,
    faLightbulb: faLightbulb,
    faComments: faComments,
    faEnvelope: faEnvelope,
    faGears: faGears,
    faGlobe: faGlobe,
    faHeadset: faHeadset,
    faMicrochip: faMicrochip,
    faUser: faUser,
};

const GroupIconComponent = ({ iconName }) => {
    const icon = iconMap[iconName];
    return icon ? <FontAwesomeIcon icon={icon} /> : null;
};

export default GroupIconComponent;
