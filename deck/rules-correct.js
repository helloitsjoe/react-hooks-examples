✅
const Component = () => {
  useEffect(() => {
    // Do something...
  })

  return <h1>Yes!</h1>
}



✅
const Component = () => {
  useEffect(() => {
    // Do something...
  })

  return <h1>Yes!</h1>
}




✅
useEffect(() => {
  fetchData(id).then(() => {
    ...
  }).catch(err => {
    ...
  })
}, [id]);
