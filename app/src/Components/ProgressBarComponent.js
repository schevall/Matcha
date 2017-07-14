import React, { Component } from 'react';

class ProgressBarComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      completionProgress: props.completionProgress,
    };
  }

  componentWillReceiveProps(nextProps) {
    let { completionProgress } = nextProps;
    if (parseInt(completionProgress, 10) > 100) {
      completionProgress = '100%';
    }
    this.setState({
      completionProgress,
    });
  }

  render() {
    const { completionProgress } = this.state;
    const style = { width: completionProgress };
    let barType = 'progress-bar progress-bar-info progress-bar-striped active';
    if (completionProgress === '100%') {
      barType = 'progress-bar progress-bar-success progress-bar-striped';
    }
    return (
      <div className="progress">
        <div
          className={barType}
          role="progressbar"
          aria-valuenow={completionProgress}
          aria-valuemin="0"
          aria-valuemax="100"
          style={style}
        >
          Profile {completionProgress} Completed
        </div>
      </div>
    );
  }
}

export default ProgressBarComponent;
