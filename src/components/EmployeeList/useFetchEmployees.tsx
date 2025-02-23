import { useState, useEffect } from "react";

interface Employee {
    id: number;
    first_name: string;
    last_name: string;
    status: string;
}

interface UseFetchEmployeesResult {
    employees: Employee[];
    loading: boolean;
    error: string | null;
}

const useFetchEmployees = (url: string): UseFetchEmployeesResult => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const res = await fetch(url);
                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

                const data = await res.json();
                setEmployees(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error occurred.");
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, [url]);

    return { employees, loading, error };
};

export default useFetchEmployees;
