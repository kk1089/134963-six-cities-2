import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectFavoriteRequestStatusDetails } from '../../redux/slices/favorites/favorite-slice';
import { AppRoute, FavoriteStatus } from '../../const';
import { fetchFavoriteAction, toggleFavoriteAction } from '../../redux/slices/favorites/favorite-thunks';
import { getToken } from '../../services/token';
import { useNavigate } from 'react-router-dom';
import { updateOffers } from '../../redux/slices/offers/offers-slice';
import { updateOfferFavoriteStatus } from '../../redux/slices/offer/offer-slice';
import { toast } from 'react-hot-toast';

type TCardBookmarkButtonProps = {
    extraClass?: 'offer' | 'place-card';
    isFavorite: boolean;
    offerId: string;
    width?: number;
    height?: number;
}

function CardBookmarkButton({ extraClass = 'place-card', isFavorite, offerId, width = 18, height = 19 }: TCardBookmarkButtonProps): JSX.Element {
  const token = getToken();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectFavoriteRequestStatusDetails);
  const bookmarksLabel = `${isFavorite ? 'In' : 'To'} bookmarks`;

  const handleBookmarkClick = () => {
    if (!token) {
      return navigate(AppRoute.Login);
    }

    dispatch(toggleFavoriteAction({ offerId, status: isFavorite ? FavoriteStatus.Removed : FavoriteStatus.Added }))
      .unwrap()
      .then(() => {
        if (status.isSuccess) {
          dispatch(fetchFavoriteAction());
          dispatch(updateOffers(offerId));
          dispatch(updateOfferFavoriteStatus(offerId));
        }
      }).catch(() => {
        toast.error('An error occurred while updating the bookmark.');
      });
  };


  return (
    <button
      className={clsx(`${extraClass}__bookmark-button button`, {
        [`${extraClass}__bookmark-button--active`]: isFavorite,
      })}
      type="button"
      onClick={handleBookmarkClick}
      disabled = {status.isLoading}
    >
      <svg className={`${extraClass}__bookmark-icon`} width={width} height={height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">
        {bookmarksLabel}
      </span>
    </button>
  );
}

export default CardBookmarkButton;
