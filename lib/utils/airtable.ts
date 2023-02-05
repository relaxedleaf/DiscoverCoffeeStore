import Airtable, { FieldSet, Records } from 'airtable';

import CoffeeStore from '../../types/CoffeeStore';

Airtable.configure({
	endpointUrl: 'https://api.airtable.com',
	apiKey: process.env.AIRTABLE_API_KEY!,
});
const base = Airtable.base(process.env.AIRTABLE_BASE_KEY!);

export const table = base('coffee-stores');

export const airtableRecordToCoffeeStore = (records: Records<FieldSet>) => {
	return records.map((record) => {
		return {
			...(record.fields as CoffeeStore),
		};
	}) as Array<CoffeeStore>;
};

export const findCoffeeStoreById = async (id: string, options?: {withId: boolean}) => {
	const findCoffeeStoreRecords = await table
		.select({
			filterByFormula: `id="${id}"`,
		})
		.firstPage();
	if (findCoffeeStoreRecords.length) {
        if(options && options.withId){
            return {
                coffeeStore: airtableRecordToCoffeeStore(findCoffeeStoreRecords)[0],
                id: findCoffeeStoreRecords[0].id
            }
        }
		return airtableRecordToCoffeeStore(findCoffeeStoreRecords)[0];
	}
	return null;
};
