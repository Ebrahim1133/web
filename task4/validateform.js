

function  valid()
{   // checks if the fields are not blank  and maxlenght in fname 
    if (document.forms['myform']['fname'].value == '' || document.forms['myform']['fname'].value.length >20  ||document.forms['myform']['email'].value == '' || document.forms['myform']['password'].value == '') {
        alert('Please Fill all the fields of the form and check your maxlenght') ;
        return false;
    }
    if (document.forms['myform'].gender[0].checked  == false && document.forms['myform'].gender[1].checked  == false ) {
        alert('Choose Your Gender: Male or Female') ;
        return false;
    }
    if( document.forms['myform'].skill1.checked == false && document.forms['myform'].skill2.checked == false && document.forms['myform'].skill3.checked == false   )
    {
      alert( "Enter Your skills!" );   
      return false;
    } 
    if( document.forms['myform'].hoppies.value == false )
   {
     alert( "Enter Your hoppies!" );
     
     return false;
   }   
   if( document.forms['myform'].courses.value == "-1" )
   {
     alert( "Enter Your  Courses!" );
     
     return false;
   }   
   return true;
}
