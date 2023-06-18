import React, { useEffect, useState } from 'react';
import AddUserForm from './AddUserForm';

interface User {
  name: string;
  location: string;
  email: string;
  phone: string;
  picture: string;
  age: number;
  gender: string;
}

const UserDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [genderFilter, setGenderFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddUserForm, setShowAddUserForm] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://randomuser.me/api/?results=8');
      const data = await response.json();
      const fetchedUsers = data.results.map((result: any) => {
        return {
          name: `${result.name.first} ${result.name.last}`,
          location: `${result.location.city}, ${result.location.country}`,
          email: result.email,
          phone: result.phone,
          picture: result.picture.large,
          age: result.dob.age,
          gender: result.gender,
        };
      });
      setUsers(fetchedUsers);
    } catch (error) {
      console.log('Error fetching users:', error);
    }
  };

  const handleFilterChange = (filter: string) => {
    setGenderFilter(filter);
  };

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
  };

  const filteredUsers = users.filter((user) => {
    const name = user.name.toLowerCase();
    const query = searchQuery.toLowerCase();
    return name.includes(query) && (user.gender === genderFilter || genderFilter === '');
  });

  const handleShowAddUserForm = () => {
    setShowAddUserForm(true);
  };

  const handleCloseAddUserForm = () => {
    setShowAddUserForm(false);
  };

  return (
    <div>
      <div className="filter-bar">
        <div className="gender-filter">
          <button
            className={`filter-button ${genderFilter === 'male' ? 'active' : ''}`}
            onClick={() => handleFilterChange('male')}
          >
            Male
          </button>
          <button
            className={`filter-button ${genderFilter === 'female' ? 'active' : ''}`}
            onClick={() => handleFilterChange('female')}
          >
            Female
          </button>
          <button
            className={`filter-button ${genderFilter === '' ? 'active' : ''}`}
            onClick={() => handleFilterChange('')}
          >
            All
          </button>
        </div>
        <div className="search-bar">
       <input
        type="text"
    placeholder="Search by name"
    value={searchQuery}
    onChange={(e) => handleSearchQueryChange(e.target.value)}
    className="search-input"
  />
</div>

      </div>

      <div className="user-cards">
        {filteredUsers.map((user, index) => (
          <div key={index} className="user-card">
            <div className="user-avatar">
              <img src={user.picture} alt="User Avatar" />
              <div className="age-badge">{user.age}</div>
            </div>
            <div className="user-info">
              <div className="user-name">{user.name}</div>
              <div className="user-location">
                <span className="location-icon">&#128205;</span>
                {user.location}
              </div>
              <div className="user-email">{user.email}</div>
              <div className="user-phone">{user.phone}</div>
            </div>
          </div>
        ))}
        <div className="user-card add-user-button" onClick={handleShowAddUserForm}>
          <p className="add-user-label">Add a new user</p>
          <span className="icon">&#x2192;</span>
        </div>
      </div>

      {showAddUserForm && <AddUserForm onClose={handleCloseAddUserForm} />}
    </div>
  );
};

export default UserDashboard;
