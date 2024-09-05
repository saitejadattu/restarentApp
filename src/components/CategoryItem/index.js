import './index.css'
import AppContext from '../../context/AppContext'
const CategoryItem = props => {
  const {eachDish, increseQuantity, decreaseQuantity} = props
  const {
    addonCat,
    dishAvailability,
    dishCalories,
    dishCurrency,
    dishDescription,
    dishId,
    dishImage,
    dishName,
    dishPrice,
    dishType,
    nextUrl,
    quantity,
  } = eachDish
  // console.log(eachDish)
  const onClickMinus = () => {
    decreaseQuantity(eachDish)
  }
  const onClickPlus = () => {
    increseQuantity(eachDish)
  }
  const rednerButtons = () => {
    return (
      <div className="buttons-container">
        <button onClick={onClickMinus} className="button">
          -
        </button>
        <p className="dish-quantity">{quantity}</p>
        <button onClick={onClickPlus} className="button">
          +
        </button>
      </div>
    )
  }

  return (
    <AppContext.Consumer>
      {value => {
        const {tabList} = value
        return (
          <li className="each-dish-list-item">
            <div className="veg-symbol-and-text-container">
              <div className="veg-dot-symbol">
                <div className="veg-dot"></div>
              </div>
              <div className="text-container">
                <h1 className="dish-name">{dishName}</h1>
                <p className="dish-currency">
                  {dishCurrency} {dishPrice}
                </p>
                <p className="dish-description">{dishDescription}</p>
                {dishAvailability ? (
                  rednerButtons()
                ) : (
                  <p className="not-available">Not available</p>
                )}
                {addonCat.length ? (
                  <p className="add-ons">Customizations Aavailble</p>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className="dish-calories-container">
              <p className="dish-calories-text">{dishCalories} calories</p>
            </div>
            <div>
              <img className="dish-image" src={dishImage} />
            </div>
          </li>
        )
      }}
    </AppContext.Consumer>
  )
}
export default CategoryItem
