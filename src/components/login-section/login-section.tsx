import { FormEvent, useRef, useState } from 'react';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../redux/slices/user/user-thunks';
import { selectLoginStatus } from '../../redux/slices/user/user-slice';
import { fetchFavoriteAction } from '../../redux/slices/favorites/favorite-thunks';
import { fetchOffers } from '../../redux/slices/offers/offers-thunks';

function LoginSection() {
  const [isFormValid, setIsFormValid] = useState(false);
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(selectLoginStatus);

  const handleInputChange = () => {
    if (loginRef.current && passwordRef.current) {
      const email = loginRef.current.value;
      const password = passwordRef.current.value;

      const isValidEmail = EMAIL_REGEX.test(email);
      const isValidPassword = PASSWORD_REGEX.test(password);

      setIsFormValid(isValidEmail && isValidPassword);
    }
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current && passwordRef.current) {
      const login = loginRef.current;
      const password = passwordRef.current;

      dispatch(
        loginAction({
          email: login.value,
          password: password.value,
        })
      )
        .unwrap()
        .then(() => {
          dispatch(fetchFavoriteAction());
          dispatch(fetchOffers());
        });
    }
  };

  return (
    <section className="login">
      <h1 className="login__title">Sign in</h1>
      <form
        className="login__form form"
        action="#"
        method="post"
        onSubmit={handleSubmit}
      >
        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden">E-mail</label>
          <input
            ref={loginRef}
            className="login__input form__input"
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden">Password</label>
          <input
            ref={passwordRef}
            className="login__input form__input"
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleInputChange}
          />
        </div>
        <button
          className="login__submit form__submit button"
          type="submit"
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? 'Loading...' : 'Sign in'}
        </button>
      </form>
    </section>
  );
}

export default LoginSection;
