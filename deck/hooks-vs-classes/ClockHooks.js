function Clock() {
  const [count, setCount] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);

    if (paused) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [paused]);

  return (
    <div className="App">
      <h2>Count:</h2>
      <h1>{count}</h1>
      <button onClick={() => setPaused(prev => !prev)}>{paused ? 'Resume' : 'Pause'}</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
