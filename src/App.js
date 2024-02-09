import { useEffect, useState } from "react";
import "./style.css";
import supabase from "./supabase";


// Components
import Header from "./Components/Header";
import NewfactForm from "./Components/NewFactForm";
import CategoryFilter from "./Components/CategoryFilter";
import FactList from "./Components/FactList";
import Loader from "./Components/Loader";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(
    function () {
      setIsLoading(true);
      async function getFacts() {
        //get all data
        let query = supabase.from("facts").select("*");
        //filtering
        if (currentCategory !== "all") {
          query = query.eq("category", currentCategory);
        }

        const { data: facts, error } = await query
          .order("votesInteresting", { ascending: false })
          .limit(1000);

        if (!error) setFacts(facts);
        else alert(`${error.message}`);
        setIsLoading(false);
      }
      getFacts();
    },
    [currentCategory]
  );

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewfactForm setShowForm={setShowForm} setFacts={setFacts} />
      ) : null}

      <main>
        <CategoryFilter setCurrentCategory={setCurrentCategory} />
        {isLoading ? (
          <Loader />
        ) : (
          <FactList facts={facts} setFacts={setFacts} />
        )}
      </main>
    </>
  );
}

export default App;
