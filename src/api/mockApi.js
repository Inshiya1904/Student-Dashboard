import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios, { delayResponse: 1000 });

let students = [
  { id: 1, name: 'Shahina', email: 'Shahina@example.com', course: 'React' },
  { id: 2, name: 'Inshiya', email: 'Inshiya@example.com', course: 'Node.js' },
  { id: 3, name: 'Shahid', email: 'Shahid@example.com', course: 'React' },
  { id: 4, name: 'Mona', email: 'Mona@example.com', course: 'Data Science' },
  { id: 5, name: 'Sandeep', email: 'Sandeep@example.com', course: 'Java' },
  { id: 6, name: 'Reshma', email: 'Reshma@example.com', course: 'Data Science' },
  { id: 7, name: 'Heena', email: 'Heena@example.com', course: 'Node.js' },
  { id: 8, name: 'Roshan', email: 'Roshan@example.com', course: 'Java' },
  { id: 9, name: 'Harsh', email: 'Harsh@example.com', course: 'React' },
  { id: 10, name: 'Nukul', email: 'Nukul@example.com', course: 'React' },

];

mock.onGet('/students').reply(200, students);
mock.onPost('/students').reply(config => {
  const newStudent = JSON.parse(config.data);
  newStudent.id = students.length + 1;
  students.push(newStudent);
  return [201, newStudent];

});

mock.onGet(/\/students\/\d+/).reply(config => {
    const id = parseInt(config.url.split('/').pop());
    const student = students.find(s => s.id === id);
    if (student) {
      return [200, student];
    }
    return [404, { message: 'Student not found' }];
  });

mock.onDelete(/\/students\/\d+/).reply(config => {
  const id = parseInt(config.url.split('/').pop());
  students = students.filter(s => s.id !== id);
  return [200];
});

mock.onPut(/\/students\/\d+/).reply(config => {
  const id = parseInt(config.url.split('/').pop());
  const updatedStudent = JSON.parse(config.data);
  const index = students.findIndex(s => s.id === id);
  if (index !== -1) {
    students[index] = { ...students[index], ...updatedStudent };
    return [200, students[index]];
  }
  return [404];
});