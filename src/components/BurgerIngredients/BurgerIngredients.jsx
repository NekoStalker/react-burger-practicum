import React from 'react'
import BurgerIngredientsGroup from '../BurgerIngredientsGroup/BurgerIngredientsGroup';
import burgerIngredientsStyles from './BurgerIngredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
function BurgerIngredients ({ingredients}) {
  const [current, setCurrent] = React.useState('bun');
  const bunRef = React.useRef(null);
  const sauceRef = React.useRef(null);
  const mainRef = React.useRef(null);
  const containerRef = React.useRef(null);

  const handleScroll = () => {

    const containerTop = containerRef.current?.getBoundingClientRect().top || 0;
    const bunTop = bunRef.current?.getBoundingClientRect().top || 0;
    const sauceTop = sauceRef.current?.getBoundingClientRect().top || 0;
    const mainTop = mainRef.current?.getBoundingClientRect().top || 0;
    
    const switchThreshold = 150;
    
    if (mainTop - containerTop <= switchThreshold) {
      setCurrent('main');
    }
    else if(sauceTop - containerTop <= switchThreshold) {
      setCurrent('sauce');
    }
    else if (bunTop - containerTop <= switchThreshold) {
      setCurrent('bun');
    }
	}
  
  const scrollToRef = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTabClick = (value) => {
    setCurrent(value);
    switch (value) {
      case 'bun':
        scrollToRef(bunRef);
        break;
      case 'sauce':
        scrollToRef(sauceRef);
        break;
      case 'main':
        scrollToRef(mainRef);
        break;
      default:
        break;
    }
  };
    return (
      <section className={burgerIngredientsStyles.ingridients_modal}>
        <p className="mt-10 text text text_type_main-large ">
              Соберите бургер
        </p>
        <div className="pt-5 pb-4 "  style={{ display: 'flex' }}>
          <Tab value="bun" active={current === 'bun'} onClick={() => handleTabClick('bun')}>
            Булки
          </Tab>
          <Tab value="sauce" active={current === 'sauce'} onClick={() => handleTabClick('sauce')}>
            Соусы
          </Tab>
          <Tab value="main" active={current === 'main'} onClick={ () => handleTabClick('main')}>
            Начинки
          </Tab>
        </div>
        <div ref={containerRef} className={burgerIngredientsStyles.ingridients_container} onScroll={handleScroll}>
          <div ref={bunRef}>
            <BurgerIngredientsGroup key={"Булки"} groupName={"Булки"} burgerIngridients={ingredients.filter((item)=>item.type === "bun")} />
          </div>
          <div ref={sauceRef}>
            <BurgerIngredientsGroup key={"Соусы"} groupName={"Соусы"} burgerIngridients={ingredients.filter((item)=>item.type === "sauce")} />
          </div>
          <div ref={mainRef}>
            <BurgerIngredientsGroup key={"Начинки"} groupName={"Начинки"} burgerIngridients={ingredients.filter((item)=>item.type === "main")} />
          </div>
        </div>
      </section>
    );
}
BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['main', 'sauce', 'bun']).isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        __v: PropTypes.number
    })
  ),
};
export default BurgerIngredients;
