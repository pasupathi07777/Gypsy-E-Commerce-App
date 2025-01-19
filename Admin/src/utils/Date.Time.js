 // Function to format the date (extract date part)
 export const formatDate = (dateString) => {
    const date = new Date(dateString);  // Convert string to Date object
    return date.toLocaleDateString(); // Converts to local date format (e.g., Jan 19, 2025)
  };

  // Function to format the time (extract time part)
  export const formatTime = (dateString) => {
    const date = new Date(dateString);  // Convert string to Date object
    return date.toLocaleTimeString(); // Converts to local time format (e.g., 10:30 AM)
  };