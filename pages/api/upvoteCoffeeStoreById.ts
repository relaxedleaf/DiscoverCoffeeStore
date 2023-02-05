import { NextApiRequest, NextApiResponse } from 'next';
import {
	airtableRecordToCoffeeStore,
	findCoffeeStoreById,
	table,
} from '../../lib/utils/airtable';

import CoffeeStore from '../../types/CoffeeStore';
import ErrorResponse from '../../types/ErrorResponse';

const upvoteCoffeeStoreById = async (
	req: NextApiRequest,
	res: NextApiResponse<CoffeeStore | ErrorResponse>
) => {
	try {
		if (req.method !== 'PUT') {
			res.status(400).json({ message: 'PUT route' });
		}

		const { id } = req.body;

		if (!id) {
			return res.status(400).json({ message: 'Missing ID' });
		}

		const data = await findCoffeeStoreById(id, {withId: true});
        const {id: recordId, coffeeStore } = data as {id: string, coffeeStore: CoffeeStore};

		if (!coffeeStore) {
			res.status(400).json({ message: 'Not found' });
		} else {
			const newVote = coffeeStore.voting + 1;

			const response = await table.update([
				{
					id: recordId,
					fields: {
						voting: newVote,
					},
				},
			]);

            if(response.length){
                return res.json(airtableRecordToCoffeeStore(response)[0]);
            }   

            res.status(500).json({ message: 'Nothing was updated' });
		}
	} catch (err) {
		const errMsg = 'Error upvoting coffee store';
		console.error(errMsg, err);
		res.status(500).json({ message: errMsg });
	}
};

export default upvoteCoffeeStoreById;
