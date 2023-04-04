import '../styles/alcoholInfo.css'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Charts from "./charts";
// import TestCharts from './testCharts';
import { Bar } from 'react-chartjs-2';



const AlcoholInfo = ({ Info, filter, alcoholic, input }) => {
    // console.log('aloholic: ', alcoholic);
    // if (Info.drinks) {
    //     console.log("heelo", Info.drinks[0])
    // }
    const [drinks, setDrinks] = useState([]);
    // console.log('drinks: ', drinks);

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
      return ingredients.join(',');
    }

    useEffect(() => {
      const filterInfo = (info, alcoholic) => {
        const drinks = info.drinks;
        console.log('drinks: ', drinks);
        // console.log('filter: ', filter);

        if (filter.trim() === '') {
          return drinks;
        }
        // drinks.map((drink) => {
        //   console.log('drink.strAlcoholic: ', drink.strAlcoholic);
        // })
        return drinks.filter((drink) => (
          getIngredients(drink)
          .toLowerCase()
          .includes(filter.toLowerCase()) &&
          drink.strAlcoholic === alcoholic
        ))
      }

      setDrinks(filterInfo(Info, alcoholic));
    }, [Info, filter, alcoholic]);


    // const filterData = ()
    const alcoholicDrinks = drinks ? drinks.filter(drink => drink.strAlcoholic === 'Alcoholic') : [];
    const nonAlcoholicDrinks = drinks ?  drinks.filter(drink => drink.strAlcoholic === 'Non alcoholic') : [];

    const data = {
      labels: ['Alcoholic', 'Non-alcoholic'],
      datasets: [
        {
          label: '# of Drinks',
          data: [alcoholicDrinks.length, nonAlcoholicDrinks.length],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
    
    const options = {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        },
      },
    };

  return (
    <>

      {drinks && drinks.length > 0 && (
        <p className="result-count">Showing {drinks.length} 
        {drinks.length === 1 ? 
          'result' : 'results'} | {
            alcoholicDrinks.length} alcoholic, {
              nonAlcoholicDrinks.length} non-alcoholic</p>
      )}
      {drinks && drinks.length > 0 && <Bar data={data} options={options}/>}


      
      <ul className="drink-list">
        {drinks && drinks.length > 0 ? (
          drinks.map((drink) => (
            <Link className="drink" key={drink.idDrink} to={`/detail/${drink.idDrink}`}>
              <img src={drink.strDrinkThumb} alt={drink.strDrink} className="drink-img" />
              <div className="drink-info">
                <h3>{drink.strDrink}</h3>
                <p>Category: {drink.strCategory} | {drink.strAlcoholic}</p>
                <p>Ingredients: {getIngredients(drink)}</p>
              </div>
            </Link>
          ))
        ) : (
          input && <p className="no-results">no results found</p>
          )}
      </ul>

    </>
  );

}

export default AlcoholInfo;