import React from 'react';
import PropTypes from 'prop-types';

const AvatarComponent = ({ avatarUrl, size = 30 }) => {
    const defaultAvatar = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            style={{
                display: "block",
                height: `${size}px`,
                width: `${size}px`,
                fill: "currentColor",
            }}
            viewBox="0 0 32 32"
        >
            <path d="M16 .7C7.56.7.7 7.56.7 16S7.56 31.3 16 31.3 31.3 24.44 31.3 16 24.44.7 16 .7zm0 28c-4.02 0-7.6-1.88-9.93-4.81a12.43 12.43 0 0 1 6.45-4.4A6.5 6.5 0 0 1 9.5 14a6.5 6.5 0 0 1 13 0 6.51 6.51 0 0 1-3.02 5.5 12.42 12.42 0 0 1 6.45 4.4A12.67 12.67 0 0 1 16 28.7z" />
        </svg>
    );

    return avatarUrl ? (
        <img
            src={avatarUrl}
            alt="User Avatar"
            className="rounded-circle"
            style={{
                width: `${size}px`,
                height: `${size}px`,
                objectFit: 'cover',
            }}
        />
    ) : (
        defaultAvatar
    );
};

AvatarComponent.propTypes = {
    avatarUrl: PropTypes.string,
    size: PropTypes.number,
};

AvatarComponent.defaultProps = {
    avatarUrl: null,
    size: 30,
};

export default AvatarComponent;
