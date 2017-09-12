import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import { Login } from './Login'; //en entorno de test importamos el named export { Login } no el default Login.

if(Meteor.isClient){

  describe('Login', function(){
    it('should show error messages', function(){
      const error = 'This is not working';
      const wrapper = shallow(<Login loginWithPassword={() => {}}/>);

      wrapper.setState({error});
      const res = wrapper.find('p').text();
      expect(res).toBe(error);

      wrapper.setState({error: ''});
      expect(wrapper.find('p').length).toBe(0);
    });

    it('should call loginWithPassword with the form data',function(){
      const email = 'roger@test.com';
      const password = 'password123';
      const spy = expect.createSpy();

      //const wrapper = shallow(<Login loginWithPassword={spy}/>);
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Login loginWithPassword={spy} />
        </MemoryRouter>
      );
      wrapper.find(Login).node.refs['email'].value = email;
      wrapper.find(Login).node.refs['password'].value = password;
      wrapper.find('form.boxed-view__form').simulate('submit');

      expect(spy).toHaveBeenCalled();
      expect(spy.calls[0].arguments[0]).toEqual({ email });
      expect(spy.calls[0].arguments[1]).toBe(password);

    });

    // it('should set loginWithPassword callback errors', function(){
    //   const spy = expect.createSpy();
    //   const wrapper = mount(
    //     <MemoryRouter initialEntries={['/']} initialIndex={0}>
    //       <Login loginWithPassword={spy}/>
    //     </MemoryRouter>
    //   );
    //
    //   /*
    //   A partir de aquí esto ya no chuta :(((
    //   */
    //   wrapper.find('form.boxed-view__form').simulate('submit');
    //   spy.calls[0].arguments[2]({});
    //   console.log(wrapper);
    //   expect(wrapper.state('error').length).toNotBe(0);
    //
    //   spy.calls[0].arguments[2]();
    //   expect(wrapper.state('error').length).toBe(0);
    //
    // });
  });

}
