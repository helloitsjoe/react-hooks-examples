❌
const someFunc = () => {
  useEffect(() => {
    // Do something...
  })

  return <h1>Nope!</h1>
}



❌
const Component = ({isWrong}) => {
  if (isWrong) {
    useEffect(() => {
      // Do something...
    })
  }

  return <h1>No!</h1>
}


❌
useEffect(() => {
  fetchData(id).then(() => {
    ...
  }).catch(err => {
    ...
  })
}, []); // <-- Missing `id`!
