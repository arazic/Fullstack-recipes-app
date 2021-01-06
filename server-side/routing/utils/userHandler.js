
// check if the password is legal 
exports.checkPassword = function checkPassword(password)
{
   if(password.length <11 && password.length>4)
   {
      var hasNumber = /\d/;
      if(hasNumber.test(password) && isValid(password))
      {
          return true;
      }
   }
   return false;
}

// check if password is legal
function isValid(str){
    var pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/); 
    return pattern.test(str) ;
}