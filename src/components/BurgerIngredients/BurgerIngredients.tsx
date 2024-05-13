import React, {useState, useRef, RefObject } from 'react'
import BurgerIngredientsGroup from '../BurgerIngredientsGroup/BurgerIngredientsGroup';
import burgerIngredientsStyles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import {closeModalIngredient} from '../../services/currentIngredient/currentIngredientSlice';
import Modal from '../Modal/Modal';
import {IIngredientsStore} from '../../types/ingredientTypes';
type IGroupIngredientName = "bun" | "sauce" | "main";
const BurgerIngredients = () => {
  const ingredients = useSelector((store:IIngredientsStore) => store.ingredients.allIngredients)
  const [current, setCurrent] = useState<IGroupIngredientName>('bun');
  const bunRef = useRef<HTMLInputElement>(null);
  const sauceRef = useRef<HTMLInputElement>(null);
  const mainRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLInputElement>(null);


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
  
  const scrollToRef = (ref: RefObject <HTMLInputElement>) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTabClick = (value: IGroupIngredientName) => {
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
      <section className={burgerIngredientsStyles.ingredients_modal}>
        <p className="text text text_type_main-large mt-10">
              Соберите бургер
        </p>
        <div className={`${burgerIngredientsStyles.ingredients_tab} pt-5 pb-4 `} >
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
        <div ref={containerRef} className={burgerIngredientsStyles.ingredients_container} onScroll={handleScroll}>
          <div ref={bunRef}>
            <BurgerIngredientsGroup key={"Булки"} groupName={"Булки"} burgeringredients={ingredients.filter((item)=>item.type === "bun")} />
          </div>
          <div ref={sauceRef}>
            <BurgerIngredientsGroup key={"Соусы"} groupName={"Соусы"} burgeringredients={ingredients.filter((item)=>item.type === "sauce")} />
          </div>
          <div ref={mainRef}>
            <BurgerIngredientsGroup key={"Начинки"} groupName={"Начинки"} burgeringredients={ingredients.filter((item)=>item.type === "main")} />
          </div>
        </div>
      </section>
    );
}
export default BurgerIngredients;
