import { ACTION_TYPES, StoreContext } from '../store/storeContext';
import { useContext, useState } from 'react';

const useTrackLocation = () => {
	const [locErrorMSg, setLocErrorMsg] = useState('');
	const [isFindingLocation, setIsFindingLocation] = useState(false);

	const {
		dispatch,
		state: { latLong },
	} = useContext(StoreContext);

	const success = (position: GeolocationPosition) => {
		const latitude = position.coords.latitude;
		const longitude = position.coords.longitude;

		dispatch({
			type: ACTION_TYPES.SET_LAT_LONG,
			payload: {
				latLong: `${latitude},${longitude}`,
			},
		});

		setLocErrorMsg('');
		setIsFindingLocation(false);
	};

	const error = () => {
		setIsFindingLocation(false);
		setLocErrorMsg('Unable to retrieve your location');
	};

	const handleTrackLocation = () => {
		setIsFindingLocation(true);
		if (!navigator.geolocation) {
			setLocErrorMsg('Geolocation is not supported by your browser');
			setIsFindingLocation(false);
		} else {
			navigator.geolocation.getCurrentPosition(success, error);
		}
	};

	return {
		locErrorMSg,
		latLong,
		handleTrackLocation,
		isFindingLocation,
	};
};

export default useTrackLocation;
