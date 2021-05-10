import {VM, NodeVM} from 'vm2'

class CyclesAndConditions
{
    static testIf(code: string)
    {
        let ext : object = {};
        let log : any = [];
        let error : any = [];
        let result : any = []; 
        const vm = new NodeVM({
            console: 'redirect',
            require: {
                external: ['request']
            },
            sandbox: {ext}
        });
        
        

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
            let test = 
            `let a = true;` 
            vm.run(test + code);
            let index : Number = log.indexOf(log.find(x => x.body.toLowerCase() == 'истина'));
            if(index < 0)
            {
                result[0] = {
                    type: 'correct',
                    answer: 'ERROR',
                    correct: false,
                }
            }
            else
            {
                result[0] = {
                    type: 'correct',
                    answer: 'Successfully',
                    correct: true,
                }
            }
        }
        catch (err) 
        {
            result[0] = {
                type: 'error',
                name: err.name,
                message: err.message
            };
        }

        try 
        {
            let test = 
            `let a = false;` 
            vm.run(test + code);
            let index : Number = error.indexOf(error.find(x => x.body.toLowerCase() == 'ложь'));
            if(index < 0)
            {
                result[1] = {
                    type: 'correct',
                    answer: 'ERROR',
                    correct: false,
                }
            }
            else
            {
                result[1] = {
                    type: 'correct',
                    answer: 'Successfully',
                    correct: true,
                }
            }
        }
        catch (err) 
        {
            result[1] = {
                type: 'error',
                name: err.name,
                message: err.message
            };
        }

        return {
            result: result,
            log: log,
            error: error
        }
    }

    static sumArray(code : string)
    {
        let ext : any = {};
        let log : any = [];
        let error : any = [];
        let result : any = []; 
        const vm = new NodeVM({
            console: 'redirect',
            require: {
                external: ['request']
            },
            sandbox: {ext}
        });
        
        

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
            let test = 
            `let arr = [3, 5, 7, 9, 0];`
            let call = `ext.sum = sum;` 
            vm.run(test + code + call);
            let correct : boolean = false;
            if(ext.sum == 24)
            {
                correct = true;
            }
            result[0] = {
                type: 'correct',
                answer: '[3, 5, 7, 9, 0] => ' + String(ext.sum),
                correct: correct,
            };
        }
        catch (err) 
        {
            result[0] = {
                type: 'error',
                name: err.name,
                message: err.message
            };
        }

        try 
        {
            let test = 
            `let arr = [4, 3, 43, 2, 43, 2, 2, 5];`
            let call = `ext.sum2 = sum;` 
            vm.run(test + code + call);
            let correct : boolean = false;
            if(ext.sum2 == 104)
            {
                correct = true;
            }
            result[1] = {
                type: 'correct',
                answer: '[4, 3, 43, 2, 43, 2, 2, 5] => ' + String(ext.sum2),
                correct: correct,
            };
        }
        catch (err) 
        {
            result[1] = {
                type: 'error',
                name: err.name,
                message: err.message
            };
        }

        return {
            result: result,
            log: log,
            error: error
        }
    }

    static testArray(code : string)
    {
        let ext : any = {};
        let log : any = [];
        let error : any = [];
        let result : any = []; 
        const vm = new NodeVM({
            console: 'redirect',
            require: {
                external: ['request']
            },
            sandbox: {ext}
        });
        
        

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
            let test = 
            `let arr = [3, 5, 7, 9, 0];`
            let call = `ext.arr = arr;` 
            vm.run(test + code + call);
            let correct : boolean = false;
            if(ext.arr[0] == 5 && ext.arr[ext.arr.length - 1] == 9)
            {
                correct = true;
            }
            result[0] = {
                type: 'correct',
                answer: '[3, 5, 7, 9, 0] => ' + String(ext.arr),
                correct: correct,
            };
        }
        catch (err) 
        {
            result[0] = {
                type: 'error',
                name: err.name,
                message: err.message
            };
        }

        try 
        {
            let test = 
            `let arr = [4, 3, 43, 2, 43, 2, 2, 5];`
            let call = `ext.arr2 = arr;` 
            vm.run(test + code + call);
            let correct : boolean = false;
            if(ext.arr2[0] == 5 && ext.arr2[ext.arr2.length - 1] == 2)
            {
                correct = true;
            }
            result[1] = {
                type: 'correct',
                answer: '[4, 3, 43, 2, 43, 2, 2, 5] => ' + String(ext.arr2),
                correct: correct,
            };
        }
        catch (err) 
        {
            result[1] = {
                type: 'error',
                name: err.name,
                message: err.message
            };
        }

        return {
            result: result,
            log: log,
            error: error
        }
    }

    static testCycles(code: string)
    {
        let ext : any = {};
        let log : any = [];
        let error : any = [];
        let result : any = []; 
        const vm = new NodeVM({
            console: 'redirect',
            require: {
                external: ['request']
            },
            sandbox: {ext}
        });
        
        

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
            let test = 
            `let arr = [true, false, true, false, false];`
            let call = `ext.result = result;` 
            vm.run(test + code + call);
            let correct : boolean = false;
            if(ext.result == 2)
            {
                correct = true;
            }
            result[0] = {
                type: 'correct',
                answer: '[true, false, true, false, false] => ' + ext.result,
                correct: correct,
            };
        }
        catch (err) 
        {
            result[0] = {
                type: 'error',
                name: err.name,
                message: err.message
            };
        }

        try 
        {
            let test = 
            `let arr = [true, false, true, false, false, true, true, false];`
            let call = `ext.result2 = result;` 
            vm.run(test + code + call);
            let correct : boolean = false;
            if(ext.result2 == 4)
            {
                correct = true;
            }
            result[1] = {
                type: 'correct',
                answer: '[true, false, true, false, false, true, true, false] => ' + ext.result2,
                correct: correct,
            };
        }
        catch (err) 
        {
            result[1] = {
                type: 'error',
                name: err.name,
                message: err.message
            };
        }

        return {
            result: result,
            log: log,
            error: error
        }
    }
}

export default CyclesAndConditions