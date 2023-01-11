import Link from 'next/link';
import { useRouter } from 'next/router';

const CoffeeStore = () => {
	const router = useRouter();

	console.log({ router });

	return (
		<>
			<Link href='/'>Back to home</Link>
			<div>Coffee Store Page {router.query.id}</div>
		</>
	);
};

export default CoffeeStore;
