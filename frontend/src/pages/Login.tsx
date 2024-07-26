import { useState } from 'react';

export const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = (e: any) => {
		e.preventDefault();
		// Handle login logic here
	};

	return (
		<div>
			<form onSubmit={handleLogin}>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
					required
				/>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
					required
				/>
				<button type="submit">Login</button>
			</form>
		</div>
	);
};
