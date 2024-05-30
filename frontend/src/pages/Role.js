import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Role = () => {
    const [roles, setRoles] = useState([]);
    const [roleName, setRoleName] = useState('');
    const [status, setStatus] = useState('active');
    const [editingRole, setEditingRole] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        const fetchRoles = async () => {
            const res = await axios.get('http://localhost:5000/api/roles');
            setRoles(res.data);
        };
        fetchRoles();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingRole) {
            await axios.put(`http://localhost:5000/api/roles/${editingRole._id}`, { roleName, status });
        } else {
            await axios.post('http://localhost:5000/api/roles', { roleName, status });
        }
        setRoleName('');
        setStatus('active');
        setEditingRole(null);
        const res = await axios.get('http://localhost:5000/api/roles');
        setRoles(res.data);
    };

    const handleEdit = (role) => {
        setRoleName(role.roleName);
        setStatus(role.status);
        setEditingRole(role);
        setShowAddForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            await axios.delete(`http://localhost:5000/api/roles/${id}`);
            const res = await axios.get('http://localhost:5000/api/roles');
            setRoles(res.data);
        }
    };
    const toggleAddForm = () => {
        setShowAddForm(!showAddForm);
    };

    return (
        <div>
            <h2>Role Management</h2>
            {showAddForm &&
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Role Name" value={roleName} onChange={(e) => setRoleName(e.target.value)} required />
                <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                    <option value="active" style={{color: "green"}}>Active</option>
                    <option value="inactive" style={{color: "red"}}>Inactive</option>
                </select>
                <button type="submit">{editingRole ? 'Update' : 'Add'}</button>
            </form>
             }
            {/* <ul>
                {roles.map((role) => (
                    <li key={role._id}>
                        {role.roleName} - {role.status}
                        <button class="btn btn-primary updateBtn" onClick={() => handleEdit(role)}>Edit</button>
                        <button class="btn btn-danger" onClick={() => handleDelete(role._id)}>Delete</button>
                    </li>
                ))}
            </ul> */}
            {!showAddForm && <button onClick={toggleAddForm}>Add Role</button>}
            <table class="table table-">
                    <thead>
                    <tr>
                       <th>Role</th>
                       <th>Status</th>
                       <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
 
                {roles.map((role) => (
                    <tr key={role._id}>
                        <td>{role.roleName}</td>
                        <td className={role.status === "active" ? 'status-active' : 'status-inactive'}>
                                    {role.status}
                                </td>
                        <button class="btn btn-primary updateBtn" onClick={() => handleEdit(role)}>Edit</button>
                        <button class="btn btn-danger" onClick={() => handleDelete(role._id)}>Delete</button>
                        </tr>
                         ))}
                    </tbody>
                </table>
            </div>
    );
};

export default Role;
