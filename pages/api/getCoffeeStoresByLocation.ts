import type { NextApiRequest, NextApiResponse } from 'next';

import CoffeeStore from '../../types/CoffeeStore';
import ErrorResponse from '../../types/ErrorResponse';
import { fetchCoffeeStores } from '../../lib/coffee-store';

type QueryData = {
	latLong: string;
	limit: string;
};

const getCoffeeStoresByLocation = async (
	req: NextApiRequest,
	res: NextApiResponse<Array<CoffeeStore> | ErrorResponse>
) => {
	const query = req.query as QueryData;
	const errorMsg = validateQuery(query);
	if (errorMsg) {
		res.status(400).json({ message: errorMsg });
		return;
	}

	try {
		const { latLong, limit } = query;

		const response = await fetchCoffeeStores(latLong, +limit);
		res.status(200).json(response);
	} catch (err) {
		console.error('There is an error', err);
		res.status(500).json({ message: 'Oh no! Something went wrong' });
	}
};

function validateQuery(query: QueryData) {
	const { latLong, limit } = query;

	if (!latLong || typeof latLong !== 'string') {
		return 'Invalid latLong';
	}

	if (!limit || typeof limit !== 'string') {
		return 'Invalid limit';
	}

	return null;
}

export default getCoffeeStoresByLocation;
