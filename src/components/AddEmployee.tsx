import { useState } from "react";
import { useEmployees } from "./Context/EmployeeContext"
import { EmployeeFormData } from "./Types/employee";



const AddEmployee: React.FC = () => {
  const { refreshEmployees } = useEmployees();
  const [formData, setFormData] = useState<EmployeeFormData>({
    first_name: "",
    last_name: "",
    status: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:3000/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to add employee");
      
      setFormData({ first_name: "", last_name: "", status: "" });
      refreshEmployees();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          value={formData.first_name}
          onChange={(e) => setFormData({...formData, first_name: e.target.value})}
          placeholder="First Name"
          className="border rounded p-2 w-full"
          required
        />
        <input
          type="text"
          value={formData.last_name}
          onChange={(e) => setFormData({...formData, last_name: e.target.value})}
          placeholder="Last Name"
          className="border rounded p-2 w-full"
          required
        />
        <select
          value={formData.status}
          onChange={(e) => setFormData({...formData, status: e.target.value})}
          className="border rounded p-2 w-full"
          required
        >
          <option value="">Select Status</option>
          <option value="Active">Active</option>
          <option value="New">New</option>
          <option value="Terminated">Terminated</option>
          <option value="Leaving">Leaving</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors
          ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isSubmitting ? 'Adding...' : 'Add Employee'}
      </button>
    </form>
  );
};

export default AddEmployee;