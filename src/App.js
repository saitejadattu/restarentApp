import './App.css'

import {BsCart3} from 'react-icons/bs'

import {Component} from 'react'

import AppContext from './context/AppContext'

import CategoryItem from './components/CategoryItem'

import TabButton from './components/TabButton'
// write your code here

class App extends Component {
  state = {
    database: [],
    activeCategory: [],
    tabList: [],
    restarentName: '',
    activeButton: 1,
    cart: [],
  }
  componentDidMount() {
    this.fecthData()
  }
  fecthData = async () => {
    const response = await fetch(
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
    )
    const data = await response.json()
    // console.log("data", data)
    const updatedData = data[0].table_menu_list.map((each, index) => ({
      menuCategory: each.menu_category,
      id: each.menu_category_id,
      menuCategoryId: index + 1,
      categoryDishes: each.category_dishes.map(each2 => ({
        addonCat: each2.addonCat,
        quantity: 0,
        dishAvailability: each2.dish_Availability,
        dishType: each2.dish_Type,
        dishCalories: each2.dish_calories,
        dishCurrency: each2.dish_currency,
        dishDescription: each2.dish_description,
        dishId: each2.dish_id,
        dishImage: each2.dish_image,
        dishName: each2.dish_name,
        dishPrice: each2.dish_price,
        nextUrl: each2.nexturl,
      })),
    }))
    // const {activeButton} = this.state
    this.setState({
      ac: updatedData[0].menuCategoryId,
      activeCategory: updatedData[0],
      database: updatedData,
    })
    const updatedTabList = data[0].table_menu_list.map((each, index) => ({
      tab: each.menu_category,
      id: index + 1,
    }))

    this.setState({
      restarentName: data[0].restaurant_name,
      tabList: updatedTabList,
    })
  }
  toggleButton = tab => {
    const {database} = this.state
    this.setState({activeButton: tab.id, activeCategory: database[tab.id - 1]})
    // console.log(tab)
    // console.log(database[tab.id - 1])
  }

  decreaseQuantity = dish => {
    const {cart, activeCategory} = this.state
    const send = activeCategory.categoryDishes.filter(
      each => each.dishId == dish.dishId,
    )
    const updated = cart.filter(each => each.quantity !==0)
    this.setState({cart: updated)
     if(dish.quantity) {
      dish['quantity'] = dish['quantity'] - 1
      this.setState(prevState => ({
        cart: prevState.cart,
        send,
      }))
    }
  }
  increseQuantity = dish => {
    const {cart, activeCategory} = this.state
    const updated = cart.filter(each => each.quantity !==0)
    this.setState({cart: updated)
    const send = activeCategory.categoryDishes.filter(
      each => each.dishId == dish.dishId,
    )

    if (!dish.quantity) {
      dish['quantity'] = 1
      this.setState(prevState => ({
        cart: [...prevState.cart, ...send],
      }))
    } else {
      dish['quantity'] += 1
      this.setState(prevState => ({
        cart: prevState.cart,
        send,
      }))
    }
  }
  renderDishes = () => {
    const {activeCategory, database} = this.state
    const {categoryDishes} = database.find(each => each.id == activeCategory.id)
    // console.log(categoryDishes)
    // console.log(database)
    return (
      <ul className="category_dishes-container">
        {categoryDishes.map(eachDish => (
          <CategoryItem
            key={eachDish.dishId}
            increseQuantity={this.increseQuantity}
            decreaseQuantity={this.decreaseQuantity}
            eachDish={eachDish}
          />
        ))}
      </ul>
    )
  }
  render() {
    const {
      database,
      activeCategory,
      cart,
      tabList,
      restarentName,
      activeButton,
    } = this.state
    console.log('cart', cart)
    let sum = 0
    // console.log(cart)
    for (let i of cart) {
      sum += i.quantity
    }
    // console.log(sum)
    return (
      <AppContext.Provider
        value={{
          database,
          setDatabase: this.setDatabase,
          tabList,
          setTabList: this.setTabList,
          activeCategory,
          cart,
          setCart: this.setCart,
        }}
      >
        <div className="main-container">
          <div className="header-container">
            <h1 className="restarent-name">{restarentName}</h1>
            <div className="cart-container">
              <BsCart3 className="cart-image" />
              <span className="cart-value">{sum}</span>
            </div>
          </div>
          <ul className="tab-button-container">
            {tabList.map(eachTab => (
              <TabButton
                key={eachTab.id}
                eachTab={eachTab}
                activeButton={activeButton}
                toggleButton={this.toggleButton}
              />
            ))}
          </ul>
          {activeCategory != [] > 0 ? this.renderDishes() : ''}
        </div>
      </AppContext.Provider>
    )
  }
}

export default App

// menuCategory: each.menu_category,
// addonCat: each2.addonCat,
// quantity: 0,
// dishAvailability: each2.dish_Availability,
// dishType: each2.dish_Type,
// dishCalories: each2.dish_calories,
// dishCurrency: each2.dish_currency,
// dishDescription: each2.dish_description,
// dishId: each2.dish_id,
// dishImage: each2.dish_image,
// dishName: each2.dish_name,
// dishPrice: each2.dish_price,
// nextUrl: each2.nexturl,
