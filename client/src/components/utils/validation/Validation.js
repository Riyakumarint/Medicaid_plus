import axios from "axios";

export const isEmpty = (value) => {
  if (!value) return true;
  return false;
};
export const isPhone = (mobile) => {
  const re = /^[+]/g;
  return re.test(mobile);
};

export const isEmail = (email) => {
  // eslint-disable-next-line
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const isLength = (password) => {
  if (password.length < 6) return true;
  return false;
};

export const isMatch = (password, cf_password) => {
  if (password === cf_password) return true;
  return false;
};

export const isTitle = (title) => {
  if (title.length < 10) return true;
  return false;
};

export const isDescription = (description) => {
  if (description.length < 50) return true;
  return false;
};

export const isContent = (content) => {
  if (content.length < 100) return true;
  return false;
};

export const isCategory = (value) => {
  if (!value) return true;
  return false;
};

export const isCoverImage = (value) => {
  if (!value) return true;
  return false;
};

export const getAPI = async (url, token) => {
  const res = await axios.get(`/api/${url}`, {
    headers: { Authorization: token },
  });

  return res;
};
