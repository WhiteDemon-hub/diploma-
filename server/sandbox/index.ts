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
        let ext : any = {};
        const vm : NodeVM = new NodeVM( {
            console: 'inherit',
            // pass our declared ext variable to the sandbox
            sandbox: { ext },
          });
        let result : any = []; 
        try 
        {
            let test_code_one = code + "ext.test_one = Sum(15, 5) + Multiplication(3, 4);";
            
            vm.run(test_code_one);
            console.log(ext.c);
            let correct : boolean = false;
            if(ext.test_one == 32)
            {
                correct = true;
            }
            result[0] = {
                type: 'correct',
                answer: ext.test_one,
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
            let test_code_one = code + "ext.test_two = Sum(3, 4) + (Multiplication(8, 4) - Division(9, 3)) * Difference(2, 5)";
            vm.run(test_code_one);
            let correct : boolean = false;
            if(ext.test_two == -80)
            {
                correct = true;
            }
            result[1] = {
                type: 'correct',
                answer: ext.test_two,
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
            let test_code_one = code + "ext.test_three = Sum(3, 4) + (Multiplication(8, 4) - Division(9, 3)) * Difference(2, 5) - Division(9, 3) - (Sum(3, 4) + (Multiplication(8, 4) - Division(9, 3)) * Difference(2, 5) - Division(9, 3))";
            vm.run(test_code_one);
            let correct : boolean = false;
            if(ext.test_three == 0)
            {
                correct = true;
            }
            result[2] = {
                type: 'correct',
                answer: ext.test_three,
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
        let ext : any = {};
        const vm : NodeVM = new NodeVM( {
            console: 'inherit',
            // pass our declared ext variable to the sandbox
            sandbox: { ext },
          });
        let result : any = []; 
        try 
        {
            let test_code_one = code + "ext.test_one = SquareSumRoot(['1', '5', '3', '13'])";
            vm.run(test_code_one);
            let correct : boolean = false;
            if(ext.test_one  == 204)
            {
                correct = true;
            }
            result[0] = {
                type: 'correct',
                answer: ext.test_one ,
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
            let test_code_one = code + "ext.test_two = SquareSumRoot(['2', '4', '8', '20'])";
            vm.run(test_code_one);
            let correct : boolean = false;
            if(ext.test_two.toFixed(2) == 10.71)
            {
                correct = true;
            }
            result[1] = {
                type: 'correct',
                answer: ext.test_two ,
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
            let test_code_one = code + "ext.test_three = SquareSumRoot(['-1', '-5', '2', '6', '4', '7', '4', '8', '20'])";
            let answer  = vm.run(test_code_one);
            let correct1 : boolean = false;
            if(ext.test_three.toFixed(2) == 90.16)
            {
                correct1 = true;
            }
            result[2] = {
                type: 'correct',
                answer: ext.test_tow,
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
        let ext : any = {};
        const vm : NodeVM = new NodeVM( {
            console: 'inherit',
            // pass our declared ext variable to the sandbox
            sandbox: { ext },
          });
        let result : any = []; 
        try 
        {
            let test_code_one = code + "ext.test_one = FibonacciNumber(10)";
            vm.run(test_code_one);
            let correct : boolean = false;
            if(ext.test_one == 55)
            {
                correct = true;
            }
            result[0] = {
                type: 'correct',
                answer: ext.test_one,
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
            let test_code_one = code + "ext.test_two = FibonacciNumber(20)";
            vm.run(test_code_one);
            let correct : boolean = false;
            if(ext.test_two == 6765)
            {
                correct = true;
            }
            result[1] = {
                type: 'correct',
                answer: ext.test_two,
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
            let test_code_one = code + "ext.test_three = FibonacciNumber(100)";
            vm.run(test_code_one);
            let correct : boolean = false;
            if(ext.test_three == 354224848179262000000)
            {
                correct = true;
            }
            result[2] = {
                type: 'correct',
                answer: ext.test_three,
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
        let ext : any = {};
        const vm : NodeVM = new NodeVM( {
            console: 'inherit',
            // pass our declared ext variable to the sandbox
            sandbox: { ext },
          });
        let result : any = []; 
        try 
        {
            let test_code_one = code + "ext.test_one = palindrome('Anna')";
            vm.run(test_code_one);
            let correct : boolean = false;
            if(ext.test_one == true)
            {
                correct = true;
            }
            result[0] = {
                type: 'correct',
                answer: ext.test_one,
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
            let test_code_one = code + "ext.test_four = palindrome('Tron')";
            vm.run(test_code_one);
            let correct : boolean = false;
            if(ext.test_four == false)
            {
                correct = true;
            }
            result[1] = {
                type: 'correct',
                answer: ext.test_four,
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
            let test_code_one = code + "ext.test_two = palindrome('Sum summus slon')";
            vm.run(test_code_one);
            let correct : boolean = false;
            if(ext.test_two == false)
            {
                correct = true;
            }
            result[2] = {
                type: 'correct',
                answer: ext.test_two,
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
            let test_code_one = code + "ext.test_three = palindrome('Sum summus mus')";
            vm.run(test_code_one);
            let correct : boolean = false;
            if(ext.test_three == true)
            {
                correct = true;
            }
            result[3] = {
                type: 'correct',
                answer: ext.test_three,
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
        let ext : any = {};
        const vm : NodeVM = new NodeVM( {
            console: 'inherit',
            // pass our declared ext variable to the sandbox
            sandbox: { ext },
          });
        let result : any = []; 
        try 
        {
            let test_code_one = code + "ext.test_one = removeSpace('This    random   text!')";
            vm.run(test_code_one);
            let correct : boolean = false;
            if(ext.test_one == 'This random text!')
            {
                correct = true;
            }
            result[0] = {
                type: 'correct',
                answer: ext.test_one,
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
            let test_code_one = code + "ext.test_two = removeSpace('Lorem ipsum dolor sit amet.')";
            vm.run(test_code_one);
            let correct : boolean = false;
            if(ext.test_two == 'Lorem ipsum dolor sit amet.')
            {
                correct = true;
            }
            result[1] = {
                type: 'correct',
                answer: ext.test_two,
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
            let test_code_one = code + "ext.test_three = removeSpace('Sum    summus   mus')";
            vm.run(test_code_one);
            let correct : boolean = false;
            if(ext.test_three == 'Sum summus mus')
            {
                correct = true;
            }
            result[2] = {
                type: 'correct',
                answer: ext.test_three,
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
        let ext : any = {};
        const vm : NodeVM = new NodeVM( {
            console: 'inherit',
            // pass our declared ext variable to the sandbox
            sandbox: { ext },
          });
        let result : any = []; 
        try 
        {
            let test_code_one = code + "ext.test_one = Distance('p', 'm')";
            vm.run(test_code_one);
            let correct : boolean = false;
            if(ext.test_one == 2)
            {
                correct = true;
            }
            result[0] = {
                type: 'correct',
                answer: ext.test_one,
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
            let test_code_one = code + "ext.test_two = Distance('й', 'я')";
            vm.run(test_code_one);
            let correct : boolean = false;
            if(ext.test_two == 21)
            {
                correct = true;
            }
            result[1] = {
                type: 'correct',
                answer: ext.test_one,
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
            let test_code_one = code + "ext.test_three = Distance('c', 'c')";
             vm.run(test_code_one);
            let correct : boolean = false;
            if(ext.test_three == 0)
            {
                correct = true;
            }
            result[2] = {
                type: 'correct',
                answer: ext.test_three,
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