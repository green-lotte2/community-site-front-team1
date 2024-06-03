import {
    faBolt,
    faBriefcase,
    faCircleInfo,
    faCode,
    faLightbulb,
    faNetworkWired,
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
};

const GroupIconComponent = ({ iconName }) => {
    const icon = iconMap[iconName];
    return icon ? <FontAwesomeIcon icon={icon} /> : null;
};

export default GroupIconComponent;
