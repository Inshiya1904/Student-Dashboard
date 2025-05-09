import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';


const StudentList = ({ filter }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5; // Number of rows per page

    console.log(students)

    const fetchStudents = () => {
        axios.get('/students').then(response => {
          setStudents(response.data);
          setLoading(false);
        });
      };
  useEffect(() => {
    fetchStudents()
   
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`/students/${id}`);
    toast.success('Student deleted successfully');
  
    // Directly update the students state to remove the deleted student
    setStudents(prev => prev.filter(s => s.id !== id));
  };
//   const filtered = filter ? students.filter(s => s.course === filter) : students;


const filtered = students
  .filter(s => !filter || s.course === filter)
  .filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

   // Pagination logic
  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / studentsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p>Loading students...</p>;

  return (
  <div className='dashboard-container'>
    <div className='search-bar'>
      <input
       type="text"
       placeholder="Search by name"
       value={searchInput}
       onChange={(e) => setSearchInput(e.target.value)}
      />
      <button onClick={() => setSearch(searchInput)}>Search</button>
    </div>

    <div className="student-list">
    
     <table className="student-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Course</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {currentStudents.map((student) => (
      <tr key={student.id}>
        <td>{student.name}</td>
        <td>{student.email}</td>
        <td>{student.course}</td>
        <td>
          <Link to={`/students/${student.id}`} className="view-btn">
            View
          </Link>
          <button onClick={() => handleDelete(student.id)} className="delete-btn">
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
 {/* Pagination controls */}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={currentPage === i + 1 ? 'active' : ''}
            >
              {i + 1}
            </button>
          ))}
        </div>
    </div>
  </div>
  );
};

export default StudentList;