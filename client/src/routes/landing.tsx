import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../styles/landing.css'
import React, { useState } from 'react'
import { IndexRouteObject } from 'react-router-dom'
import { ReactComponent as BaramiLogo } from '../assets/barami.svg'
import RouteLink from '../components/RouteLink'
import { Image, Link } from '@fluentui/react-components'

const Landing: React.FC = () => {
    const [count, setCount] = useState(0)

    return (<>
    
    <div>
        <Link href="https://vitejs.dev" target="_blank">
          <Image src={viteLogo} className="logo" alt="Vite logo" />
        </Link>
        <Link href="https://react.dev" target="_blank">
          <Image src={reactLogo} className="logo react" alt="React logo"/>
        </Link>
      </div>
      <h1>Vite + React</h1>
      
      <div className="card">
        <button onClick={() => { setCount((count) => count + 1); }}>
          count is {count}
        </button>
        <button onClick={() => {
          void fetch('/api/myView', { method: "POST", credentials: 'include'})
          .then(value => {
            return value.text()
          }).then(a => { console.log(a); })
        }}>Click to call fetch</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <RouteLink to="question">Question</RouteLink>
      </div>
      <BaramiLogo width="300px" height='300px' fontSize="16px"/>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p></>)
}

const route: IndexRouteObject = {
    index: true,
    path: undefined,
    element: <Landing />
}

export default route