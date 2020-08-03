import "@babel/polyfill";
import e from "express";

const { getData } = require ('./src/client/js/app');

test('It should performAction Function Defined', ()=> {
        expect(getData).toBeDefined();
    });



