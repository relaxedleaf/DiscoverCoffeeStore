import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import styles from './card.module.scss';

const Card = ({
	name,
	imgUrl,
	href,
}: {
	name: string;
	imgUrl: string;
	href: string;
}) => {
	return (
		<Link href={href} className={styles.cardLink}>
			<div className={classNames('glass', styles.container)}>
				<div className={styles.cardHeaderWrapper}>
					<h2 className={styles.cardHeader}>{name}</h2>
				</div>
				<div className={styles.cardImageWrapper}>
					<Image
						className={styles.cardImage}
						src={imgUrl}
						width={260}
						height={160}
						alt={name}
					/>
				</div>
			</div>
		</Link>
	);
};

export default Card;
