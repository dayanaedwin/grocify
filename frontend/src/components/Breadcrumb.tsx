import { Link, useLocation, matchPath } from 'react-router-dom';
import { breadcrumbList } from '../constants';

export const Breadcrumb: React.FC<{ title?: string }> = ({ title }) => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    const crumbs = pathnames.map((_, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        let breadcrumbName = '';

        Object.keys(breadcrumbList).forEach((key) => {
            const match = matchPath(key, to);
            if (match) {
                breadcrumbName = (key.includes('/:id') && title) ? title : breadcrumbList[key];
            };
        });

        return { to, breadcrumbName };
    });


    

    return (
        <nav className="text-gray-600 text-xs" aria-label="breadcrumb">
            <ol className="list-reset flex">
                <li>
                    <Link to="/" className="text-black hover:underline">Home</Link>
                </li>
                {crumbs.map((crumb, index) => (
                    <li key={crumb.to} className="flex items-center">
                        <span className="mx-1">/</span>
                        {index === crumbs.length - 1 ? (
                            <span className="text-gray-500">{crumb.breadcrumbName}</span>
                        ) : (
                            <Link to={crumb.to} className="text-black hover:underline">
                                {crumb.breadcrumbName}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};