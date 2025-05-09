import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const StudentForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  

  const onSubmit = data => {
    axios.post('/students', data).then(() =>{
        toast.success("Student Added Successfully")
        navigate('/');
    } )
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="add-student-form">
      <input {...register('name', { required: true })} placeholder="Name"  />
      {errors.name && <span>Name is required</span>}

      <input {...register('email', { required: true })} placeholder="Email" />
      {errors.email && <span>Email is required</span>}

      <input {...register('course', { required: true })} placeholder="Course"/>
      {errors.course && <span>Course is required</span>}

      <button type="submit" className="add-stud-btn">Add Student</button>
    </form>
    
  );
};

export default StudentForm;