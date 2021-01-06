export function checkPassword(value) {
    let pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/); 
    let hasNumber = /\d/;
    if ( hasNumber.test(value) && pattern.test(value))
    {
      return true;
    }
    return false;
  }