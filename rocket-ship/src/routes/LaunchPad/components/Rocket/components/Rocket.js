import React, { useState, Component } from "react";
import RocketCore from "./RocketCore";

// using react memo
export const FunctionalRocket = React.memo(function () {
  const [initialLaunchTime] = useState(Date.now());

  return <RocketCore initialLaunchTime={initialLaunchTime} />;
});

// extends React.PureComponent or shouldComponentUpdate return false
export class ClassRocket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialLaunchTime: Date.now(),
    };
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { initialLaunchTime } = this.state;

    return <RocketCore initialLaunchTime={initialLaunchTime} />;
  }
}
