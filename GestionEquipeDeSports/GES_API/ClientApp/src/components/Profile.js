import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavItem } from "react-bootstrap";


function Profile(){
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) 
  {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <NavItem> 
      {/* <h5 className="text-white">{user.name}</h5>
        <h5 className="text-white">{user.email}</h5>*/}
        <div>
          <img src={user.picture} alt="Profile" className="profile__avatar"/>
        </div>
      </NavItem>
    )
  );
};

export default Profile;

