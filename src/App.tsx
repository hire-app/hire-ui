import React, { useState } from 'react';
import UserDashboard from './UserDashboard';
import AddUserForm from './AddUserForm';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <UserDashboard />;
      case 'addUser':
        return <AddUserForm onClose={()=>false}/>;
      default:
        return <UserDashboard />;
    }
  };

  const navigateToDashboard = () => {
    setCurrentPage('dashboard');
  };

  return (
    <div>
      <nav>
        <div onClick={navigateToDashboard}>Demo</div>
      </nav>
      {renderPage()}
      {/* {currentPage === 'dashboard' && (
        <div className="add-user-button" onClick={navigateToAddUser}>
          Add a new user
        </div>
      )} */}
    </div>
  );
};

export default App;
