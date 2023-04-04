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
        <h5>{user.name}</h5>
      </NavItem>
    )
  );
};

export default Profile;

