interface HeadingProps {
    level: 1 | 2 | 3 | 4 | 5 | 6;
    children: React.ReactNode;
    className?: string;
    color?: 'primary' | 'secondary' | 'black';
}

export const Heading: React.FC<HeadingProps> = ({ level, children, className = '', color = 'primary' }) => {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;

    const colorClasses = {
        primary: 'text-primary',
        secondary: 'text-white',
        black: 'text-black',
    };

    return (
        <Tag className={`font-bold ${colorClasses[color]} ${className}`}>
            {children}
        </Tag>
    );
};
