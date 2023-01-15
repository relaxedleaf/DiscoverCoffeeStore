type FourSquarePlaceResponse = {
	context: {
		geo_bounds: {
			circle: {
				center: {
					latitude: number;
					longitude: number;
				};
				radius: number;
			};
		};
	};
	results: Array<{
		fsq_id: string;
		categories: Array<{
			id: number;
			name: string;
			icon: {
				prefix: string;
				suffix: string;
			};
		}>;
		chains: Array<{
			id: string;
			name: string;
		}>;
		distance: number;
		geocodes: {
			main: {
				latitude: number;
				longitude: number;
			};
			roof: {
				latitude: number;
				longitude: number;
			};
		};
		link: string;
		location: {
			address: string;
			census_block: string;
			country: string;
			dma: string;
			formatted_address: string;
			locality: string;
			postcode: string;
			region: string;
		};
		name: string;
		related_places: any;
		timezone: string;
	}>;
};

export default FourSquarePlaceResponse;
