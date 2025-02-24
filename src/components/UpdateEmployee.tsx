
import EmployeesList from "./EmployeeList/EmployeeList" 


const updateEmployee = async (id: number, updatedData: object) => {
    
    

    const res = await fetch(`http://localhost:3000/employees/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
  
    if (res.ok) {
      console.log("Employee updated!");
    } else {
      console.error("Error updating employee");
    }

    return (
        <div>
            <EmployeesList />
        </div>
    );
  };

  export default updateEmployee