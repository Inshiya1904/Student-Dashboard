import { useState } from 'react';
import FilterBar from '../components/FilterBar';
import StudentList from '../components/StudentList';

const Home = () => {
  const [filter, setFilter] = useState('');

  return (
    <div className="dashboard">
      <h1>Student Dashboard</h1>
      <FilterBar filter={filter} setFilter={setFilter} />
      <StudentList filter={filter} />
    </div>
  );
};

export default Home;
