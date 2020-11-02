import React, { useState } from 'react';

export const BackgroundContext = React.createContext()


const BackgroundContextProvider = (props) => {


  const [backgroundURL, setBackgroundURL] = useState('https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')


  return (
    <BackgroundContext.Provider value={{backgroundURL, setBackgroundURL}}> 
      {props.children}
    </BackgroundContext.Provider>
  );
};

export default BackgroundContextProvider;