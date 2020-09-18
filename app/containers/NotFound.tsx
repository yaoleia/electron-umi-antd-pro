import React from 'react';
import img from '../style/imgs/404.png';

type AnimatedState = {
  animated: string;
};
class NotFound extends React.Component<JSX.Element, AnimatedState> {
  constructor(props: any) {
    super(props);
    this.state = {
      animated: '',
    };
  }

  enter = () => {
    this.setState({ animated: 'hinge' });
  };

  render() {
    const { animated } = this.state;
    return (
      <div
        className="center"
        style={{ height: '100%', background: '#ececec', overflow: 'hidden' }}
      >
        <img
          src={img}
          alt="404"
          className={`animated swing ${animated}`}
          onMouseEnter={this.enter}
        />
      </div>
    );
  }
}

export default NotFound;
