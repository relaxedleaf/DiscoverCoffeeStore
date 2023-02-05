import { NextApiRequest, NextApiResponse } from 'next';
import { airtableRecordToCoffeeStore, table } from '../../lib/utils/airtable';

import CoffeeStore from '../types/CoffeeStore';
import ErrorResponse from '../types/ErrorResponse';

const insertCoffeeStore = async (
	req: NextApiRequest,
	res: NextApiResponse<CoffeeStore | ErrorResponse>
) => {
	try {
		if (req.method !== 'POST') {
			res.status(400).json({ message: 'POST route' });
		}

		const { id, name, imgUrl, address, neighborhood, voting } = req.body;

        if (!id || !name){
            return res.status(400).json({ message: 'Missing ID or name' });
        }

		const findCoffeeStoreRecords = await table
			.select({
				filterByFormula: `id="${id}"`,
			})
			.firstPage();

		if (findCoffeeStoreRecords.length) {
			res.json(airtableRecordToCoffeeStore(findCoffeeStoreRecords)[0]);
		} else {
			// Create a record
			const records = await table.create([
				{
					fields: {
						id,
						name,
						imgUrl,
						address,
						neighborhood,
						voting,
					},
				},
			]);
			res.json(airtableRecordToCoffeeStore(records)[0]);
		}
	} catch (err) {
        const errMsg = 'Error creating or finding a store';
		console.error(errMsg, err);
		res.status(500).json({ message: errMsg });
	}
};

export default insertCoffeeStore;
