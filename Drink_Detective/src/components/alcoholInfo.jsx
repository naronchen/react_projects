import '../components/alcoholInfo.css'
const AlcoholInfo = ({ Info }) => {
    // if (Info.drinks) {
    //     console.log("heelo", Info.drinks[0])
    // }
    const getIngredients = (drink) => {
      let i = 1;
      const ingredients = [];
      while (`strIngredient${i}` in drink) {
        const ingredient = `strIngredient${i}`;
        if (!drink[ingredient]) {
          break;
        }
        ingredients.push(drink[ingredient]);
        i++;
      }
      return ingredients.join(', ');
    }
    
    return (
      <ul className="drink-list">
        {Info.drinks ? (
          Info.drinks.slice(0, 10).map((drink) => (
            <li className="drink" key={drink.idDrink}>
              <img src={drink.strDrinkThumb} alt={drink.strDrink} className="drink-img" />
              <div className="drink-info">
                <h3>{drink.strDrink}</h3>
                <p>Category: {drink.strCategory}</p>
                <p>Ingredients: {getIngredients(drink)}</p>
                <p>Instructions: {drink.strInstructions}</p>
              </div>
            </li>
          ))
        ) : (
          <p className="no-results">no results found</p>
        )}
      </ul>
    );
    

      
      
  };

export default AlcoholInfo;