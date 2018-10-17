// Classes

class Budget {
    constructor(budget) {
         this.budget = Number( budget );
         this.budgetLeft = this.budget;
    }

    substractFromBudget(amount){
        return this.budgetLeft-=amount;
    }

   
}

// Everything related to HTML
class HTML{
    // Inserts the budget when the user submits it
    insertBudget(amount) {
         // Insert into HTML
         budgetTotal.innerHTML = `${amount}`;
         budgetLeft.innerHTML = `${amount}`;
    }

       // Displays a message (correct or invalid)
       printMessage(message, className) {
        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('text-center', 'alert', className);
        messageWrapper.appendChild(document.createTextNode(message));

        // Insert into HTML
        document.querySelector('.primary').insertBefore(messageWrapper, addExpenseForm);

        //clear the error
        setTimeout(function(){
            document.querySelector('.primary .alert').remove();
        },3500)
       }

       addExpenseList(name,amount){
           const expensesList=document.querySelector('#expenses ul');
            const li=document.createElement("li");
            li.className="list-group-item d-flex justify-content-between aling-items-center";
            li.innerHTML=`${name}<span class="badge badge-primary badge-pill">$ ${amount}</span>`;

            //inset into html
            expensesList.appendChild(li);
        }

        trackBudget(amount){
            const  budgetLeftDollars=budget.substractFromBudget(amount);
            console.log(budgetLeftDollars);
            budgetLeft.innerHTML=`${budgetLeftDollars}`;

            //check when 25% is left
            if((budget.budget)/4>budgetLeftDollars){
                    budgetLeft.parentElement.parentElement.classList.remove('alert-success','alert-warning');
                    budgetLeft.parentElement.parentElement.classList.add('alert-danger');
                    //add classes and remove others
            }else if(((budget.budget)/2>budgetLeftDollars)){
                budgetLeft.parentElement.parentElement.classList.remove('alert-success');
                budgetLeft.parentElement.parentElement.classList.add('alert-warning');

            }
        }
}

const addExpenseForm=document.querySelector('#add-expense'),
         budgetTotal=document.querySelector('span#total'),
         budgetLeft=document.querySelector('span#left');


         let budget, userBudget;

         // Instanciate the HTML CLASS
         const html = new HTML();
         
eventListeners();

function eventListeners(e){

          // App Init
     document.addEventListener('DOMContentLoaded', function() {
        // Ask the visitor the weekly budget
        userBudget = prompt(' What\'s your budget for this week? ');
        // validate the userBudget 
        if(userBudget === null || userBudget === '' || userBudget === '0'  ) {
             window.location.reload();
        } else {
             // Budget is valid then instanciate the budget class
             budget = new Budget(userBudget);

             // Instanciate HTML Class
             html.insertBudget(budget.budget);
        }
   });
    addExpenseForm.addEventListener('submit',function(e){
            e.preventDefault();
        //read the input values
        const expanseName=document.querySelector("#expense").value;
        const amount=document.querySelector("#amount").value;

        if(expanseName==''||amount==''){
           html.printMessage('There was an error ! All fields are mandatory','alert-danger');
        }else{
            html.addExpenseList(expanseName,amount);
            html.trackBudget(amount);
           html.printMessage('Added...','alert-success');

        }
    });
}