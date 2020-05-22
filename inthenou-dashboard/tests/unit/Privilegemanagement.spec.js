// import { shallowMount } from '@vue/test-utils';
// // Components
// import PrivilegeManagement from '@/components/privilegemanagement/PrivilegeManagement.vue'
// import Vue from 'vue';
// import Vuetify from 'vuetify';

// Vue.use(Vuetify);

// describe('PrivilegeManagement.vue', () => {
//     it('renders user list ', () => {
//         const wrapper = shallowMount(PrivilegeManagement, {
//             propsData: {
//                 viewtype: 'moderator',
//              },
//         });
//         expect(wrapper.findAll('.user').length).toEqual(25)

//         wrapper.setData({ formemail: 'kensy.bernadeau@gmail.com' })
//         expect([
//             {
//                 UID: 541,
//                 Email: 'user.email1@gmail.com',
//                 SupEmail: 'user2.email@gmail.com'
//             },
//             {
//                 UID: 542,
//                 Email: 'user.email2@gmail.com',
//                 SupEmail: 'user2.email@gmail.com'
//             },
//             {
//                 UID: 543,
//                 Email: 'user.email3@gmail.com',
//                 SupEmail: 'user2.email@gmail.com'
//             },
//             {
//                 UID: 544,
//                 Email: 'user.email4@gmail.com',
//                 SupEmail: 'user2.email@gmail.com'
//             },
//             {
//                 UID: 545,
//                 Email: 'user.email5@gmail.com',
//                 SupEmail: 'user2.email@gmail.com'
//             },
//             {
//                 UID: 1541,
//                 Email: 'user.emai6l@gmail.com',
//                 SupEmail: 'user2.email@gmail.com'
//             },
//             {
//                 UID: 5142,
//                 Email: 'user.email7@gmail.com',
//                 SupEmail: 'user2.email@gmail.com'
//             },
//             {
//                 UID: 5413,
//                 Email: 'user.email8@gmail.com',
//                 SupEmail: 'user2.email@gmail.com'
//             },
//             {
//                 UID: 5414,
//                 Email: 'user.email9@gmail.com',
//                 SupEmail: 'user2.email@gmail.com'
//             },
//             {
//                 UID: 5415,
//                 Email: 'user.email10@gmail.com',
//                 SupEmail: 'user2.email@gmail.com'
//             },
//             {
//                 UID: 5411,
//                 Email: 'user.email11@gmail.com',
//                 SupEmail: 'user2.email@gmail.com'
//             },
//             {
//                 UID: 5412,
//                 Email: 'user.email12@gmail.com',
//                 SupEmail: 'user2.email@gmail.com'
//             },
//             {
//                 UID: 54113,
//                 Email: 'user.email13@gmail.com',
//                 SupEmail: 'user2.email@gmail.com'
//             },
//             {
//                 UID: 54314,
//                 Email: 'user.email14@gmail.com',
//                 SupEmail: 'user2.email@gmail.com'
//             },
//             {
//                 UID: 54415,
//                 Email: 'user.email15@gmail.com',
//                 SupEmail: 'user2.email@gmail.com'
//             },
//             {
//                 UID: 54311,
//                 Email: 'user.email16@gmail.com',
//                 SupEmail: 'user2.email@gmail.com'
//             },
//             {
//                 UID: 542812,
//                 Email: 'user.email17@gmail.com',
//                 SupEmail: 'user2.email@gmail.com'
//             },
//             {
//                 UID: 54813,
//                 Email: 'user.email18@gmail.com',
//                 SupEmail: 'user2.email@gmail.com'
//             },
//             {
//                 UID: 54014,
//                 Email: 'user.email19@gmail.com',
//                 SupEmail: 'user2.email@gmail.com'
//             },
//             {
//                 UID: 54915,
//                 Email: 'user.email20@gmail.com',
//                 SupEmail: 'user2.email@gmail.com'
//             },
//             {
//                 UID: 54711,
//                 Email: 'user.email21@gmail.com',
//                 SupEmail: 'user2.email@gmail.com'
//             },
//             {
//                 UID: 54142,
//                 Email: 'user.email22@gmail.com',
//                 SupEmail: 'user2.email@gmail.com'
//             },
//             {
//                 UID: 54313,
//                 Email: 'user.email23@gmail.com',
//                 SupEmail: 'user2.email@gmail.com'
//             },
//             {
//                 UID: 54124,
//                 Email: 'user.email24@gmail.com',
//                 SupEmail: 'user2.email@gmail.com'
//             },
//             {
//                 UID: 54715,
//                 Email: 'user.email25@gmail.com',
//                 SupEmail: 'user2.email@gmail.com'
//             },
//             {
//                 UID: 12435,
//                 Email: 'kensy.bernadeau@gmail.com',
//                 SupEmail: 'sup@gmail.com'
//             }
//         ]).toEqual(expect.arrayContaining(wrapper.vm.users));
//        // wrapper.findAll('.user').trigger('click');
//     //    wrapper.vm.selectItem('.user');
//     //     const options = wrapper.find('select').findAll('option');
//         wrapper.findAll('.user').at(1).trigger('click');

//         wrapper.find('.removebtn').trigger('click');
//         expect(wrapper.find('.continuebtn').isVisible()).toBe(true);
//         expect(wrapper.vm.dialog).toBe(true);
//         wrapper.find('.continuebtn').trigger('click');
//         expect([]).toEqual(expect.arrayContaining(wrapper.vm.users));

//     });

// });
