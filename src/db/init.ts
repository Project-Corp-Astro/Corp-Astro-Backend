import Attendance from "./models/attendance.model";
import Employee from "./models/employee.model";

const isDev = true
async function init() {

  await Employee.sync({ alter: isDev });
  await Attendance.sync({ alter: isDev });

 
  }
const dbInit = () => {
    init();
  };
  
  export default dbInit;
    
  