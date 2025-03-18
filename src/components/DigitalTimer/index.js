import './index.css'
import {Component} from 'react'

class DigitalTimer extends Component {
  state = {min: 25, sec: 0, status: 'Paused', limit: 25, isRunning: false}

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  onIncrement = () => {
    const {isRunning} = this.state
    if (!isRunning) {
      this.setState(prev => ({
        limit: prev.limit + 1,
        min: prev.limit + 1,
        sec: 0,
      }))
    }
  }

  onDecrement = () => {
    const {limit, isRunning} = this.state
    if (!isRunning) {
      if (limit > 1) {
        this.setState(prev => ({
          limit: prev.limit - 1,
          min: prev.limit - 1,
          sec: 0,
        }))
      }
    }
  }

  startTimer = () => {
    this.timerId = setInterval(() => {
      this.setState(prev => {
        const {min, sec} = prev

        if (min === 0 && sec === 0) {
          clearInterval(this.timerId)
          return {isRunning: false, status: 'Paused'}
        }

        return sec === 0 ? {min: min - 1, sec: 59} : {sec: sec - 1}
      })
    }, 1000)
  }

  onClick = () => {
    const {isRunning} = this.state

    if (isRunning) {
      clearInterval(this.timerId)
      this.setState({status: 'Paused', isRunning: false})
    } else {
      this.startTimer()
      this.setState({status: 'Running', isRunning: true})
    }
  }

  onReset = () => {
    clearInterval(this.timerId)
    this.setState({
      min: 25,
      sec: 0,
      limit: 25,
      status: 'Paused',
      isRunning: false,
    })
  }

  render() {
    const {min, sec, status, limit, isRunning} = this.state

    return (
      <div className="back">
        <h1>Digital Timer</h1>
        <div className="main-block">
          <div className="background-design">
            <div className="inner-background">
              <h1>
                {String(min).padStart(2, '0')}:{String(sec).padStart(2, '0')}
              </h1>
              <p>{status}</p>
            </div>
          </div>
          <div className="timer-details">
            <div className="start-reset">
              <div className="start">
                {isRunning ? (
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                    alt="pause icon"
                  />
                ) : (
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                    alt="play icon"
                  />
                )}
                <button onClick={this.onClick}>
                  {isRunning ? 'Pause' : 'Start'}
                </button>
              </div>
              <div className="start">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                />
                <button onClick={this.onReset}>Reset</button>
              </div>
            </div>
            <p className="limit-head">Set Timer Limit</p>
            <div className="limit">
              <button type="button" onClick={this.onDecrement}>
                -
              </button>
              <p>{limit}</p>
              <button type="button" onClick={this.onIncrement}>
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
