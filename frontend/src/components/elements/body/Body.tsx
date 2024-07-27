import React from 'react';

interface BodyProps {
    children?: React.ReactNode;
    className?: string;
    color?: 'primary' | 'secondary' | 'black' | 'danger';
    size?: 'small' | 'medium' | 'large';
}

export const Body: React.FC<BodyProps> = ({ children, className = '', color = 'primary', size = 'medium' }) => {
    const colorClasses = {
        primary: 'text-primary',
        secondary: 'text-white',
        black: 'text-black',        
        danger: 'text-red-700'
    };

    const sizeClasses = {
        small: 'text-sm',
        medium: 'text-base',
        large: 'text-lg',
    };

    return (
        <p className={`text-base leading-relaxed ${colorClasses[color]} ${className}`}>
            {children}
        </p>
    );
};
