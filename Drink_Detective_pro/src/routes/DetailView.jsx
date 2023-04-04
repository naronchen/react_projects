import { useEffect, useState } from "react";
import { Link, useParams} from "react-router-dom";
import '../styles/detailview.css';
import Charts from '../components/charts'


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
                <li key={i} className="ingredients-list-item">{ingredient} - {measure}</li>
            );
          } else {
            // Stop the loop if the ingredient is null
            break;
          }
        }
      
        return ingredients;
      };

    return (
<div className="container">
  <div>
    {detail && detail.drinks.map((drink) => (
      <div key={drink.idDrink} className="drink-card">
        <h2 className="drink-name">{drink.strDrink}</h2>
        <img className="drink-image" src={drink.strDrinkThumb} alt={drink.strDrink} />
        < Charts drink = {drink} />
        <div className="drink-details">
          <p><span className="drink-detail-label">Category:</span> {drink.strCategory}</p>
          <p><span className="drink-detail-label">Alcoholic:</span> {drink.strAlcoholic}</p>
          <p><span className="drink-detail-label">Glass:</span> {drink.strGlass}</p>
          <p><span className="drink-detail-label">Instructions:</span> {drink.strInstructions}</p>
        </div>
        <ul className="ingredients-list">
          {renderIngredients(drink)}
        </ul>
      </div>
    ))}
  </div>
  <Link to={'/'} className="link">Search Again</Link>
</div>

    );
  };
  
export default DetailView;