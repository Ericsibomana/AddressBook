function fnccopytext()
{
   document.getElementById('cp').innerHTML  = fullname.value;
   document.getElementById('unq').style.color = 'crimson';   
}
function fnccopytext1()
{
   document.getElementById('unq1').style.color = 'crimson';   
}
function fnccopytext2()
{
   document.getElementById('unq2').style.color = 'crimson';   
}
function fnccopytext3()
{
   document.getElementById('unq3').style.color = 'crimson';   
}
function fnccopytext4()
{
   document.getElementById('unq4').style.color = 'crimson'; 
}

window.onload = function(){
    // Buttons
    var quickAddBtn = document.getElementById('QuickAdd');
    var quickAddFormDiv = document.querySelector('.quickaddForm')
    var cancelBtn = document.getElementById('Cancel');
    var AddBtn = document.getElementById('Add');
    // Form Fields
    var fullname = document.getElementById('fullname');
    var phone = document.getElementById('phone');
    var address = document.getElementById('address');
    var friend = document.getElementById('friend');
    var email = document.getElementById('email');
    var family = document.getElementById('family');
    var acquaitances = document.getElementById('acquaitances');
    // Divs etc.
    var addBookDiv = document.querySelector('.addbook');
    var viewDiv = document.querySelector('.view_modal');    
    var frame_hue=document.getElementsByClassName("frame_show")[0];
    quickAddBtn.addEventListener("click", function(){
        // display the form div
        quickAddFormDiv.style.display = "block";
       QuickAdd.style.display = "none";
    });

    cancelBtn.addEventListener("click", function(){
        quickAddFormDiv.style.display = "none";
       QuickAdd.style.display = "block";
    });

    AddBtn.addEventListener("click", addToBook);

    addBookDiv.addEventListener("click", removeEntry);
    addBookDiv.addEventListener("click", viewMore);

    // Storage Array
    var addressBook = [];

    
    function jsonStructure(fullname,phone,address,friend,email,family,acquaitances){
        this.fullname = fullname;
        this.phone = phone;
        this.address = address;
        this.friend = friend;
        this.email = email;
        this.family = family;
        this.acquaitances = acquaitances;
    }

    function addToBook(){
        var isNull = fullname.value!='' && phone.value!='' && address.value!='' && friend.value!='' && email.value!='' && family.value!='' && acquaitances.value!='';
        if(isNull){
            // format the input into a valid JSON structure
            var obj = new jsonStructure(fullname.value,phone.value,address.value,friend.value,email.value, family.value, acquaitances.value);
            addressBook.push(obj);
            localStorage['addbook'] = JSON.stringify(addressBook);
            quickAddFormDiv.style.display = "none";
            clearForm();
            showAddressBook();
        }
    }

    function removeEntry(e){
        // Remove an entry from the addressbook
        if(e.target.classList.contains('delbutton')){
            var remID = e.target.getAttribute('data-id');
            addressBook.splice(remID,1);
            localStorage['addbook'] = JSON.stringify(addressBook);
            showAddressBook();
        }
    }

    function clearForm(){
        var formFields = document.querySelectorAll('.formFields');
        for(var i in formFields){
            formFields[i].value = '';
        }
    }

    function showAddressBook(){
        if(localStorage['addbook'] === undefined)
        {
            localStorage['addbook'] = '';
        } 
        else
        {
            addressBook = JSON.parse(localStorage['addbook']);
            // Loop over the array addressBook and insert into the page
            addBookDiv.innerHTML = '';
            var str="";
            str = '<table class="table table-bordered table-responsive table-striped" style="width:100%;"><tr><th>Full Name</th><th>Email</th><th>Phone</th><th>Delete</th><th>View More</th></tr>';
            for(var n in addressBook)
            {    
                    str += '<tr><td>' + addressBook[n].fullname + '</td><td>' + addressBook[n].email + '</td><td>' + addressBook[n].phone + '</td><td><div class="del"><a href="#" class="delbutton" data-id="' + n + '">Delete</a></div></td><td><div class="del"><a href="#" class="viewbutton" data-id="' + n + '">view</a></div></td></tr>';
            }
        str+="</table>";
        addBookDiv.innerHTML = str;
       }
    }
    function viewMore(e)
    {
        // Remove an entry from the addressbook
        if(e.target.classList.contains('viewbutton')){
            var remID = e.target.getAttribute('data-id');           
            addressBook = JSON.parse(localStorage['addbook']);
            // Loop over the array addressBook and display it in modal
            viewDiv.innerHTML = '';
            var output="";
            output = '<h4 align="center">Contact Information</h4><div align="center">';
            for(var n in addressBook)
            {    
                if(n==remID) {
                    output += '<p>Full name: ' + addressBook[n].fullname + '</p>';
                    output += '<p>Email: ' + addressBook[n].email + '</p>';
                    output += '<p>Phone Number: ' + addressBook[n].phone + '</p>';
                    output += '<p>Address: ' + addressBook[n].address + '</p>';
                    output += '<p>friend: ' + addressBook[n].friend + '</p>';
                }
            }
  
             viewDiv.innerHTML=output;
             document.getElementsByClassName("frame_show")[0].style.display="block";
             document.getElementsByClassName("view_modal")[0].style.display="block";
        }
    }
    showAddressBook();
    frame_hue.addEventListener("click",function() {
       this.style.display="none";
       document.getElementsByClassName("view_modal")[0].style.display="none";
    });
    document.getElementById("close_btn").addEventListener("click",function() {
        frame_hue.style.display="none";
        document.getElementsByClassName("view_modal")[0].style.display="none";
    });
}