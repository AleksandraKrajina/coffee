class Validation {
    constructor (config){
        this.elementsConfig = config;
        this.errors = {};

        this.generateErrorsObject();
        this.inputListener();
    }

    generateErrorsObject() {
        for(let field in this.elementsConfig){

            this.errors[field] = [];
        }
    }

    inputListener() {

        let inputSelector = this.elementsConfig;

        for(let field in inputSelector){

            let el = document.querySelector(`input[name="${field}"]`);

            el.addEventListener('input', this.validate.bind(this));
        }
    }


    //---POPUNJAVANJE GRESAKA----

   /* e, odnosi se na ono sto pise u 'aktovnom' inputu a pristupamo tome pomocu .bind(this) */
    
   validate(e){

        let elFields = this.elementsConfig; //uzima sva polja
        let field = e.target; //trenutno polje
        let fieldName = field.getAttribute('name');
        let fieldValue = field.value;

        this.errors[fieldName] = [];

        if(elFields[fieldName].required){
            if(fieldValue === ' ') {
                this.errors[fieldName].push('Required fild');
            }
        }
        if( elFields[fieldName].email){
            if(!this.validateEmali(fieldValue)) {
                this.errors[fieldName].push('E-mail is not corect');
            }
         }
        if(fieldValue.length < elFields[fieldName].minLength || fieldValue.length > elFields[fieldName].maxLength){
            this.errors[fieldName].push(`Must have min ${elFields[fieldName].minLength} and max ${elFields[fieldName].maxLength}`);

        }
        if(elFields[fieldName].matching){
            let matchingEl = document.querySelector(`input[name="${elFields[fieldName].matching}"]`);
            
            if (fieldValue !== matchingEl.value) {

                this.errors[fieldName].push('Passwords is not matching');
            }
            //--da bi sprecili konstantno uporedjivanje---

            if(this.errors[fieldName].length === 0){
                this.errors[fieldName] = [];
                this.errors[elFields[fieldName].matching] = [];
            }
        }

        //-----ISPISIVANJE GRESAKA---
    this.populateErrors(this.errors);

    }

    populateErrors(errors) {

        for(const elem of document.querySelectorAll('ul')) {
            elem.remove();
        }

        //---prolazak kroz greske

        for( let key of Object.keys(errors)) {

            let parentElement = document.querySelector(`input[name = "${key}"]`).parentElement;
            let errorsElement = document.createElement('ul');
            parentElement.appendChild(errorsElement);

            errors[key].forEach(error => { 
                let li = document.createElement('li');
                li.innerText = error;

                errorsElement.appendChild(li);

            });
        }

    }

    /* VALIDACIJA E-MAILa */

     validateEmali = email => {
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            return true;
       }
        
       return false;
   }
}
