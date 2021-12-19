import React from 'react';
import ReactDOM from 'react-dom';
import { CalendarApp } from './CalendarApp';

import './styles.css';

ReactDOM.render(
    <CalendarApp />,
  document.getElementById('root')
);

/**
 * How should I configure create-react-app to serve app from subdirectory?. VER:
 * https://stackoverflow.com/questions/49429906/how-should-i-configure-create-react-app-to-serve-app-from-subdirectory
 * 
 * Building for Relative Paths. VER:
 * https://create-react-app.dev/docs/deployment/#building-for-relative-paths
 * https://v5.reactrouter.com/web/api/BrowserRouter/basename-string
 * 
 * git ignore .env files not working. VER:
 * https://stackoverflow.com/questions/38983153/git-ignore-env-files-not-working
 * 
 * 
 */