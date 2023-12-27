import supertest from "supertest";
import { expect } from "chai";

const REQUEST = supertest("https://gorest.co.in/public/v2/");
const TOKEN = 'd441663371cad147f55bd56afb5eb52064dd06e7e9e7aa1ee770353ef07f0a79'

describe('Users',()=>{
    it('GET users/',()=> {
        // REQUEST
        //.get(`users?access-token=${TOKEN}`)
        // .end((err,res)=>{
        //     // console.log(err);
        //     // console.log(res.body[0].name);
        //     expect(res.body).to.not.be.empty;
        //     done();
        // });
        return REQUEST.get(`users?access-token=${TOKEN}`).then((res)=>{
            expect(res).to.not.be.empty;
        })
    });
    it('GET users/{id}',()=>{
        return REQUEST.get(`users/5841466?access-token=${TOKEN}`).then((res)=>{
            expect(res.body.id).to.equal(5841466);
        })
    });
    it('GET users filter by query param',()=>{
        return REQUEST.get(`users?access-token=${TOKEN}&page=5&gender=female`).then((res)=>{
            res.body.forEach(element => {
                expect(element.gender).to.equals('female')
            });
        })
    });
    it('Post /users',()=>{
        const data = {
        email: `test${Math.floor(Math.random()*9999)}@ac.com`,
        name:'Mustafa',
        gender: 'male',
        status: 'active'
    };
        return REQUEST.post('users').set('Authorization',`Bearer ${TOKEN}`).send(data).then((res)=>{
            expect(res.body).to.include(data)
        })
    });
    it('PUT /users/:id',()=>{
        const data = {
            name:`Mustafa${Math.floor(Math.random()*9999)}`
        };

        return REQUEST.put('users/5854033').set('Authorization',`Bearer ${TOKEN}`).send(data).then((res)=>{
            console.log(res.body);
        })
    });
    it('DELETE /users/:id',()=>{
        REQUEST.delete('users/5854033').set('Authorization',`Bearer ${TOKEN}`).then((res)=>{
            expect(res.body).to.be.eq(null)
        })
    })

});