import { useState } from "react";

const AddEmployee = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newEmployee = { first_name: firstName, last_name: lastName, status };

    const res = await fetch("http://localhost:3000/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEmployee),
    });

    if (res.ok) {
      console.log("Employee added successfully!");
    } else {
      console.error("Error adding employee");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} required />
      <input type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} required />
      <input type="text" placeholder="Status" onChange={(e) => setStatus(e.target.value)} required />
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default AddEmployee;
