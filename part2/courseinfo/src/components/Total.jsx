const Total = ({ course }) => {
  const total = course.map(part => part.exercises).reduce((a, b) => a + b, 0);
  return (
    <p><strong>total of {total} exercises</strong></p>
  )
}

export default Total
