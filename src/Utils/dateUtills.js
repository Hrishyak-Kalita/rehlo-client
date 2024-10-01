
const formatDate=(date)=>{
    //this function converts mongodb date style to dd/mm/yyy
    let str= date.slice(0,10);
     str=str.split('-')
     return str[2]+'-'+str[1]+'-'+str[0]
  }

const calculateDays=(startDate, endDate)=> {
    //calculate no. of day from start date to end date
    
    const [startDay, startMonth, startYear] = startDate.split('-');
    const [endDay, endMonth, endYear] = endDate.split('-');

    const start = new Date(startYear, startMonth - 1, startDay);
    const end = new Date(endYear, endMonth - 1, endDay);

    const timeDifference = end - start;
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    return Math.ceil(daysDifference); 
}

  export {formatDate, calculateDays}