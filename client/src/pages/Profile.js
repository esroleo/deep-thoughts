import React from 'react';

// user the URL ID values
// redirect will allow us to redirect the user to another route
// within the application
import { Redirect, useParams } from 'react-router-dom';
// import component thought list
import ThoughtList from '../components/ThoughtList';
// import the Friendslist
import FriendList from '../components/FriendList';
// allow talking to graphql via apollo
import { useQuery } from '@apollo/react-hooks';
// allow our queries to run against apollo
// query_me will be used to fix issue with link to me on header
import { QUERY_USER, QUERY_ME } from '../utils/queries';

// fix issue with logged goes to /profile/username and the value
// of the username is the same as the logged-in user?
import Auth from '../utils/auth';



const Profile = () => {
  const { username: userParam } = useParams();

  // before fix for me url to show /profile/username/
  // const { loading, data } = useQuery(QUERY_USER, {
  //   variables: { username: userParam }
  // });
  // not sure how this works, query me uses param vs query users does not.
  // if there is a token query user will fail?
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });

  // check if the data return is from a logged user or a non logged user
  const user = data?.me || data?.user || {};

  // redirect to personal profile page if username is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  // if user goes to profile and is not logged in display this message
  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links above to sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
        Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <ThoughtList thoughts={user.thoughts} title={`${user.username}'s thoughts...`} />
        </div>

        <div className="col-12 col-lg-3 mb-3">
          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
