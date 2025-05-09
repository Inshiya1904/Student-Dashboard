import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
// import '../mock'; // import your mock setup

const StudentDetail = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({ name: '', email: '', course: '' });

  useEffect(() => {
    axios.get(`/students/${id}`)
      .then(res => {
        setStudent(res.data);
        setForm(res.data);
      })
      .catch(err => console.error('Student not found', err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`/students/${id}`, form);
      setStudent(res.data);
      setIsEditing(false);
      toast.success("Student Updated Successfully!")

    } catch (err) {
      toast.error('Update failed', err);
    }
  };

  if (loading) return <p>Loading student details...</p>;
  if (!student) return <p>Student not found.</p>;

  return (
    <div className="stud-detail-page">
      {isEditing ? (
        <div className='edit-form'>
          <input
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="Name"
          />
          <input
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
          />
          <input
            value={form.course}
            onChange={e => setForm({ ...form, course: e.target.value })}
            placeholder="Course"
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div className='stud-details'>
          <h1>{student.name}</h1>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Course:</strong> {student.course}</p>
          <div className='btns'>
          <button ><Link to='/'>Back</Link></button>
          <button  onClick={() => setIsEditing(true)}>Edit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDetail;