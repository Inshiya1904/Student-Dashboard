const FilterBar = ({ filter, setFilter }) => (
    <div className="filterBar">
    <label htmlFor="">Select Course:  </label>
      <select value={filter} onChange={e => setFilter(e.target.value)} className="p-2 border">
        <option value="">All Courses</option>
        <option value="React">React</option>
        <option value="Node.js">Node.js</option>
        <option value="Data Science">Data Science</option>
        <option value="Java">Java</option>
      </select>
    </div>
  );
  
  export default FilterBar;