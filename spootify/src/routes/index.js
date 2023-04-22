import React, { useEffect } from "react";

import { authorization } from "../services/spotify.services";
import Discover from "./Discover";

export default function Routes() {
  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (!access_token) {
      authorization();
    }
  }, []);

  // Here you'd return an array of routes
  return <Discover />;
}
