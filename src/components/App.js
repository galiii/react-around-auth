import React from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

import Header from "./Header";

import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";

import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import Footer from "./Footer";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import api from "../utils/api.js";
import * as auth from "../utils/auth";
import { SUCCESS, FAILURE } from "../utils/constants.js";
import "../index.css";

function App() {
  // States for auth
  const [isSuccessful, setIsSuccessful] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  //popup
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  /* States when you ready Login */
  // Popups
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const history = useHistory();

  /* Get User Information && Card List from the api */
  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardData]) => {
        console.log(userData);
        setCurrentUser({ ...userData });
        setCards([...cardData]);
      })
      .catch(console.error);
  }, []);

  const handleSignUp = ({ email, password }) => {
    auth
      .register({ email, password })
      .then((res) => {
        setIsSuccessful(true);
          setMessage(SUCCESS);
        history.push("/signin");
      })
      .catch((err) => {
        console.error(err);
        setIsSuccessful(false);
        setMessage(FAILURE);
      })
      .finally(() => {
        console.log("finally register");
        setIsInfoTooltipOpen(true);
      });
  };

  const handleLogin = ({ email, password }) => {
    auth
      .login({ email, password })
      .then((res) => {
        if (res.token) {
          setIsLoggedIn(true);
          console.log("in login", res);
          history.push("/");
          // for tooltipinfo
          setIsSuccessful(true);
          setMessage(SUCCESS);
          return;
        } else {
          setIsSuccessful(false);
          setMessage(FAILURE);
        }
      })
      .catch((err) => {
        console.error(err);
        setIsSuccessful(false);
        setMessage(FAILURE);
      })
      .finally(() => {
        console.log("finally login");
        setIsInfoTooltipOpen(true);
      });
  };

  /* Click handlers */
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);

  const handleCardClick = (card) => {
    setSelectedCard({
      name: card.name,
      link: card.link,
    });
    setIsImagePopupOpen(true);
  };

  /* Like && DisLike Card handler */
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id); //Check one more time if this card was already liked
    api //Send a request to the API and getting the updated card data
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(console.error);
  };

  /* Delete Card handler */
  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then((res) => {
        setCards(
          (state) => state.filter((c) => c._id !== card._id) //Create array of cards that aren't delete
        );
      })
      .catch(console.error);
  };

  /* Edit profile User handler */
  const handleUpdateUser = (user) => {
    api
      .editProfileUserInfo(user)
      .then((res) => {
        setCurrentUser({
          ...res,
        });
        setIsEditProfilePopupOpen(false);
      })
      .catch(console.error)
      .finally(
        () => console.log("finally")
        //renderLoading(false, editProfileModel, buttonsSettings.edit)
      );
  };

  const handleUpdateAvatar = (link) => {
    api
      .updateUserImage(link)
      .then((res) => {
        setCurrentUser({
          ...res,
        });
        setIsEditAvatarPopupOpen(false);
      })
      .catch(console.error)
      .finally(
        () => console.log("finally")
        //renderLoading(false, editProfileModel, buttonsSettings.edit)
      );
  };

  /* Add new Card handler */
  const handleAddPlaceSubmit = (data) => {
    api
      .addCard(data)
      .then((res) => {
        //likes [] , _id, name, link, owner
        console.log("add res", res);
        setCards([res, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch(console.error)
      .finally(
        () => console.log("finally")
        //renderLoading(false, addCardModel, buttonsSettings.create)
      );
  };

  const closeAllPopups = () => {
    setIsInfoTooltipOpen(false);

    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  };

  const handleSignOut = () => {};

  /* User Authentication   */

  return (
    <div className="page__container">
      {/* embedding data from the currentUser using the  context provider  */}
      <CurrentUserContext.Provider value={currentUser}>
        <Header />

        <Switch>
          <Route path="/signup">
            <Register onSignUp={handleSignUp} />
          </Route>
          <Route path="/signin">
            <Login onLogin={handleLogin} />
          </Route>

          <ProtectedRoute isLoggedIn={isLoggedIn} path="/">
            <Main
              onEditAvatarClick={handleEditAvatarClick}
              onEditProfileClick={handleEditProfileClick}
              onAddPlaceClick={handleAddPlaceClick}
              cards={cards}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            <Footer />
          </ProtectedRoute>
          <Route path="/">
            {
              //if the user isLoggedIn send him to the Main page
              //else send him to the login/signin page
              isLoggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />
            }
          </Route>
        </Switch>

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSuccessful={isSuccessful}
          message={message}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />

        <PopupWithForm
          name="delete-card"
          title="Are you sure ?"
          formName="delete"
          buttonSubmitTitle="Yes"
          //isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          //onSubmit={handleDeleteCard}
        />

        {/** Image Popup*/}
        <ImagePopup
          isOpen={isImagePopupOpen}
          name="image"
          selectedCard={selectedCard}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
