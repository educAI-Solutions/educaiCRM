import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminPrograms() {
  const [programs, setPrograms] = useState([]);
  const [editingProgram, setEditingProgram] = useState(null);
  const [newProgram, setNewProgram] = useState({});

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await axios.get("http://localhost:5000/programs");
      setPrograms(response.data);
    } catch (error) {
      console.error("Error fetching programs:", error);
      setPrograms([]);
    }
  };

  const handleEdit = (program) => {
    setEditingProgram(program);
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:5000/programs/${editingProgram._id}`,
        editingProgram
      );
      setEditingProgram(null);
      fetchPrograms();
    } catch (error) {
      console.error("Error saving program:", error);
    }
  };

  const handleNewProgramChange = (event) => {
    setNewProgram({ ...newProgram, [event.target.name]: event.target.value });
  };

  const handleCreate = async () => {
    try {
      await axios.post("http://localhost:5000/programs", newProgram);
      setNewProgram({});
      fetchPrograms();
    } catch (error) {
      console.error("Error creating program:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="my-3">Admin Programs Page</h2>
      <div className="row">
        {programs.map((program) => (
          <div key={program._id} className="col-12 col-md-6 col-lg-4">
            {editingProgram === program ? (
              <input
                className="form-control"
                value={editingProgram.name}
                onChange={(e) =>
                  setEditingProgram({ ...editingProgram, name: e.target.value })
                }
              />
            ) : (
              <h3 onClick={() => handleEdit(program)}>{program.name}</h3>
            )}
          </div>
        ))}
      </div>
      {editingProgram && (
        <button className="btn btn-primary mt-3" onClick={handleSave}>
          Save
        </button>
      )}
      <h2 className="my-3">Create New Program</h2>
      <input
        className="form-control"
        name="name"
        value={newProgram.name || ""}
        onChange={handleNewProgramChange}
        placeholder="Program Name"
      />
      <button className="btn btn-success mt-3" onClick={handleCreate}>
        Create
      </button>
    </div>
  );
}

export default AdminPrograms;
