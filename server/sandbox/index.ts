import {VM, NodeVM} from 'vm2'
import introduction from './introduction'
import basic from './basic'
import cyclesAndConditions from './cycles_and_conditions'
import functionTest from './function'
import errorTest from './error'
import objectTest from './object';


const Introduction = (id: string, code: string) =>
{
    let result : any;
        switch (id)
        {
            case '3':
                result = introduction.ConsoleLog(code);
                break;
            case '5':
                result = introduction.Type(code);
                break;
            default:
                result = 'error';
                break;
        }
        return result;
}

const Basic = (id: string, code: string) => 
{
    let result : object;
    switch(id)
    {
        case '3':
            result = basic.arithmetic(code)
            break;
        default:
            result = {error:'error'};
            break;
    }
    return result;
}

const CyclesAndConditions = (id: string, code: string) =>
{
    let result : object;
    switch(id)
    {
        case '2':
            result = cyclesAndConditions.testIf(code)
            break;
        case '4':
            result = cyclesAndConditions.testArray(code)
            break;
        case '6':
            result = cyclesAndConditions.sumArray(code)
            break;
        case '8':
            result = cyclesAndConditions.testCycles(code)
            break;
        default:
            result = {error:'error'};
            break;
    }
    return result;
}

const FunctionTest = (id: string, code: string) => 
{
    let result : object;
    switch(id)
    {
        case '3':
            result = functionTest.arithmetic(code)
            break;
        case '4':
            result = functionTest.palindrome(code)
            break;
        case '6':
            result = functionTest.FibonacciNumber(code)
            break;
        case '7':
            result = functionTest.SquareSumRoot(code)
            break;
        default:
            result = {error:'error'};
            break;
    }
    return result;
}

const ErrorTest = (id: string, code: string) => 
{
    let result : object;
    switch(id)
    {
        case '2':
            result = errorTest.ErrorLog(code)
            break;
        case '4':
            result = errorTest.ageValid(code)
            break;
        default:
            result = {error:'error'};
            break;
    }
    return result;
}

const ObjectTest = (id: string, code: string) =>
{
    let result : object;
    switch(id)
    {
        case '2':
            result = objectTest.createObject(code)
            break;
        case '4':
            result = objectTest.createClass(code)
            break;
        case '6':
            result = objectTest.createFunction(code)
            break;
        case '8':
            result = objectTest.privateTest(code)
            break;
        case '10':
            result = objectTest.staticTest(code)
            break;
        default:
            result = {error:'error'};
            break;
    }
    return result;
}


export default {
    Introduction,
    Basic,
    CyclesAndConditions,
    FunctionTest,
    ErrorTest,
    ObjectTest
}