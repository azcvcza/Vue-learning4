import Vue from 'vue';
import Contact from '@/components/Contact.vue';

describe('contact.vue', () => {
    it('shold render correct contents', () => {
        const constructor = Vue.extend(Contact);
        const vm = new constructor().$mount();
        // console.log(vm.$el)
        expect(vm.$el.textContent)
            .to.equal('this is contact');
    })
});