import {NodeVM} from 'vm2'

class Introduction
{
    static ConsoleLog(code : string) 
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

        vm.run(code);
        let index : Number = log.indexOf(log.find(x => x.body.toLowerCase() == 'hello world'));

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

        return {
            result: result,
            log: log,
            error: error
        }
    }

    static Type(code: string)
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

        let test = `
        if(typeof myFirstString == "string")
        ext.myFirstString = "myFirstString - string";
        else
        ext.myFirstString = "myFirstString - " + typeof myFirstString;
        
        if(typeof myFirstNumber == "number")
        ext.myFirstNumber = "myFirstNumber - number";
        else
        ext.myFirstNumber = "myFirstNumber - " + typeof myFirstNumber;
        
        if(typeof myFirstBoolean == "boolean")
        ext.myFirstBoolean = "myFirstBoolean - boolean";
        else
        ext.myFirstBoolean = "myFirstBoolean - " + typeof myFirstBoolean;`;

        

        try 
        {
            vm.run(code + test);
            console.log(ext);
            let correct : boolean = false;
            if(ext.myFirstString == "myFirstString - string")
            {
                correct = true;
            }
            result[0] = {
                type: 'correct',
                answer: ext.myFirstString,
                correct: correct,
            };
            correct = false;
            if(ext.myFirstNumber == "myFirstNumber - number")
            {
                correct = true;
            }
            result[1] = {
                type: 'correct',
                answer: ext.myFirstNumber,
                correct: correct,
            };
            correct = false;
            if(ext.myFirstBoolean == "myFirstBoolean - boolean")
            {
                correct = true;
            }
            result[2] = {
                type: 'correct',
                answer: ext.myFirstBoolean,
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

export default Introduction;