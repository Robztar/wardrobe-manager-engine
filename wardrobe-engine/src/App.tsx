import { Dash } from './components/Dash'
import { Header } from './components/Header'
import { Nav } from './components/Nav'
import { Outfitter } from './components/Outfitter'


function App() {

  return (
    <div className='app-cont'>
      <Header />
      <Nav />
      <Dash aProp={0} />
      <Outfitter />
    </div>
  )
}

export default App
