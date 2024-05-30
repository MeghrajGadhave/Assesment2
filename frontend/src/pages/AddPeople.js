import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AddPeople.css'; // Import your CSS file

const AddPeople = () => {
    const [people, setPeople] = useState([]);
    const [roles, setRoles] = useState([]);
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [status, setStatus] = useState('active');
    const [editingPerson, setEditingPerson] = useState(null);
    const [image, setImage] = useState(null); // State to hold the selected image file
    const [showAddForm, setShowAddForm] = useState(false); // State to control showing the add form

    useEffect(() => {
        const fetchData = async () => {
            const resRoles = await axios.get('http://localhost:5000/api/roles');
            setRoles(resRoles.data);
            const resPeople = await axios.get('http://localhost:5000/api/people');
            setPeople(resPeople.data);
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name', name);
        formData.append('mobile', mobile);
        formData.append('email', email);
        formData.append('role', role);
        formData.append('status', status);
        if (image) {
            formData.append('image', image);
        }

        try {
            if (editingPerson) {
                await axios.put(`http://localhost:5000/api/people/${editingPerson._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                await axios.post('http://localhost:5000/api/people', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }
            setName('');
            setMobile('');
            setEmail('');
            setRole('');
            setStatus('active');
            setImage(null);
            setEditingPerson(null);
            const res = await axios.get('http://localhost:5000/api/people');
            setPeople(res.data);
            
        } catch (error) {
            console.error('Add people failed', error);
        }
    };

    const handleEdit = (person) => {
        setName(person.name);
        setMobile(person.mobile);
        setEmail(person.email);
        setRole(person.role ? person.role._id : '');;
        setStatus(person.status);
        setEditingPerson(person);
        setShowAddForm(true);
        
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            await axios.delete(`http://localhost:5000/api/people/${id}`);
            const res = await axios.get('http://localhost:5000/api/people');
            setPeople(res.data);
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const toggleAddForm = () => {
        setShowAddForm(!showAddForm);
    };

    return (
        <div className="container">
            {/* <nav className="navbar">
                <ul>
                    <li>ID</li>
                    <li>Name</li>
                    <li>Mobile</li>
                    <li>Email</li>
                    <li>Status</li>
                    <li>Action</li>
                </ul>
            </nav> */}
            <div className="content">
                <h2>User Management</h2>
                {showAddForm && (
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                        <input type="text" placeholder="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <select value={role} onChange={(e) => setRole(e.target.value)} required>
                            <option value="" disabled>Select Role</option>
                            {roles.map((role) => (
                                <option key={role._id} value={role._id}>{role.roleName}</option>
                            ))}
                        </select>
                        <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                            <option value="active" style={{color: "green"}}>Active</option>
                            <option value="inactive" style={{color: "red"}}>Inactive</option>
                        </select>
                        <input type="file" onChange={handleImageChange} accept="image/*" />
                        <button type="submit">{editingPerson ? 'Update' : 'Add'}</button>
                    </form>
                )}
                {!showAddForm && <button onClick={toggleAddForm}>Add User</button>}
                {/* <ul>
                    {people.map((person) => (
                        <li key={person._id}>
                            {person._id} - {person.name} - {person.mobile} - {person.email} - {person.role ? person.role.roleName : ''} - {person.status}
                            <button onClick={() => handleEdit(person)}>Edit</button>
                            <button onClick={() => handleDelete(person._id)}>Delete</button>
                            {person.image && <img src={`http://localhost:5000/${person.image}`} alt="Person" />}
                        </li>
                    ))}
                </ul> */}
                 <table class="table table-">
                    <thead>
                    <tr>
                       <th>Name</th>
                       <th>Mobile</th>
                       <th>Email</th>
                       <th>Role</th>
                       <th>Status</th>
                       <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {people.map((person) => (
                        <tr key={person._id}>
                                <td>{person.name}</td>
                                <td>{person.mobile}</td>
                                <td>{person.email}</td>
                                <td>{person.role ? person.role.roleName : ''}</td>
                                <td className={person.status === "active" ? 'status-active' : 'status-inactive'}>
                                    {person.status}
                                </td>
                            <button class="btn btn-primary updateBtn" onClick={() => handleEdit(person)}>Edit</button>
                            <button class="btn btn-danger"  onClick={() => handleDelete(person._id)}>Delete</button>
                            {person.image && <img src={`http://localhost:5000/${person.image}`} alt="Person" />}
                        
                        </tr>
                         ))}
                    </tbody>
                   
            </table>
            </div>
        </div>
    );
};

export default AddPeople;
