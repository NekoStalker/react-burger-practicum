import { IIngredientState } from "../services/types/ingredientTypes";

export const translateOrderStatus = (status: string | undefined) => {
    switch (status) {
        case 'created':
            return { translatedStatus: 'Создан', classStatusName: 'text_color_white' };
        case 'pending':
            return { translatedStatus: 'В работе', classStatusName: 'text_color_yellow' };
        case 'done':
            return { translatedStatus: 'Выполнен', classStatusName: 'text_color_turquoise' };
        case undefined:
            return { translatedStatus: 'Отсутствует статус', classStatusName: '' };
        default:
            return { translatedStatus: 'Неизвестный статус', classStatusName: '' };
    }
};


export const getUniqueIngredientsWithCounts = (ingredients: IIngredientState[]): { item: IIngredientState; count: number }[] => {
    if (!ingredients) {
      return [];
    }
  
    const ingredientCountMap = new Map<string, number>();
  
    for (let i = 0; i < ingredients.length; i++) {
      const ingredient = ingredients[i];
      const count = ingredientCountMap.get(ingredient._id) || 0;
      ingredientCountMap.set(ingredient._id, count + 1);
    }
  
    const uniqueIngredientsWithCounts = Array.from(ingredientCountMap.entries()).map(([id, count]) => {
      const item = ingredients.find((ingredient) => ingredient._id === id);
      return { item, count };
    }).filter(({ item }) => item !== undefined);
  
    return uniqueIngredientsWithCounts as { item: IIngredientState; count: number }[];
  };