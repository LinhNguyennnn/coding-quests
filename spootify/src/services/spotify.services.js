import { instance, instanceAuth } from "../utils/api";
import config from "../config";

export const authorization = () => {
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        new Buffer.from(
          config.api.clientId + ":" + config.api.clientSecret
        ).toString("base64"),
    },
    data: new URLSearchParams({
      grant_type: "client_credentials",
    }),
    json: true,
  };

  return instanceAuth(request);
};

export const getListReleaseThisWeek = (params) => {
  const request = {
    url: "/browse/new-releases",
    method: "GET",
    params,
  };

  return instance(request);
};

export const getListFeatured = (params) => {
  const request = {
    url: "/browse/featured-playlists",
    method: "GET",
    params,
  };

  return instance(request);
};

export const getListCategory = (params) => {
  const request = {
    url: "/browse/categories",
    method: "GET",
    params,
  };

  return instance(request);
};
