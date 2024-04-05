import React from 'react'
import burgerConstructorStyles from './BurgerConstructor.module.css'
import BurgerConstructorIngredients from '../BurgerConstructorIngredients/BurgerConstructorIngredients'
import { useSelector, useDispatch,shallowEqual } from 'react-redux'

import BurgerConstructorPrice from '../BurgerConstructorPrice/BurgerConstructorPrice'
import {resetConstructor} from '../../services/burgerConstructor/burgerConstructorSlice'

function BurgerConstructor () {
  //const initData = data.slice(0,5);
  const dispatch = useDispatch();
  const initData = useSelector((store) => store.ingredients.allIngredients).slice(0,1);
    // const {ingredients, selectedBun, bunCount, price} = useSelector((store)=> ({
    //   ingredients: store.burgerConstructor.burgerConstructorIngredients,
    //   selectedBun: store.burgerConstructor.selectedBun,
    //   price: store.burgerConstructor.price,
    // }),shallowEqual);
    
    React.useEffect(() => {
      dispatch(resetConstructor());
    }, []);


    return (
      <section className={`${burgerConstructorStyles.burgerContainer}`}>
          {/* {ingredients.length > 0 && selectedBun  && */}
            
          <BurgerConstructorIngredients />
          <BurgerConstructorPrice />
      </section>
    )
}

export default BurgerConstructor;