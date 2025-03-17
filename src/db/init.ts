import Chart from "./models/chart.model";
import User from "./models/user.model";


const isDev = false;
async function init() {


  await Chart.sync({ alter: isDev });
  await User.sync({ alter: isDev });

 
  }
const dbInit = () => {
    init();
  };
  
  export default dbInit;
    
  