import useHttp from "../hooks/useHttp";
import MealItem from "./MealItem";

const requestConfig = {}

export default function Meals(){
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

    const {data : loadedMeals, isLoading, error} = useHttp('http://localhost:3000/meals', requestConfig , []);
    console.log(loadedMeals);
    
    if(isLoading){
        <p className="center">Fetching meals...</p>
    }

    return (
        // GET/meals
        <ul id="meals">{loadedMeals.map((meal) => 
            <MealItem key={meal.id} meal={meal}/>
        )}</ul>
    )
}