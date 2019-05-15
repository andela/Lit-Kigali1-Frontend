import {
  SET_CURRENT_USER,
  SET_CURRENT_USER_FOLLOWING,
  SET_USER_ACTION_SUCCESS,
  SET_USER_ACTION_FAILURE,
  SET_CURRENT_USER_DELETING_ARTICLE,
  DELETE_CURRENT_USER_ARTICLE,
  SET_RATING_ARTICLE,
  SET_NEXT_PATH,
  HANDLE_PROFILE_INPUT,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_SUCCESS,
  SUBMIT_PROFILE_FORM,
  SET_NOTIFICATION,
  SET_NOTIFICATION_FAILURE,
  UPDATE_NOTIFICATION_SUCCESS,
  UPDATE_NOTIFICATION_FAILURE,
  FETCH_READING_STATISICS_SUCCESS,
  FETCH_READING_STATISICS_FAILURE,
} from '../actions-types/currentUserTypes';
import fetchAPI from '../../helpers/fetchAPI';
import { setUserFollow } from './userActions';
import { setArticleRate } from './articleActions';

export const setCurrentUser = payload => ({
  type: SET_CURRENT_USER,
  payload,
});

export const onUserActionSuccess = message => ({
  type: SET_USER_ACTION_SUCCESS,
  payload: message,
});

export const onUserActionFailure = message => ({
  type: SET_USER_ACTION_FAILURE,
  payload: message,
});

export const setNotification = payload => ({
  type: SET_NOTIFICATION,
  payload,
});

export const setNotificationError = payload => ({
  type: SET_NOTIFICATION_FAILURE,
  payload,
});

export const fetchReadingStaticsSuccess = payload => ({
  type: FETCH_READING_STATISICS_SUCCESS,
  payload,
});

export const fetchReadingStaticsFailure = payload => ({
  type: FETCH_READING_STATISICS_FAILURE,
  payload,
});

export const fetchReadingStatics = () => dispatch => fetchAPI('/users/stats')
  .then(({ readingStats }) => {
    dispatch(fetchReadingStaticsSuccess(readingStats));
  }).catch((err) => {
    dispatch(fetchReadingStaticsFailure(err));
  });

export const fetchNotifications = token => dispatch => fetchAPI('/notifications', { token })
  .then((data) => {
    dispatch(setNotification(data));
  })
  .catch((error) => {
    dispatch(setNotificationError(error));
  });

export const readNotification = id => dispatch => fetchAPI(`/notifications/${id}`).then(() => dispatch(fetchNotifications()));

export const markAllAsRead = () => dispatch => fetchAPI('/notifications', { method: 'PUT' }).then(() => dispatch(fetchNotifications()));

export const fetchCurrentUser = token => dispatch => fetchAPI('/user', { token })
  .then(({ user }) => {
    dispatch(setCurrentUser(user));
    dispatch(fetchReadingStatics());
    dispatch(fetchNotifications());
    return user;
  })
  .catch(err => dispatch(onUserActionFailure(err.message)));

export const setUserFollowing = payload => ({
  type: SET_CURRENT_USER_FOLLOWING,
  payload,
});

export const profileInputHandler = ({ field, value }) => ({
  type: HANDLE_PROFILE_INPUT,
  payload: {
    value,
    field,
  },
});

export const profileUpdateSuccess = ({ message, user }) => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: {
    message,
    user,
  },
});

export const profileUpdateFailure = ({ message }) => ({
  type: UPDATE_PROFILE_FAILURE,
  payload: {
    message,
  },
});

export const changeStatusSuccess = payload => ({
  type: UPDATE_NOTIFICATION_SUCCESS,
  payload,
});

export const changeStatusFailure = payload => ({
  type: UPDATE_NOTIFICATION_FAILURE,
  payload,
});

export const submitProfileForm = () => ({ type: SUBMIT_PROFILE_FORM });

export const onFollow = ({ username, method }) => (dispatch) => {
  dispatch(setUserFollowing(true));
  return fetchAPI(`/profiles/${username}/follow`, { method })
    .then(({ message, user }) => {
      dispatch(setUserFollow(user));
      dispatch(onUserActionSuccess(message));
      dispatch(setUserFollowing(false));
      return message;
    })
    .catch(({ message }) => {
      dispatch(onUserActionFailure(message));
      dispatch(setUserFollowing(false));
      return message;
    });
};

export const setUserDeletingArticle = payload => ({
  type: SET_CURRENT_USER_DELETING_ARTICLE,
  payload,
});

export const deleteCurrentUserArticle = payload => ({
  type: DELETE_CURRENT_USER_ARTICLE,
  payload,
});

export const onUserDeleteArticle = ({ articleSlug }) => (dispatch) => {
  dispatch(setUserDeletingArticle(true));
  return fetchAPI(`/articles/${articleSlug}`, { method: 'DELETE' })
    .then(({ message }) => {
      dispatch(deleteCurrentUserArticle({ articleSlug, message }));
      dispatch(setUserDeletingArticle(false));
      return message;
    })
    .catch(({ message }) => {
      dispatch(onUserActionFailure(message));
      dispatch(setUserDeletingArticle(false));
      return message;
    });
};

export const setRatingArticle = payload => ({
  type: SET_RATING_ARTICLE,
  payload,
});

export const onUserRateArticle = ({ articleSlug, rate }) => (dispatch) => {
  dispatch(setRatingArticle(true));
  return fetchAPI(`/articles/${articleSlug}/rating`, { method: 'POST', body: { rate } })
    .then(({ message, averageRate, rate: { rating } }) => {
      dispatch(setArticleRate({ rating: averageRate, rated: rating }));
      dispatch(setRatingArticle(false));
      return message;
    })
    .catch(({ message }) => {
      dispatch(onUserActionFailure(message));
      dispatch(setRatingArticle(false));
      return message;
    });
};

export const setNextPath = payload => ({
  type: SET_NEXT_PATH,
  payload,
});

export const updateProfile = userData => (dispatch) => {
  dispatch(submitProfileForm());
  return fetchAPI('/user', {
    method: 'PUT',
    body: {
      user: {
        ...userData,
      },
    },
  })
    .then((data) => {
      dispatch(profileUpdateSuccess(data));
      return data;
    })
    .catch(({ message }) => {
      dispatch(profileUpdateFailure({ message }));
      return message;
    });
};

export const changeNotificationStatus = () => dispatch => fetchAPI('/notifications/update', { method: 'PUT' })
  .then((data) => {
    dispatch(changeStatusSuccess(data.notification));
    return data;
  })
  .catch((data) => {
    dispatch(changeStatusFailure(data.message));
    return data.message;
  });
