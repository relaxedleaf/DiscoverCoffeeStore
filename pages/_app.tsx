import '../styles/globals.css';

import type { AppProps } from 'next/app';
import localFont from '@next/font/local';

const year = new Date().getFullYear();

const ibmPlexSans = localFont({
	src: [
		{
			path: '../public/fonts/IBMPlexSans-Regular.ttf',
			style: 'normal',
			weight: '500',
		},
		{
			path: '../public/fonts/IBMPlexSans-SemiBold.ttf',
			style: 'normal',
			weight: '600',
		},
		{
			path: '../public/fonts/IBMPlexSans-Bold.ttf',
			style: 'normal',
			weight: '700',
		},
	],
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<main className={ibmPlexSans.className}>
			<Component {...pageProps} />
			<footer>
				<p>© {year} Guanghui Li</p>
			</footer>
		</main>
	);
}
