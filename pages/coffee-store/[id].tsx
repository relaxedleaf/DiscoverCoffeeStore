import { GetStaticPaths, GetStaticProps } from 'next';

import Link from 'next/link';
import CoffeeStore from '../types/CoffeeStore';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from './coffee-store.module.scss';
import Image from 'next/image';
import classNames from 'classnames';
import { fetchCoffeeStores } from '../../lib/coffee-store';
import { useCallback, useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../store/storeContext';
import axios from 'axios';
import useSWR from 'swr';

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const coffeeStores = await fetchCoffeeStores();

	return {
		props: {
			coffeeStore:
				coffeeStores.find((store) => {
					if (!params || params.id === undefined) {
						return false;
					}

					return store.id === params.id;
				}) || null,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const coffeeStores = await fetchCoffeeStores();

	return {
		paths: coffeeStores.map((store) => {
			return {
				params: {
					id: store.id.toString(),
				},
			};
		}),
		fallback: true,
	};
};

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const CoffeeStore = (props: { coffeeStore: CoffeeStore | null }) => {
	const router = useRouter();

	const [coffeeStore, setCoffeeStore] = useState(props.coffeeStore);
	const id = router.query.id;
	const [votingCount, setVotingCount] = useState(0);

	const { data, error } = useSWR(
		`/api/getCoffeeStoreById/?id=${id}`,
		fetcher
	);

	useEffect(() => {
		console.log(data);
		if (!data) {
			return;
		}
		setCoffeeStore(data as CoffeeStore);
		setVotingCount((data as CoffeeStore).voting);
	}, [data]);

	const {
		state: { coffeeStoresNearMe },
	} = useContext(StoreContext);

	const handleCreateCoffeeStore = useCallback(async (cs?: CoffeeStore) => {
		try {
			const response = await axios.post('/api/insertCoffeeStore', {
				...cs,
			});
			console.log(response.data);
			setCoffeeStore(response.data);
			setVotingCount((response.data as CoffeeStore).voting);
		} catch (err) {
			console.log(err);
		}
	}, []);

	useEffect(() => {
		if (id && !props.coffeeStore && coffeeStoresNearMe.length) {
			const cs =
				coffeeStoresNearMe.find((store) => {
					return store.id === id;
				}) || null;

			if (cs) {
				setCoffeeStore(cs);
				handleCreateCoffeeStore(cs);
			}
		} else if (props.coffeeStore) {
			handleCreateCoffeeStore(props.coffeeStore);
		}
	}, [id, props.coffeeStore, coffeeStoresNearMe, handleCreateCoffeeStore]);

	const handleUpvoteButton = useCallback(async () => {
		if (!coffeeStore) {
			return;
		}
		try {
			const response = await axios.put('/api/upvoteCoffeeStoreById', {
				id: coffeeStore.id,
			});
			const cf = response.data as CoffeeStore;
			setVotingCount(cf.voting);
		} catch (err) {
			console.log(err);
		}
	}, [coffeeStore]);

	// Does route exist in getStaticPaths
	if (router.isFallback || !coffeeStore) {
		return <></>;
	}

	if (error) {
		return <div>Something went wrong retrieving coffee store</div>;
	}

	const { address, name, neighborhood, imgUrl } = coffeeStore;

	return (
		<div className={styles.layout}>
			<Head>
				<title>{name}</title>
			</Head>
			<div className={styles.container}>
				<div className={styles.col1}>
					<div className={styles.backToHomeLink}>
						<Link href='/'>← Back to home</Link>
					</div>
					<div className={styles.nameWrapper}>
						<h1 className={styles.name}>{name}</h1>
					</div>
					<Image
						className={styles.storeImg}
						src={imgUrl}
						width={600}
						height={360}
						alt={name}
					/>
				</div>
				<div className={classNames('glass', styles.col2)}>
					{address && (
						<div className={styles.iconWrapper}>
							<Image
								src='/static/icons/places.svg'
								width={24}
								height={24}
								alt='Location Icon'
							/>
							<p className={styles.text}>{address}</p>
						</div>
					)}
					{neighborhood && (
						<div className={styles.iconWrapper}>
							<Image
								src='/static/icons/nearMe.svg'
								width={24}
								height={24}
								alt='Near me'
							/>
							<p className={styles.text}>{neighborhood}</p>
						</div>
					)}
					<div className={styles.iconWrapper}>
						<Image
							src='/static/icons/star.svg'
							width={24}
							height={24}
							alt='Star'
						/>
						<p className={styles.text}>{votingCount}</p>
					</div>

					<button
						className={styles.upvoteButton}
						onClick={handleUpvoteButton}
					>
						Upvote!
					</button>
				</div>
			</div>
		</div>
	);
};

export default CoffeeStore;
