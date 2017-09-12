import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Notes } from '../api/notes';
import NoteListHeader from './NoteListHeader';
import PropTypes from 'prop-types';

export const NoteList = (props) => {
  return (
    <div>
      <NoteListHeader/>
       NoteList { props.notes.length }
    </div>
  );
};

NoteList.propTypes = {
  notes: PropTypes.array.isRequired
};

export default createContainer(() => {
  //esta functión basada en container de react-meteor-data hace la función del autorun tracker TAMBIEN.
  Meteor.subscribe('notes');

  return {
    notes: Notes.find().fetch()
  };

}, NoteList);
