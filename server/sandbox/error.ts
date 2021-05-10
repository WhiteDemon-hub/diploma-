import {NodeVM} from 'vm2'

class ErrorTest
{
    static ErrorLog(code : string) 
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

        let test = 
        `const test = () => {
            col;
        }
        `;

        vm.run(test + code);
        let index : Number = error.indexOf(error.find(x => x.body.toLowerCase() == 'col is not defined'));

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

        test = 
        `const test = () => {
            throw new Error('Ошибка =(');
        }
        `;

        vm.run(test + code);
        index = error.indexOf(error.find(x => x.body == 'Ошибка =('));

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

        return {
            result: result,
            log: log,
            error: error
        }
    }

    static ageValid(code: string)
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
            let test : string = `
            let res;
            try
            {
                ext.age = ageValid(15);
            }
            catch(err)
            {
                res = err.message;
            }
            ext.res = res;
            ` 
            vm.run(code + test);
            console.log(ext);
            let correct : boolean = false;
            if(ext.res != undefined)
            {
                correct = true;
            }
            result[0] = {
                type: 'correct',
                answer: ext.res,
                correct: correct,
            };
        }
        catch (err) {
            result.push({
                type: 'error',
                name: err.name,
                message: err.message
            });
        }

        try 
        {
            let test : string = `
            let res;
            try
            {
                ext.age2 = ageValid(19);
            }
            catch(err)
            {
                res = err.message;
            }
            ext.res2 = res;
            ` 
            vm.run(code + test);
            console.log(ext);
            let correct : boolean = false;
            if(ext.age2 == 19)
            {
                correct = true;
            }
            result[1] = {
                type: 'correct',
                answer: ext.age2,
                correct: correct,
            };
        }
        catch (err) {
            result.push({
                type: 'error',
                name: err.name,
                message: err.message
            });
        }

        return {
            result: result,
            log: log,
            error: error
        }
    }
}

export default ErrorTest;

