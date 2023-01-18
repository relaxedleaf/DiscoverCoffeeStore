import '../styles/globals.css';

import type { AppProps } from 'next/app';
import StoreProvider from '../store/storeContext';
import localFont from '@next/font/local';

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
		<StoreProvider>
			<main className={ibmPlexSans.className}>
				<Component {...pageProps} />
			</main>
		</StoreProvider>
	);
}
