import { Link } from 'react-router-dom';

export const Footer = () => {
	return (
		<footer className="bg-secondary py-4 px-4 sm:px-8 lg:px-32">
			<div className="container mx-auto">
				<div className="flex flex-wrap justify-center md:justify-between mb-6 px-20">
					<div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 md:px-6 py-5 mb-6 md:mb-0 text-center md:text-left">
						<h1 className='uppercase text-gray-700 font-bold mb-4'>About Us</h1>
						<ul>
							<li className="mt-2">
								<Link to='' className="text-gray-600 hover:text-gray-900">Our Story</Link>
							</li>
							<li className="mt-2">
								<Link to='' className="text-gray-600 hover:text-gray-900">Our Mission</Link>
							</li>
							<li className="mt-2">
								<Link to='' className="text-gray-600 hover:text-gray-900">Our Team</Link>
							</li>
						</ul>
					</div>
					<div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 md:px-6 py-5 mb-6 md:mb-0 text-center md:text-left">
						<h1 className='uppercase text-gray-700 font-bold mb-4'>Help</h1>
						<ul>
							<li className="mt-2">
								<Link to='' className="text-gray-600 hover:text-gray-900">FAQ</Link>
							</li>
							<li className="mt-2">
								<Link to='' className="text-gray-600 hover:text-gray-900">Contact Us</Link>
							</li>
							<li className="mt-2">
								<Link to='' className="text-gray-600 hover:text-gray-900">Support</Link>
							</li>
						</ul>
					</div>
					<div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 md:px-6 py-5 mb-6 md:mb-0 text-center md:text-left">
						<h1 className='uppercase text-gray-700 font-bold mb-4'>Social</h1>
						<ul>
							<li className="mt-2">
								<Link to='' className="text-gray-600 hover:text-gray-900">Facebook</Link>
							</li>
							<li className="mt-2">
								<Link to='' className="text-gray-600 hover:text-gray-900">Twitter</Link>
							</li>
							<li className="mt-2">
								<Link to='' className="text-gray-600 hover:text-gray-900">Instagram</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="text-center">
					<p className="text-gray-600 text-xs">&copy; 2024 Grocify. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
};