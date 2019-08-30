class Clock extends React.Component {
  state = {
    count: 0,
    paused: false,
  };

  interval = null;

  startCount = () =>
    setInterval(() => {
      this.setState(prevState => ({ count: prevState.count + 1 }));
    }, 1000);

  componentDidMount() {
    this.interval = this.startCount();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.paused === this.state.paused) return;
    this.setState(prevState => {
      if (this.state.paused) {
        clearInterval(this.interval);
      } else {
        this.interval = this.startCount();
      }
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="App">
        <h2>Count:</h2>
        <h1>{this.state.count}</h1>
        <button
          onClick={() =>
            this.setState(prev => ({
              paused: !prev.paused,
            }))
          }
        >
          {this.state.paused ? 'Resume' : 'Pause'}
        </button>
        <button onClick={() => this.setState({ count: 0 })}>Reset</button>
      </div>
    );
  }
}
