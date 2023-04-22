import "../styles/_discover.scss";
import React, { Component } from "react";

import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import {
  getListCategory,
  getListFeatured,
  getListReleaseThisWeek,
} from "../../../services/spotify.services";

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: []
    };
  }

  async componentDidMount() {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      const resultActions = await Promise.all([
        getListReleaseThisWeek({
          country: "VN",
          limit: 20,
          offset: 0,
        }),
        getListFeatured({
          country: "VN",
          locale: "vi",
          timestamp: new Date().toISOString(),
          limit: 20,
          offset: 0,
        }),
        getListCategory({
          country: "VN",
          locale: "vi",
          limit: 20,
          offset: 0,
        }),
      ]);
      resultActions.forEach((result, index) => {
        if (result.status === 200) {
          switch (index) {
            case 0:
              this.setState((prevState) => ({
                ...prevState,
                newReleases: result.data.albums?.items || [],
              }));
              break;
            case 1:
              this.setState((prevState) => ({
                ...prevState,
                playlists: result.data.playlists?.items || [],
              }));
              break;
            case 2:
              this.setState((prevState) => ({
                ...prevState,
                categories: result.data.categories?.items || [],
              }));
              break;

            default:
              break;
          }
        }
      });
    }
  }

  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>
    );
  }
}
