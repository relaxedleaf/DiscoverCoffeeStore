import '../styles/globals.css';

import type { AppProps } from 'next/app';

const year = new Date().getFullYear();

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Component {...pageProps} />
			<footer>
				<p>© {year} Guanghui Li</p>
			</footer>
		</>
	);
}
