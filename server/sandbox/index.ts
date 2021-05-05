// import Sandbox from 'sandbox';

// const sandBox : Sandbox  = new Sandbox();

import {VM, NodeVM} from 'vm2' 

function  StartTest(id : string, code: string)
    {
        let result : any;
        switch (id)
        {
            case '1':
                result = jsTaskOne(code);
                break;
            case '2':
                result = jsTaskTow(code);
                break;
            case '3':
                result = jsTaskThree(code);
                break;
            case '4':
                result = jsTaskFour(code);
                break;
            case '5':
                result = jsTaskFive(code);
                break;
            case '6':
                result = jsTaskSix(code);
                break;
            case '7':
                result = jsTaskSeven(code);
                break;
            case '8':
                result = jsTaskEight(code);
                break;
            case '9':
                result = jsTaskNine(code);
                break;
            case '10':
                result = jsTaskTen(code);
                break;
            default:
                result = 'error';
                break;
        }
        return result;     
    }
    function jsTaskOne(code: string)
    {
        const vm : VM = new VM({
            sandbox: {
            console: {
            log: function (str) {console.log (str);}
            }
            }
            });
        let result : any = []; 
        try 
        {
            let test_code_one = code + "Sum(15, 5) + Multiplication(3, 4)";
            let answer  = vm.run(test_code_one);
            let correct : boolean = false;
            if(answer == 32)
            {
                correct = true;
            }
            result[0] = {
                type: 'correct',
                answer: answer,
                correct: correct,
            };
        } 
        catch (err) {
            result[0] = {
                type: 'error',
                name: err.name,
                message: err.message
            };
        }
        try 
        {
            let test_code_one = code + "Sum(3, 4) + (Multiplication(8, 4) - Division(9, 3)) * Difference(2, 5)";
            let answer  = vm.run(test_code_one);
            let correct : boolean = false;
            if(answer == -80)
            {
                correct = true;
            }
            result[1] = {
                type: 'correct',
                answer: answer,
                correct: correct,
            };
        } 
        catch (err) {
            result[1] = {
                type: 'error',
                name: err.name,
                message: err.message
            };
        }

        try 
        {
            let test_code_one = code + "Sum(3, 4) + (Multiplication(8, 4) - Division(9, 3)) * Difference(2, 5) - Division(9, 3) - (Sum(3, 4) + (Multiplication(8, 4) - Division(9, 3)) * Difference(2, 5) - Division(9, 3))";
            let answer  = vm.run(test_code_one);
            let correct : boolean = false;
            if(answer == 0)
            {
                correct = true;
            }
            result[2] = {
                type: 'correct',
                answer: answer,
                correct: correct,
            };
        } 
        catch (err) {
            result[2] = {
                type: 'error',
                name: err.name,
                message: err.message
            };
        }
        return result;
    }

    function jsTaskTow(code : string)
    {
        const vm : VM = new VM({
            sandbox: {
            console: {
            log: function (str) {console.log (str);}
            }
            }
            });
        let result : any = []; 
        try 
        {
            let test_code_one = code + "SquareSumRoot(['1', '5', '3', '13'])";
            let answer  = vm.run(test_code_one);
            let correct : boolean = false;
            if(answer == 204)
            {
                correct = true;
            }
            result[0] = {
                type: 'correct',
                answer: answer,
                correct: correct,
            };
        }
        catch (err) {
            result[0] = {
                type: 'error',
                name: err.name,
                message: err.message
            };
        }
        try 
        {
            let test_code_one = code + "SquareSumRoot(['2', '4', '8', '20'])";
            let answer  = vm.run(test_code_one);
            let correct : boolean = false;
            if(answer.toFixed(2) == 10.71)
            {
                correct = true;
            }
            result[1] = {
                type: 'correct',
                answer: answer,
                correct: correct,
            };
        }
        catch (err) {
            result[1] = {
                type: 'error',
                name: err.name,
                message: err.message
            };
        }
        try 
        {
            let test_code_one = code + "SquareSumRoot(['-1', '-5', '2', '6', '4', '7', '4', '8', '20'])";
            let answer  = vm.run(test_code_one);
            let correct1 : boolean = false;
            console.log(answer.toFixed(2));
            if(answer.toFixed(2) == 90.16)
            {
                console.log('aaaa');
                correct1 = true;
            }
            result[2] = {
                type: 'correct',
                answer: answer,
                correct: correct1,
            };
        }
        catch (err) {
            result[2] = {
                type: 'error',
                name: err.name,
                message: err.message
            };
        }
        return result; 
    }
    function jsTaskThree(code : string)
    {
        const vm : VM = new VM({
            sandbox: {
            console: {
            log: function (str) {console.log (str);}
            }
            }
            });
        let result : any = []; 
        try 
        {
            let test_code_one = code + "FibonacciNumber(10)";
            let answer  = vm.run(test_code_one);
            let correct : boolean = false;
            if(answer == 34)
            {
                correct = true;
            }
            result[0] = {
                type: 'correct',
                answer: answer,
                correct: correct,
            };
        }
        catch (err) {
            result[0] = {
                type: 'error',
                name: err.name,
                message: err.message
            };
        }
        try 
        {
            let test_code_one = code + "FibonacciNumber(20)";
            let answer  = vm.run(test_code_one);
            let correct : boolean = false;
            if(answer == 4181)
            {
                correct = true;
            }
            result[1] = {
                type: 'correct',
                answer: answer,
                correct: correct,
            };
        }
        catch (err) {
            result[1] = {
                type: 'error',
                name: err.name,
                message: err.message
            };
        }
        try 
        {
            let test_code_one = code + "FibonacciNumber(100)";
            let answer  = vm.run(test_code_one);
            let correct : boolean = false;
            if(answer == 218922995834555200000)
            {
                correct = true;
            }
            result[2] = {
                type: 'correct',
                answer: answer,
                correct: correct,
            };
        }
        catch (err) {
            result[2] = {
                type: 'error',
                name: err.name,
                message: err.message
            };
        }
        return result;
    }
    function jsTaskFour(code : string)
    {
        const vm : VM = new VM({
            sandbox: {
            console: {
            log: function (str) {console.log (str);}
            }
            }
            });
        let result : any = []; 
        try 
        {
            let test_code_one = code + "palindrome('Anna')";
            let answer  = vm.run(test_code_one);
            let correct : boolean = false;
            if(answer == true)
            {
                correct = true;
            }
            result[0] = {
                type: 'correct',
                answer: answer,
                correct: correct,
            };
        }
        catch (err) {
            result[0] = {
                type: 'error',
                name: err.name,
                message: err.message
            };
        }
        try 
        {
            let test_code_one = code + "palindrome('Tron')";
            let answer  = vm.run(test_code_one);
            let correct : boolean = false;
            if(answer == false)
            {
                correct = true;
            }
            result[1] = {
                type: 'correct',
                answer: answer,
                correct: correct,
            };
        }
        catch (err) {
            result[1] = {
                type: 'error',
                name: err.name,
                message: err.message
            };
        }
        try 
        {
            let test_code_one = code + "palindrome('Sum summus slon')";
            let answer  = vm.run(test_code_one);
            let correct : boolean = false;
            if(answer == false)
            {
                correct = true;
            }
            result[2] = {
                type: 'correct',
                answer: answer,
                correct: correct,
            };
        }
        catch (err) {
            result[2] = {
                type: 'error',
                name: err.name,
                message: err.message
            };
        }
        try 
        {
            let test_code_one = code + "palindrome('Sum summus mus')";
            let answer  = vm.run(test_code_one);
            let correct : boolean = false;
            if(answer == true)
            {
                correct = true;
            }
            result[3] = {
                type: 'correct',
                answer: answer,
                correct: correct,
            };
        }
        catch (err) {
            result[3] = {
                type: 'error',
                name: err.name,
                message: err.message
            };
        }
        return result;
    }

    function jsTaskFive(code : string)
    {
        const vm : VM = new VM({
            sandbox: {
            console: {
            log: function (str) {console.log (str);}
            }
            }
            });
        let result : any = []; 
        try 
        {
            let test_code_one = code + "removeSpace('This    random   text!')";
            let answer  = vm.run(test_code_one);
            let correct : boolean = false;
            if(answer == 'This random text!')
            {
                correct = true;
            }
            result[0] = {
                type: 'correct',
                answer: answer,
                correct: correct,
            };
        }
        catch (err) {
            result[0] = {
                type: 'error',
                name: err.name,
                message: err.message
            };
        }
        try 
        {
            let test_code_one = code + "removeSpace('Lorem ipsum dolor sit amet.')";
            let answer  = vm.run(test_code_one);
            let correct : boolean = false;
            if(answer == 'Lorem ipsum dolor sit amet.')
            {
                correct = true;
            }
            result[1] = {
                type: 'correct',
                answer: answer,
                correct: correct,
            };
        }
        catch (err) {
            result[1] = {
                type: 'error',
                name: err.name,
                message: err.message
            };
        }
        try 
        {
            let test_code_one = code + "removeSpace('Sum    summus   mus')";
            let answer  = vm.run(test_code_one);
            let correct : boolean = false;
            if(answer == 'Sum summus mus')
            {
                correct = true;
            }
            result[2] = {
                type: 'correct',
                answer: answer,
                correct: correct,
            };
        }
        catch (err) {
            result[2] = {
                type: 'error',
                name: err.name,
                message: err.message
            };
        }
        return result;
    }

    function jsTaskSix(code : string)
    {
        const vm : VM = new VM({
            sandbox: {
            console: {
            log: function (str) {console.log (str);}
            }
            }
            });
        let result : any = []; 
        try 
        {
            let test_code_one = code + "Distance('p', 'm')";
            let answer  = vm.run(test_code_one);
            let correct : boolean = false;
            if(answer == 2)
            {
                correct = true;
            }
            result[0] = {
                type: 'correct',
                answer: answer,
                correct: correct,
            };
        }
        catch (err) {
            result[0] = {
                type: 'error',
                name: err.name,
                message: err.message
            };
        }
        try 
        {
            let test_code_one = code + "Distance('й', 'я')";
            let answer  = vm.run(test_code_one);
            let correct : boolean = false;
            if(answer == 21)
            {
                correct = true;
            }
            result[1] = {
                type: 'correct',
                answer: answer,
                correct: correct,
            };
        }
        catch (err) {
            result[1] = {
                type: 'error',
                name: err.name,
                message: err.message
            };
        }
        try 
        {
            let test_code_one = code + "Distance('c', 'c')";
            let answer  = vm.run(test_code_one);
            let correct : boolean = false;
            if(answer == 0)
            {
                correct = true;
            }
            result[2] = {
                type: 'correct',
                answer: answer,
                correct: correct,
            };
        }
        catch (err) {
            result[2] = {
                type: 'error',
                name: err.name,
                message: err.message
            };
        }
        return result;
    }

    function jsTaskSeven(code : string)
    {
        let ext : any = {};
        const vm : NodeVM = new NodeVM( {
            console: 'inherit',
            // pass our declared ext variable to the sandbox
            sandbox: { ext },
          });
        let result : any = []; 
        try 
        {
            let test_code_one = code + "ext.Dog = Dog;";
            vm.run(test_code_one);
            console.log(ext.Dog.name);
            let correct : boolean = false;
            if(ext.Dog.name == 'Рекс' && ext.Dog.age == 7)
            {
                correct = true;
            }
            result[0] = {
                type: 'correct',
                answer: ext,
                correct: correct,
            };
        }
        catch (err) {
            result[0] = {
                type: 'error',
                name: err.name,
                message: err.message
            };
        }
        return result;
    }

    function jsTaskEight(code : string)
    {
        let ext : any = {};
        const vm : NodeVM = new NodeVM( {
            console: 'inherit',
            // pass our declared ext variable to the sandbox
            sandbox: { ext },
          });
        let result : any = []; 
        try 
        {
            let test_code_one = code + "const dog = new Dog('Рекс', '7'); ext.Dog = dog;";
            vm.run(test_code_one);
            console.log(ext.Dog);
            let correct : boolean = false;
            if(ext.Dog.name == 'Рекс' && ext.Dog.age == 7)
            {
                correct = true;
            }
            result[0] = {
                type: 'correct',
                answer: ext,
                correct: correct,
            };
        }
        catch (err) {
            result[0] = {
                type: 'error',
                name: err.name,
                message: err.message
            };
        }
        return result;
    }

    function jsTaskNine(code : string)
    {
        let ext : any = {};
        const vm : NodeVM = new NodeVM( {
            console: 'inherit',
            // pass our declared ext variable to the sandbox
            sandbox: { ext },
          });
        let result : any = []; 
        try 
        {
            let test_code_one = code + "const user = new User('Рекс', '7', 'Asdfg123', 'test@test.com'); ext.User = user; ext.email = user.getEmail(); ext.isPassword = user.CheckPassword('Asdfg123')";
            vm.run(test_code_one);
            console.log(ext.User.getEmail());
            let correct : boolean = false;
            if(ext.User.name == 'Рекс' && ext.User.age == 7 && ext.email == 'test@test.com' && ext.isPassword == true)
            {
                correct = true;
            }
            result[0] = {
                type: 'correct',
                answer: ext,
                correct: correct,
            };
        }
        catch (err) {
            result[0] = {
                type: 'error',
                name: err.name,
                message: err.message
            };
        }
        return result;
    }
    function jsTaskTen(code : string)
    {
        let ext : any = {};
        const vm : NodeVM = new NodeVM( {
            console: 'inherit',
            // pass our declared ext variable to the sandbox
            sandbox: { ext },
          });
        let result : any = []; 
        try 
        {
            let test_code_one = code + "ext.P = rectangle.P(5, 10); ext.S = rectangle.S(5, 10);";
            vm.run(test_code_one);
            console.log(ext);
            let correct : boolean = false;
            if(ext.S == 50 && ext.P == 30)
            {
                correct = true;
            }
            result[0] = {
                type: 'correct',
                answer: { ...ext },
                correct: correct,
            };
        }
        catch (err) {
            result[0] = {
                type: 'error',
                name: err.name,
                message: err.message
            };
        }
        try 
        {
            let test_code_one = code + "ext.P = rectangle.P(6, 6); ext.S = rectangle.S(6, 6);";
            vm.run(test_code_one);
            console.log(ext);
            let correct : boolean = false;
            if(ext.S == 36 && ext.P == 24)
            {
                correct = true;
            }
            result[1] = {
                type: 'correct',
                answer: { ...ext },
                correct: correct,
            };
        }
        catch (err) {
            result[1] = {
                type: 'error',
                name: err.name,
                message: err.message
            };
        }
        try 
        {
            let test_code_one = code + "ext.P = rectangle.P(1, 5); ext.S = rectangle.S(1, 5);";
            vm.run(test_code_one);
            console.log(ext);
            let correct : boolean = false;
            if(ext.S == 5 && ext.P == 12)
            {
                correct = true;
            }
            result[2] = {
                type: 'correct',
                answer: { ...ext },
                correct: correct,
            };
        }
        catch (err) {
            result[2] = {
                type: 'error',
                name: err.name,
                message: err.message
            };
        }
        return result;
    }


export default {
    StartTest
}