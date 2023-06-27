
import { useContext } from 'react';
import AppContext from '../contexts/AppContext';


export function Admin() {
  const {appData} = useContext(AppContext);
  return (
    <div>
      {appData.appName}
    </div>
  );
};