import Map from '../map/map';
import Sorting from '../sorting/sorting';
import OfferList from '../offer-list/offer-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setActiveOffer } from '../../redux/action/action';


function Cities(): JSX.Element {
  const dispatch = useAppDispatch();
  const offers = useAppSelector((state) => state.offers);
  const activeCity = useAppSelector((state) => state.city);
  const activeOfferId = useAppSelector((state) => state.activeOfferId);

  const handleCardHover = (id: string | null) => {
    dispatch(setActiveOffer(id));
  };

  const mapOffers = offers.length > 0 ? offers : [];
  const city = offers.length > 0 ? offers[0].city : null;

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{`places to stay in ${activeCity}`}</b>
        <Sorting />
        <OfferList
          offers={offers}
          listBlock="cities__places-list"
          block="cities"
          onCardHover={handleCardHover}
        />
      </section>
      <div className="cities__right-section">
        <Map
          offers={mapOffers}
          city={city}
          activeOfferId={activeOfferId}
          mapClass="cities__map"
        />
      </div>
    </div>
  );
}

export default Cities;
