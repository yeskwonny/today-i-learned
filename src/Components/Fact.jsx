import { useState } from "react";
import CATEGORIES from "../category";
import supabase from "../supabase";

function Fact({ fact, setFacts }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDisputed =
    fact.votesInteresting + fact.votesMindsblowing < fact.votesFalse;
  async function handleVotes(voteBtn) {
    setIsUpdating(false);
    // update votes
    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({ [voteBtn]: fact[voteBtn] + 1 })
      .eq("id", fact.id)
      .select();

    //computed property names
    //.update({voteInteresting:fact.voteIntereting+1})

    if (!error)
      setFacts((facts) =>
        facts.map((f) => (f.id === fact.id ? updatedFact[0] : f))
      );
    setIsUpdating(true);
  }
  return (
    <li className="fact">
      <p className="text">
        {isDisputed ? (
          <span
            className="disputed"
            style={{ color: "#ef4444", fontWeight: "bold" }}
          >
            [🔴Disputed🔴]
          </span>
        ) : null}
        {fact.text}
        <a
          className="source"
          href={fact.source}
          target="_blank"
          rel="noreferrer"
        >
          (Source)
        </a>
      </p>
      <div className="btn-container">
        <span
          className="tags"
          style={{
            backgroundColor:
              CATEGORIES.find((cat) => cat.name === fact.category)?.color ||
              "defaultColor",
          }}
        >
          {fact.category}
        </span>

        <div className="votes">
          <button
            className="btn-vote"
            onClick={() => handleVotes("votesInteresting")}
            disabled={isUpdating}
          >
            👍 <strong>{fact.votesInteresting}</strong>
          </button>
          <button
            className="btn-vote"
            onClick={() => handleVotes("votesMindsblowing")}
            disabled={isUpdating}
          >
            🤯 <strong>{fact.votesMindsblowing}</strong>
          </button>
          <button
            className="btn-vote"
            onClick={() => handleVotes("votesFalse")}
            disabled={isUpdating}
          >
            ⛔️ <strong>{fact.votesFalse}</strong>
          </button>
        </div>
      </div>
    </li>
  );
}

export default Fact;
