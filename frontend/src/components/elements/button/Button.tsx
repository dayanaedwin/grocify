
interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    variant?: 'primary' | 'secondary' | 'transparent';
    size?: 'small' | 'medium' | 'large';
    type?: 'button' | 'submit' | 'reset',
    disabled?: true | false
}

export const Button: React.FC<ButtonProps> = ({
    onClick,
    children,
    className = '',
    variant = 'primary',
    size = 'medium',
    type = 'button',
    disabled
}) => {

    const baseStyles = 'w-full font-semibold py-2 rounded focus:outline-none focus:ring cursor-pointer';

    const variantStyles = {
        primary: 'bg-primary text-white border hover:bg-white hover:text-primary hover:border-primary focus:ring-1 focus:ring-primary',
        secondary: 'bg-white text-primary hover:bg-gray-200 focus:ring-white',
        transparent: 'bg-white text-black hover:bg-gray-200 focus:ring-white',
    };

    const sizeStyles = {
        small: 'text-sm px-2 py-1',
        medium: 'text-base px-4 py-2',
        large: 'text-lg px-6 py-3',
    };
    return (
        <button
            onClick={onClick}
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
            type={type}
            disabled={disabled}
        >
            {children}
        </button>
    )
}