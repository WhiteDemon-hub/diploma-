import {NodeVM} from 'vm2'

class Basic
{
    static arithmetic(code : string) 
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
            `let a = 5;
            let b = 10;`;
            let call = `ext.number_sum = Sum;
            ext.number_division = Division;
            ext.number_difference = Difference;
            ext.number_multiplication = Multiplication;` 
            vm.run(test + code + call);
            let correct : boolean = false;
            if(ext.number_sum  == 15 && ext.number_division == 0.5
                && ext.number_difference == -5 && ext.number_multiplication == 50)
            {
                correct = true;
            }
            result[0] = {
                type: 'correct',
                answer: 'Sum => ' + ext.number_sum + ', Division => ' + ext.number_difference
                + ', Difference => ' + ext.number_difference + ', Multiplication => ' + ext.number_multiplication,
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
            `let a = "30";
            let b = 10;`;
            let call = `ext.string_sum = Sum;
            ext.string_division = Division;
            ext.string_difference = Difference;
            ext.string_multiplication = Multiplication;` 
            vm.run(test + code + call);
            let correct : boolean = false;
            if(ext.string_sum  == 40 && ext.string_division == 3
                && ext.string_difference == 20 && ext.string_multiplication == 300)
            {
                correct = true;
            }
            result[1] = {
                type: 'correct',
                answer: 'Sum => ' + ext.string_sum + ', Division => ' + ext.string_difference
                + ', Difference => ' + ext.string_difference + ', Multiplication => ' + ext.string_multiplication,
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
            let test = 
            `let a = true;
            let b = 10;`;
            let call = `ext.bool_sum = Sum;
            ext.bool_division = Division;
            ext.bool_difference = Difference;
            ext.bool_multiplication = Multiplication;` 
            vm.run(test + code + call);
            let correct : boolean = false;
            if(ext.bool_sum  == 11 && ext.bool_division == 0.1
                && ext.bool_difference == -9 && ext.bool_multiplication == 10)
            {
                correct = true;
            }
            result[2] = {
                type: 'correct',
                answer: 'Sum => ' + ext.bool_sum + ', Division => ' + ext.bool_difference
                + ', Difference => ' + ext.bool_difference + ', Multiplication => ' + ext.bool_multiplication,
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

export default Basic;