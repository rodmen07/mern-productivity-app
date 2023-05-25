export function formatDate(dateString) {
  if (dateString) {
    let date;
    try {
      date = dateString.split("T");
    } catch (error) {
      // debugger;
      date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    }
    return date[0];
  }
  else {
    return null;
  }
}

export function addDaysToDate(dateString, daysToAdd) {

  const dateComponents = dateString.split("-");
  const year = parseInt(dateComponents[0], 10);
  const month = parseInt(dateComponents[1], 10);
  const day = parseInt(dateComponents[2], 10);

  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + daysToAdd);

  const updatedYear = date.getFullYear();
  const updatedMonth = String(date.getMonth() + 1).padStart(2, '0');
  const updatedDay = String(date.getDate()).padStart(2, '0');

  return `${updatedYear}-${updatedMonth}-${updatedDay}`;
}

export function getTimelineSvg(classes = "") {
  classes = classes + "nav-icon"

  return (
    <svg className={classes} viewBox="0 0 40 40"><path d="M34.5,6C32,6,30,8,30,10.5c0,1.1,0.4,2.1,1.1,2.9l-4.3,7.6C26.5,21,26.3,21,26,21c-0.9,0-1.6,0.3-2.3,0.7L19.2,18
                c0.2-0.5,0.3-1,0.3-1.5c0-2.5-2-4.5-4.5-4.5s-4.5,2-4.5,4.5c0,0.9,0.3,1.8,0.8,2.5l-4.5,6.2C6.4,25.1,5.9,25,5.5,25
                C3,25,1,27,1,29.5S3,34,5.5,34s4.5-2,4.5-4.5c0-0.9-0.3-1.8-0.8-2.5l4.5-6.2c0.4,0.1,0.8,0.2,1.3,0.2c0.9,0,1.6-0.3,2.3-0.7l4.5,3.7
                c-0.2,0.5-0.3,1-0.3,1.5c0,2.5,2,4.5,4.5,4.5s4.5-2,4.5-4.5c0-1.1-0.4-2.1-1.1-2.9l4.3-7.6c0.3,0,0.5,0.1,0.8,0.1
                c2.5,0,4.5-2,4.5-4.5S37,6,34.5,6z M5.5,31c-0.1,0-0.3,0-0.4-0.1c0,0-0.1,0-0.1,0c-0.1,0-0.3-0.1-0.4-0.2c0,0,0,0,0,0
                c0,0-0.1-0.1-0.1-0.1c0,0-0.1-0.1-0.1-0.1c0,0-0.1-0.1-0.1-0.1c0,0-0.1-0.1-0.1-0.1c0,0-0.1-0.1-0.1-0.1c0,0,0-0.1-0.1-0.1
                c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1c0-0.1,0-0.1,0-0.2c0,0,0-0.1,0-0.1c0-0.1,0-0.1,0-0.2c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1
                c0,0,0-0.1,0-0.1c0,0,0-0.1,0.1-0.1c0,0,0.1-0.1,0.1-0.1C4.5,28.3,5,28,5.5,28C6.3,28,7,28.7,7,29.5c0,0.4-0.1,0.7-0.3,0.9
                c0,0.1-0.1,0.1-0.2,0.2c0,0-0.1,0.1-0.1,0.1c-0.1,0-0.1,0.1-0.2,0.1c0,0-0.1,0-0.1,0.1c-0.1,0-0.1,0.1-0.2,0.1c0,0-0.1,0-0.1,0
                C5.7,31,5.6,31,5.5,31C5.5,31,5.5,31,5.5,31z M15,18c-0.8,0-1.5-0.7-1.5-1.5c0-0.4,0.1-0.7,0.4-1c0,0,0.1-0.1,0.1-0.1
                c0,0,0.1-0.1,0.1-0.1c0,0,0.1-0.1,0.1-0.1c0,0,0.1,0,0.1-0.1c0,0,0.1,0,0.1-0.1c0,0,0.1,0,0.1,0c0.1,0,0.1,0,0.2,0c0,0,0,0,0.1,0
                c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0c0,0,0,0,0.1,0c0.1,0,0.1,0,0.2,0c0,0,0.1,0,0.1,0c0.1,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0.1
                c0,0,0.1,0,0.1,0.1c0,0,0.1,0.1,0.1,0.1c0.4,0.3,0.6,0.7,0.6,1.2C16.5,17.3,15.8,18,15,18z M25.9,27c-0.1,0-0.1,0-0.2,0
                c0,0-0.1,0-0.1,0c-0.1,0-0.1,0-0.2-0.1c0,0-0.1,0-0.1-0.1c-0.1,0-0.1-0.1-0.1-0.1c-0.4-0.3-0.6-0.7-0.6-1.2c0-0.8,0.7-1.5,1.5-1.5
                s1.5,0.7,1.5,1.5c0,0.3-0.1,0.6-0.2,0.8c0,0.1-0.1,0.1-0.1,0.2c0,0-0.1,0.1-0.1,0.1c0,0-0.1,0.1-0.1,0.1c0,0-0.1,0.1-0.1,0.1
                c-0.1,0-0.1,0.1-0.2,0.1c0,0,0,0,0,0c-0.1,0-0.2,0.1-0.3,0.1c0,0-0.1,0-0.1,0C26.1,27,26,27,25.9,27C25.9,27,25.9,27,25.9,27z
                M33,10.5c0-0.3,0.1-0.6,0.2-0.8c0,0,0.1-0.1,0.1-0.1c0,0,0.1-0.1,0.1-0.1c0,0,0.1-0.1,0.1-0.1c0,0,0.1-0.1,0.1-0.1
                c0,0,0.1-0.1,0.1-0.1c0,0,0.1,0,0.1-0.1c0,0,0.1,0,0.1-0.1c0,0,0.1,0,0.1,0c0,0,0.1,0,0.2,0c0,0,0.1,0,0.1,0c0,0,0,0,0.1,0
                c0,0,0.1,0,0.1,0c0.1,0,0.1,0,0.2,0c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0.1c0,0,0.1,0,0.1,0c0,0,0,0,0,0
                c0,0,0.1,0.1,0.1,0.1c0,0,0.1,0.1,0.1,0.1c0,0,0.1,0.1,0.1,0.1c0,0,0.1,0.1,0.1,0.1c0,0,0,0.1,0.1,0.1c0,0,0.1,0.1,0.1,0.1
                c0,0,0,0.1,0.1,0.1c0,0,0,0.1,0,0.1c0,0,0,0.1,0,0.1c0,0.1,0,0.1,0,0.2c0,0,0,0.1,0,0.1c0,0.1,0,0.1,0,0.2c0,0,0,0.1,0,0.1
                c0,0,0,0.1,0,0.1c0,0,0,0.1-0.1,0.1c-0.2,0.5-0.8,0.8-1.3,0.8C33.7,12,33,11.3,33,10.5z"></path></svg>
  )
}