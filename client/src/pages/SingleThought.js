import React from 'react';
// access the ID From the URL, no need for document location.
import { useParams } from 'react-router-dom';

// Hook and querythought from the utils
import { useQuery } from '@apollo/react-hooks';
import { QUERY_THOUGHT } from '../utils/queries';

// ReactionList compnent will be used to display reactions
// to a single thought
import ReactionList from '../components/ReactionList';

const SingleThought = props => {
  // this will display the URL ID value from the URL
  const { id: thoughtId } = useParams();
  //console.log(thoughtId);

  const { loading, data } = useQuery(QUERY_THOUGHT, {
    // this is from the react router dom useParams id URL
    variables: { id: thoughtId }
  });

  // data is used to populate the thought object.
  const thought = data?.thought || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {thought.username}
          </span>{' '}
          thought on {thought.createdAt}
        </p>
        <div className="card-body">
          <p>{thought.thoughtText}</p>
        </div>
      </div>

      {thought.reactionCount > 0 && <ReactionList reactions={thought.reactions} />}
    </div>
  );
};

export default SingleThought;
