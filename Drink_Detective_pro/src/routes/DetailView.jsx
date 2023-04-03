import { useEffect, useState } from "react";
import { Link, useParams} from "react-router-dom";


const DetailView = () => {
    const [detail, setDetail] = useState();
    let params = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`)
            const json = await response.json();
            console.log('json: ', json);
            setDetail(json);
        }
        fetchData().catch(console.error);

    },[params.id])

    const renderIngredients = (drink) => {
        const ingredients = [];
      
        for (let i = 1; i <= 15; i++) {
          const ingredient = drink[`strIngredient${i}`];
          const measure = drink[`strMeasure${i}`];
      
          if (ingredient) {
            ingredients.push(
                <li key={i} className=''>{ingredient} - {measure}</li>
            );
          } else {
            // Stop the loop if the ingredient is null
            break;
          }
        }
      
        return ingredients;
      };

    return (
      <div>
         <div>
            {detail && detail.drinks.map((drink) => (
                <div key={drink.idDrink}>
                    <h2>{drink.strDrink}</h2>
                    <img src={drink.strDrinkThumb} alt={drink.strDrink} />
                    <p>Category: {drink.strCategory}</p>
                    <p>Alcoholic: {drink.strAlcoholic}</p>
                    <p>Glass: {drink.strGlass}</p>
                    <p>Instructions: {drink.strInstructions}</p>
                    <ul> {renderIngredients(drink)} </ul>
                </div>
            ))}
    </div>
        <Link to={'/'}>
            Search Again
        </Link>
        
      </div>
    );
  };
  
export default DetailView;