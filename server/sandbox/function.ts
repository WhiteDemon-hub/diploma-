import {NodeVM} from 'vm2'
class FunctionTest
{
    static arithmetic(code : string)
    {
        let ext : any = {};
        let log : any = [];
        let error : any = [];
        const vm : NodeVM = new NodeVM( {
            console: 'redirect',
            require: {
                external: ['request']
            },
            sandbox: {ext}
          });
        let result : any = []; 

        vm.on('console.log', (data) => 
        {
            log.push({
                type: '[LOG]',
                body: data
            })
        });

        vm.on('console.error', (data) => {
            error.push({
                type: '[ERROR]',
                body: data
            })
        });

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
                answer: 'Sum(15, 5) + Multiplication(3, 4) => ' + ext.test_one,
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
                answer: ' Sum(3, 4) + (Multiplication(8, 4) - Division(9, 3)) * Difference(2, 5) => ' + ext.test_two,
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
                answer: 'Sum(3, 4) + (Multiplication(8, 4) - Division(9, 3)) * Difference(2, 5) - Division(9, 3) - (Sum(3, 4) + (Multiplication(8, 4) - Division(9, 3)) * Difference(2, 5) - Division(9, 3)) => ' + ext.test_three,
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

        return {
            result: result,
            error: error,
            log: log
        }
    }

    static palindrome(code: string)
    {
        let ext : any = {};
        let log : any = [];
        let error : any = [];
        const vm : NodeVM = new NodeVM( {
            console: 'redirect',
            require: {
                external: ['request']
            },
            sandbox: {ext}
          });
        let result : any = []; 

        vm.on('console.log', (data) => 
        {
            log.push({
                type: '[LOG]',
                body: data
            })
        });

        vm.on('console.error', (data) => {
            error.push({
                type: '[ERROR]',
                body: data
            })
        });
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
        return {
            result: result,
            error: error,
            log: log
        }
    }

    static FibonacciNumber(code : string)
    {
        let ext : any = {};
        let log : any = [];
        let error : any = [];
        const vm : NodeVM = new NodeVM( {
            console: 'redirect',
            require: {
                external: ['request']
            },
            sandbox: {ext}
          });
        let result : any = []; 

        vm.on('console.log', (data) => 
        {
            log.push({
                type: '[LOG]',
                body: data
            })
        });

        vm.on('console.error', (data) => {
            error.push({
                type: '[ERROR]',
                body: data
            })
        });
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
                answer: 'FibonacciNumber(10) =>' + ext.test_one,
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
                answer: 'FibonacciNumber(20) => ' + ext.test_two,
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
                answer: 'FibonacciNumber(100) =>' + ext.test_three,
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
        return {
            result: result,
            error: error,
            log: log
        }
    }

    static SquareSumRoot(code : string)
    {
        let ext : any = {};
        let log : any = [];
        let error : any = [];
        const vm : NodeVM = new NodeVM( {
            console: 'redirect',
            require: {
                external: ['request']
            },
            sandbox: {ext}
          });
        let result : any = []; 

        vm.on('console.log', (data) => 
        {
            log.push({
                type: '[LOG]',
                body: data
            })
        });

        vm.on('console.error', (data) => {
            error.push({
                type: '[ERROR]',
                body: data
            })
        });
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
                answer: "SquareSumRoot(['1', '5', '3', '13']) =>" + ext.test_one ,
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
                answer: " SquareSumRoot(['2', '4', '8', '20']) =>" + ext.test_two ,
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
                answer: "SquareSumRoot(['-1', '-5', '2', '6', '4', '7', '4', '8', '20']) =>" + ext.test_three,
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
        return {
            result: result,
            error: error,
            log: log
        }
    }
}

export default FunctionTest;