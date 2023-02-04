import Airtable, { FieldSet, Records } from 'airtable';

import CoffeeStore from '../../pages/types/CoffeeStore';

Airtable.configure({
	endpointUrl: 'https://api.airtable.com',
	apiKey: process.env.AIRTABLE_API_KEY!,
});
const base = Airtable.base(process.env.AIRTABLE_BASE_KEY!);

export const table = base('coffee-stores');

export const airtableRecordToCoffeeStore = (records: Records<FieldSet>) => {
    return records.map((record) => {
        return {
            ...record.fields as CoffeeStore
        }
    }) as Array<CoffeeStore>
}