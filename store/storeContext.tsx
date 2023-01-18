import { Dispatch, ReactNode, createContext, useReducer } from 'react';

import CoffeeStore from '../pages/types/CoffeeStore';

export type InitialStateType = {
	latLong: string;
	coffeeStoresNearMe: Array<CoffeeStore>;
};

export enum ACTION_TYPES {
	SET_LAT_LONG = 'SET_LAT_LONG',
	SET_COFFEE_STORES = 'SET_COFFEE_STORES',
}

export type ActionType = {
	type: ACTION_TYPES;
	payload: InitialStateType;
};

export type DispatchActionType = {
	type: ACTION_TYPES;
	payload: {
		latLong?: string;
		coffeeStoresNearMe?: Array<CoffeeStore>;
	};
};

export const initialState = {
	latLong: '',
	coffeeStoresNearMe: [] as Array<CoffeeStore>,
};

export const storeReducer = (
	state: InitialStateType,
	action: DispatchActionType
): InitialStateType => {
	switch (action.type) {
		case ACTION_TYPES.SET_LAT_LONG:
			if (action.payload.latLong === undefined) {
				throw new Error('latLong is undefined');
			}
			return { ...state, latLong: action.payload.latLong };
		case ACTION_TYPES.SET_COFFEE_STORES:
			if (action.payload.coffeeStoresNearMe === undefined) {
				throw new Error('coffeeStoresNearMe is undefined');
			}
			return {
				...state,
				coffeeStoresNearMe: action.payload.coffeeStoresNearMe,
			};
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};

export const StoreContext = createContext<{
	state: InitialStateType;
	dispatch: Dispatch<DispatchActionType>;
}>({
	state: initialState,
	dispatch: () => null,
});

const StoreProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(storeReducer, initialState);

	return (
		<StoreContext.Provider value={{ state, dispatch }}>
			{children}
		</StoreContext.Provider>
	);
};

export default StoreProvider;
