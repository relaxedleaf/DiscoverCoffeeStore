import type { NextApiRequest, NextApiResponse } from 'next';

import CoffeeStore from '../types/CoffeeStore';
import ErrorResponse from '../types/ErrorResponse';

import { airtableRecordToCoffeeStore, table } from '../../lib/utils/airtable';

type QueryData = {
	id: string;
};

const getCoffeeStoreById = async (
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
		const { id } = query;

		const findCoffeeStoreRecords = await table
			.select({
				filterByFormula: `id="${id}"`,
			})
			.firstPage();

		if (findCoffeeStoreRecords.length) {
            res.json(airtableRecordToCoffeeStore(findCoffeeStoreRecords));
		}
	} catch (err) {
		console.error('There is an error', err);
		res.status(500).json({ message: 'Oh no! Something went wrong' });
	}
};

function validateQuery(query: QueryData) {
	const { id } = query;

	if (!id || typeof id !== 'string') {
		return 'Invalid id';
	}

	return null;
}

export default getCoffeeStoreById;
