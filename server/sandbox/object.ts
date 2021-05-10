import {NodeVM} from 'vm2'
class ObjectTest
{
    static createObject(code : string)
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
            let test_code_one = code + `
            ext.Dog = Dog;`;
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
        return {
            result: result,
            error: error,
            log: log
        };
    }
    static createClass(code : string)
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
        return {
            result: result,
            error: error,
            log: log
        };
    }

    static createFunction(code : string)
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
            let test_code_one = code + "let dog = new Dog('Рекс', '10'); dog.birthday(); dog.birthday(); ext.Dog = dog;";
            vm.run(test_code_one);
            console.log(ext.Dog);
            let correct : boolean = false;
            if(ext.Dog.age == 12)
            {
                correct = true;
            }
            result[0] = {
                type: 'correct',
                answer: ext.Dog,
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
            let test_code_one = code + "let dog = new Dog('Рекс', '2'); dog.birthday(); ext.dog = dog;";
            vm.run(test_code_one);
            console.log(ext.Dog);
            let correct : boolean = false;
            if(ext.dog.age == 3)
            {
                correct = true;
            }
            result[1] = {
                type: 'correct',
                answer: ext.dog,
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
        return {
            result: result,
            error: error,
            log: log
        };
    }
    static privateTest(code : string)
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
        catch (err : any) {
            result[0] = {
                type: 'error',
                name: err.name,
                message: err.message
            };
            console.log(err.stack);
        }
        return {
            result: result,
            error: error,
            log: log
        };
    }

    static staticTest(code : string)
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
        return {
            result: result,
            error: error,
            log: log
        };
    }
}

export default ObjectTest;