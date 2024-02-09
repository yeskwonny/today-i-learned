import CATEGORIES from "../category";

function CategoryFilter({ setCurrentCategory }) {
  return (
    <aside>
      <ul>
        <li>
          <button
            className="btn btn-all"
            value="all"
            onClick={() => setCurrentCategory("all")}
          >
            ALL
          </button>
        </li>
        {CATEGORIES.map((cat, index) => (
          <li key={index} className="category">
            <button
              style={{ backgroundColor: cat.color }}
              className="btn btn-category"
              value={cat.name}
              onClick={() => setCurrentCategory(cat.name)}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default CategoryFilter;
