import React from 'react';

import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';

export default () => {
  return (
    <div>
      <PrivateHeader title="Your Dashboard"/>
      <div className="page-content">
        <NoteList/>
      </div>
    </div>
  );
};
