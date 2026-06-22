import { useEffect, useState } from "react";
import axios from "axios";

export default function ViewRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/requests")
      .then(res => setRequests(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>Requests</h2>

      <ul>
        {requests.map((r) => (
          <li key={r.id}>
            {r.message}
          </li>
        ))}
      </ul>
    </div>
  );
}