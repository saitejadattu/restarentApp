import AppContext from '../../context/AppContext'
import './index.css'
const TabButton = props => {
  const {eachTab, activeButton, toggleButton} = props
  let isButtonActive = activeButton == eachTab.id ? 'active-button' : ''
  const onClickTab = () => {
    toggleButton(eachTab)
  }
  let btn = activeButton == eachTab.id ? eachTab : ''
  return (
    <AppContext.Consumer>
      {value => {
        const {ac, activeCategory} = value
        return (
          <li className="button-list-item-container">
            <button
              onClick={onClickTab}
              className={`${isButtonActive} tab-button`}
            >
              {eachTab.tab}
            </button>
          </li>
        )
      }}
    </AppContext.Consumer>
  )
}
export default TabButton

// let goat = mock.map((each)=>{
//           // console.log(btn)
//           if(each.menu_category===btn.tab){

//           }
//         })
