import { useState } from "react";
import supabase from "../supabase";
import CATEGORIES from "../category";

function NewfactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;
  console.log(supabase);
  async function handleSubmit(e) {
    e.preventDefault();

    //check the source format
    function isValidHttpUrl(source) {
      let url;
      try {
        url = new URL(source);
      } catch (_) {
        return false;
      }
      return url.protocol === "http:" || url.protocol === "https:";
    }

    if (text && textLength <= 200 && isValidHttpUrl(source) && category) {
      setIsUploading(true);
      //create new data
      const { data: newFact, error } = await supabase
        .from("facts")
        .insert({ text: text, source: source, category: category })
        .select();

      setIsUploading(false);

      if (!error) setFacts((facts) => [...facts, newFact[0]]);
      //clear the form
      setText("");
      setSource("");
      setCategory("");
      setShowForm(false);
    }
  }
  return (
    <form className="fact-form">
      <input
        type="text"
        placeholder="Share a fact with the world"
        maxLength="200"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <span className="maxLength">{200 - textLength}</span>
      <input
        type="text"
        placeholder="http://example.com"
        value={source}
        disabled={isUploading}
        onChange={(e) => setSource(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Choose category</option>
        {CATEGORIES.map((item, index) => (
          <option key={index} value={item.name}>
            {item.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button
        onClick={handleSubmit}
        disabled={isUploading}
        className="btn btn-large"
      >
        Post
      </button>
    </form>
  );
}

export default NewfactForm;
