import React from 'react'
const AppContext = React.createContext({
  database: [],
  setDatabase: () => {},
  tabList: [],
  setTabList: () => {},
  activeCategory: [],
  cart: [],
  setCart: () => {},
})
export default AppContext
