import '../styles/globals.css';

import { Dispatch, ReactNode, createContext, useReducer } from 'react';

import type { AppProps } from 'next/app';
import CoffeeStore from './types/CoffeeStore';
import localFont from '@next/font/local';

type InitialStateType = {
	latLong: string;
	coffeeStore: Array<CoffeeStore>;
};

export enum ACTION_TYPES {
	SET_LAT_LONG = 'SET_LAT_LONG',
	SET_COFFEE_STORES = 'SET_COFFEE_STORES',
}

export type ActionType = {
	type: ACTION_TYPES;
	payload: InitialStateType;
};

const initialState = {
	latLong: '',
	coffeeStore: [] as Array<CoffeeStore>,
};

export const StoreContext = createContext<{
	state: InitialStateType;
	dispatch: Dispatch<any>;
}>({
	state: initialState,
	dispatch: () => null,
});

const storeReducer = (
	state: InitialStateType,
	action: ActionType
): InitialStateType => {
	switch (action.type) {
		case ACTION_TYPES.SET_LAT_LONG:
			return { ...state, latLong: action.payload.latLong };
		case ACTION_TYPES.SET_COFFEE_STORES:
			return { ...state, coffeeStore: action.payload.coffeeStore };
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};

const StoreProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(storeReducer, initialState);

	return (
		<StoreContext.Provider value={{ state, dispatch }}>
			{children}
		</StoreContext.Provider>
	);
};

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
		<StoreProvider>
			<main className={ibmPlexSans.className}>
				<Component {...pageProps} />
			</main>
		</StoreProvider>
	);
}
