import { loadPastOrders } from "../DBConnection/loadPastOrders.js";

const fetchNewOrders = async(pool, since) => {
    try{
        await loadPastOrders(pool, since);
    }catch(err){
        return console.log("fetchNewOrders err", err)
    }
    
} 


export{
    fetchNewOrders,
}