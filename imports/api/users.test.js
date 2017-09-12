import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { validateNewUser } from './users';


if(Meteor.isServer){

  describe('users', function(){

    //PRIMER TEST CASE
    it('Should allow valid email address', function(){
      const testUser = {
        emails: [
          {
            address : 'test@example.com'
          }
        ]
      };
      const res = validateNewUser(testUser);
      expect(res).toBe(true);
    });

    it('Should reject invalid email address' , function(){

      const testUser = {
        emails: [
          {
            address : 'testexample.com'
          }
        ]
      };

      expect( () => {
        validateNewUser(testUser);
      }).toThrow();
    });

  });


}




// const add = (a,b) => {
//   if(typeof b != 'number'){
//     return a + a;
//   }//
//   return a + b;
// };
//
// const square = (a) => a * a;
//
// describe('add',function(){
//
//   it('should add two numbers', function(){
//     const res = add(11,9);//
//     expect(res).toBe(20);//
//   });
//
//   it('should double a single number', function(){//
//     const res = add(44);//
//     expect(res).toBe(88);
//   })
//
//
//
// });
//
// describe('square',function(){//
//   it('should square a number', function(){//
//     const res = square(8);//
//     expect(res).toBe(64);//
//   });
//
// })