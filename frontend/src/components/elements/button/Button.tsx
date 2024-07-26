
interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    variant?: 'primary' | 'secondary'; // Add variants if needed
    size?: 'small' | 'medium' | 'large'; // Add size options if needed
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

    const baseStyles = 'font-semibold py-2 px-4 rounded focus:outline-none focus:ring';

    const variantStyles = {
        primary: 'bg-primary text-white hover:bg-green-700 focus:ring-primary',
        secondary: 'bg-white text-primary hover:bg-gray-200 focus:ring-white',
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