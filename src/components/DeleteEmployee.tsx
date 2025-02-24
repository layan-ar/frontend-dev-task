export const deleteEmployee = async (id: number) => {
    const res = await fetch(`http://localhost:3000/employees/${id}`, {
      method: "DELETE",
    });
  
    if (res.ok) {
      console.log("Employee deleted!");
    } else {
      console.error("Error deleting employee");
    }
  };
  

  export default deleteEmployee