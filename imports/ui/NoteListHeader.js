import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

export const NoteListHeader = (props) => {
  return (
    <div>
       <button onClick={()=>{
         props.meteorCall('notes.insert');//esto es un alias del metodo real
       }}>Create Note</button>
    </div>
  );
};



export default createContainer(() => {
  //esta functión basada en container de reac-meteor-data hace la función del autorun tracker TAMBIEN.
  return {
    meteorCall: Meteor.call
  };

}, NoteListHeader);
