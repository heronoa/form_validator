let cadastrationInfo = []


let B7Validator = {
    handleSubmit:(event)=>{
        event.preventDefault();

        let send = true;

        let inputs = form.querySelectorAll('input');

        B7Validator.clearErrors();

        for(let i = 0; i<inputs.length;i++) {
            let input = inputs[i]
            let check = B7Validator.checkInput(input);

            if(check !== true) {
                send = false;
                // exibir erro
                B7Validator.showError(input,check);
            }
        }

        if(send) {
            cadastrationInfo.push({
                nome: document.querySelector('input[name=name]').value,
                email: document.querySelector('input[name=email]').value,
                senha: document.querySelector('input[name=password]').value
            }); 
            /* form.submit(); */
            console.log(cadastrationInfo)
        }

    },
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules');
        if(rules !== null) {
            rules = rules.split('|');
            for(let k in rules) {
                let rDetails = rules[k].split('=');
                switch(rDetails[0]) {
                    case 'required':
                        if(input.value == '') {
                            return 'Field cannot be empty';

                        }
                    break;
                    case 'min':
                        if(input.value.length < rDetails[1]) {
                            return 'Field must have at least '+rDetails[1]+' digits';
                        }

                    break;
                    case 'email':
                        if(input.value != '') {
                            //Expressão regular (criar um padrão a qual o valor deve obedecer)
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if(!regex.test(input.value.toLowerCase())) {
                                return 'Submit a valid e-mail!';
                            }
                        }
                        break;
                    case 'equal':
                        let equalTo = document.querySelector(`input[ name = ${rDetails[1]} ]`).value;
                        if (input.value != equalTo) {
                            return 'Must be equal to password';
                        }
                        break;
                }
            }
        }
        return true;
    },
    showError:(input,error) => {
        input.style.borderColor = '#FF0000';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;
        input.parentElement.insertBefore(errorElement,input.ElementSibling);

    },
    clearErrors:()=> {
        let inputs = form.querySelectorAll('input');
        for (let i = 0; i < inputs.length; i++)
            inputs[i].style = '';
        let errorElements = document.querySelectorAll('.error');
        for(let i = 0; i < errorElements.length; i++)
            errorElements[i].remove();
    }
};
let form = document.querySelector('.b7validator');

form.addEventListener('submit', B7Validator.handleSubmit);