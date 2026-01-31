// heart.js
import React from 'react';

export default class Heart extends React.Component {
  onClick = () => {
    const { click } = this.props;
    click && click();
  };

  render() {
    const { showText } = this.props;

    return (
      <div className="heartWrapper">
        {showText && (
          <div className="valentineText">
            Will you be my Valentine?
          </div>
        )}

        <div className="heart" onClick={this.onClick}></div>
        <div className="heart bounce" onClick={this.onClick}></div>
      </div>
    );
  }
}
