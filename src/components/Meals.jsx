import useHttp from "../hooks/useHttp";
import Error from "./Error.jsx";
import MealItem from "./MealItem";

const requestConfig = {};

export default function Meals() {
  // const [loadedMeals, setLoadedMeals] = useState([])
  // useEffect(() => {
  //     async function fetchMeals(){
  //         const response = await fetch('http://localhost:3000/meals')
  //         if(!response.ok){
  //             // ...
  //         }
  //         const meals = await response.json();
  //         setLoadedMeals(meals);
  //     }
  //     fetchMeals();
  // }, [])

  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);
  console.log(loadedMeals);

  if (isLoading) {
   return <p className="center">Fetching meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" meaasage={error} />;
  }
  return (
    // GET/meals
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
