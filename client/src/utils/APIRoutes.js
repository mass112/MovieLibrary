export const baseRoute = "http://localhost:5000"; //"https://movielibrary-m2dd.onrender.com";

/*******************  user-routes *********************/

export const loginRoute = `${baseRoute}/api/auth/login`;
export const signupRoute = `${baseRoute}/api/auth/signup`;
export const getUserNamesRoute = `${baseRoute}/api/auth/get-usernames`;
export const delAccountRoute = `${baseRoute}/api/auth/del-account`;
export const changePasswordRoute = `${baseRoute}/api/auth/new-pass`;
export const forgetPasswordRoute = `${baseRoute}/api/auth/forget-password`;
export const verifyResetRoute = `${baseRoute}/api/auth/verify-reset`;
export const resetPasswordRoute = `${baseRoute}/api/auth/reset-password`;
export const getMyListsRoute = `${baseRoute}/api/auth/get-my-lists`;
export const getListRoute = `${baseRoute}/api/auth/get-list`;
export const createListRoute = `${baseRoute}/api/auth/create-list`;
export const addToListRoute = `${baseRoute}/api/auth/add-list`;
export const remFromListRoute = `${baseRoute}/api/auth/rem-list`;

/*******************  -routes *********************/

export const apiRoute = `https://www.omdbapi.com/?apikey=f0752019`;
