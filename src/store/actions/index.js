import {
  CREATE_MOVIE,
  /*CREATE_GENRE,
  CREATE_CHOICE,
  CREATE_THEBEST,
  CREATE_RESULT,*/
  CREATE_DETAIL
} from './actionsTypes';

export const createMovie = value => ({
  type: CREATE_MOVIE,
  payload: value
});
/*
export const createGenre = value => ({
  type: CREATE_GENRE,
  newValue: value
});

export const createChoice = value => ({
  type: CREATE_CHOICE,
  newValue: value
});

export const createTheBest = value => ({
  type: CREATE_THEBEST,
  newValue: value
});

export const createResult = value => ({
  type: CREATE_RESULT,
  newValue: value
});
*/
export const createDetail = value => ({
  type: CREATE_DETAIL,
  payload: value
});
