import Fact from "./Fact";

function FactList({ facts, setFacts }) {
  if (facts.length === 0) {
    return (
      <p className="message">No results for this category. create new one!</p>
    );
  }
  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} setFacts={setFacts} />
        ))}
      </ul>
    </section>
  );
}

export default FactList;
