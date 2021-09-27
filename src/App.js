import React from 'react';
import { Meme } from '../src/components/Meme';
import { Switch, Route } from 'react-router-dom'
import MemesGenerated from './MemesGenerated/MemesGenerated';


// import styles from './styles.module.css';

 const App = () => {
  return (
    <div>
      <h1>Meme Generator</h1>
      <Switch>
      <Route exact path='/'>
        <Meme />
      </Route>
      <Route path='/generated'>
        <MemesGenerated/>
      </Route>
    </Switch>
    </div>
  );
}

export default App;