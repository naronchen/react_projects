import '../components/alcoholInfo.css'
const AlcoholInfo = ({ Info }) => {
    if (Info.drinks) {
        console.log("heelo", Info.drinks[0])
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