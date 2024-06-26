

export const formatDate = (input) =>{
  if (!input) {
    return '';
}
        // Attempt to convert input to a Date object if it's not already one
        let date = input instanceof Date ? input : new Date(input);
        
        // Check if the date conversion was successful
        if (isNaN(date.getTime())) {
          throw new Error('Invalid input: Cannot convert to a Date object.');
        }
      
        let day = date.getDate();
        let month = date.getMonth() + 1; // Months are 0-indexed in JavaScript
        let year = date.getFullYear();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        // Ensuring day and month are in 'dd' and 'MM' formats respectively
        day = day < 10 ? '0' + day : day.toString();
        month = month < 10 ? '0' + month : month.toString();
        hours = hours < 10 ? '0' + hours : hours.toString();
        minutes = minutes < 10 ? '0' + minutes : minutes.toString();
        // Construct and return the formatted date string
        return `${day}.${month}.${year}. ${hours}:${minutes}`;
      
}

export const formatOnlyDate = (input) => {
  // Attempt to convert input to a Date object if it's not already one
  let date = input instanceof Date ? input : new Date(input);
  
  // Check if the date conversion was successful
  if (isNaN(date.getTime())) {
    throw new Error('Invalid input: Cannot convert to a Date object.');
  }

  let day = date.getDate();
  let month = date.getMonth() + 1; // Months are 0-indexed in JavaScript
  let year = date.getFullYear();

  // Ensuring day and month are in 'dd' and 'MM' formats respectively
  day = day < 10 ? '0' + day : day.toString();
  month = month < 10 ? '0' + month : month.toString();

  // Construct and return the formatted date string
  return `${day}.${month}.${year}.`;
}


export const formatOnlyDate2 = (input) => {
  // Ensure input is defined and has a reasonable format before creating a Date object
  if (!input || typeof input !== "string") {
    return "Invalid date"; // Return a message indicating an invalid date
  }

  let date = new Date(input);

  // Check if the date conversion was successful
  if (isNaN(date.getTime())) {
    return "Invalid date"; // Return a message for invalid date conversion
  }

  let day = date.getDate();
  let month = date.getMonth() + 1; // Months are 0-indexed in JavaScript
  let year = date.getFullYear();

  // Ensure day and month are in 'dd' and 'MM' formats respectively
  day = day < 10 ? "0" + day : day.toString();
  month = month < 10 ? "0" + month : month.toString();

  // Construct and return the formatted date string
  return `${day}.${month}.${year}.`;
};
