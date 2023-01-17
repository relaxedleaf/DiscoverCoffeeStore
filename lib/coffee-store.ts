import CoffeeStore from '../pages/types/CoffeeStore';
import FourSquarePlaceResponse from '../pages/types/FourSquarePlaceResponse';
import { createApi } from 'unsplash-js';

const unsplash = createApi({
	accessKey: process.env.UNSPLASH_ACCESS_KEY as string,
});

const getUrlForCoffeeStores = ({
	latLong,
	query,
	limit,
}: {
	latLong: string;
	query: string;
	limit: number | string;
}) => {
	return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

const getCoffeeStorePhotos = async () => {
	const photos = await unsplash.search.getPhotos({
		query: 'coffee shop',
		page: 1,
		perPage: 30,
		orientation: 'landscape',
	});

	const photoUrls =
		photos.response?.results.map((result) => result.urls['small']) || [];

	return photoUrls;
};

const fetchCoffeeStores = async () => {
	const photos = await getCoffeeStorePhotos();
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: process.env.FOURSQUARE_API_KEY as string,
		},
	};

	const response = await fetch(
		getUrlForCoffeeStores({
			latLong: '36.51%2C-94.21',
			query: 'coffee',
			limit: 6,
		}),
		options
	)
		.then((response) => response.json() as Promise<FourSquarePlaceResponse>)
		.catch((err) => console.error(err));

	const coffeeStores: Array<CoffeeStore> = response
		? response.results.map((result, index) => {
				const neighborhood = result.location.neighborhood;
				return {
					id: result.fsq_id,
					name: result.name,
					imgUrl:
						photos.length > index
							? photos[index]
							: 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
					websiteUrl: '',
					address: result.location.formatted_address,
					neighborhood:
						neighborhood && neighborhood.length
							? neighborhood[0]
							: '',
				};
		  })
		: [];

	return coffeeStores;
};

export default fetchCoffeeStores;
