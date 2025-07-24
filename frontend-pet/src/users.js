import React, { useEffect, useState } from 'react';
function UserList() {
    const [user, setUsuario] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8090/bd_petcare/api/users/all")
            .then(res => res.json())
            .then(data => setUsuario(data));
    }, []);
    return (
        <div>
            <h2>Lista de Usuarios</h2>
            <ul>
                {user.map(u => (
                    <li key={u.userId}>{u.name} - {u.email} - {u.password} - {u.role}</li>
                ))}
            </ul>
        </div>
    );
}
export default UserList;