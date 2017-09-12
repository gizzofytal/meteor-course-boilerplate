import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import {Notes} from './notes';

if(Meteor.isServer){

  describe('notes', function(){

    const noteOne = {
      _id: 'testNoteId1',
      title: 'My Title',
      body: 'My body for note',
      updateAt: 0,
      userId: 'testUserId1'
    };

    const noteTwo = {
      _id: 'testNoteId2',
      title: 'Things to buy',
      body: 'Couch',
      updateAt: 0,
      userId: 'testUserId2'
    };

    //mocha function ejecutada antes de cada IT
    beforeEach(function(){
      Notes.remove({});
      Notes.insert(noteOne);
      Notes.insert(noteTwo);
    });

    //mocha function ejecutada despues de cada IT
    afterEach(function(){

    })

    it('Should insert new note', function(){
      const userId = 'testid';
      const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId: userId});

      expect(Notes.findOne({ _id , userId })).toExist();

    });

    it('Should not insert note if not auth', function(){

        expect(() => {
            Meteor.server.method_handlers['notes.insert']();
        }).toThrow();

    });

    it('Should remove note', function(){
      Meteor.server.method_handlers['notes.remove'].apply({ userId : noteOne.userId}, [noteOne._id]);

      expect(Notes.findOne({_id: noteOne._id})).toNotExist();
    });

    it('Should not remove note if unauth',function(){
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({},[noteOne.userId]);
      }).toThrow();
    });

    it('Should not remove note if invalid note _id',function(){
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({userId : noteOne.userId},[]);
      }).toThrow();
    });

    it('should update note', function(){
      const title = 'This is updated title';

      Meteor.server.method_handlers['notes.update'].apply({
        userId: noteOne.userId
      },[
        noteOne._id,
        { title }
      ]);

      const note = Notes.findOne(noteOne._id);

      expect(note.updateAt).toBeGreaterThan(0);
      expect(note).toInclude({
        title,
        body: noteOne.body
      });
    });

    it('Should throw error if extra updates provided', function(){
      expect(()=>{
        Meteor.server.method_handlers['notes.update'].apply({
          userId: noteOne.userId
        },[
          noteOne._id,
          { title : 'new title', name: 'Roger' }
        ]);
      }).toThrow();
    })

    it('Should not update note if user was not creator', function(){
      const title = 'This is updated title';

      Meteor.server.method_handlers['notes.update'].apply({
        userId: 'testId'
      },[
        noteOne._id,
        { title }
      ]);

      const note = Notes.findOne(noteOne._id);
      expect(note).toInclude(noteOne);
    });

    it('Should not update note if unauth',function(){
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({},[noteOne.userId]);
      }).toThrow();
    });

    it('Should not update note if invalid _id',function(){
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({userId : noteOne.userId},[]);
      }).toThrow();
    });

    it('Should return a users notes', function(){
      const res = Meteor.server.publish_handlers.notes.apply({userId: noteOne.userId});
      const notes = res.fetch();

      expect(notes.length).toBe(1);
      expect(notes[0]).toEqual(noteOne);
    });

    it('Should return no notes for user has not notes', function(){
      const res = Meteor.server.publish_handlers.notes.apply({userId: 'TestId'});
      const notes = res.fetch();

      expect(notes.length).toBe(0);
    })

  });

}
