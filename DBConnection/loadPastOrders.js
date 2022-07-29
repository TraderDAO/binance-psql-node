import { loadPastOrdersbySymbol } from "../Generator/generatePastOrdersbySymbol.js";
import { symbols } from "../Inputs/config.js";

const loadPastOrders = async(pool, since) => {
    try{
        // Load Past Orders by Symbol
        for(let i = 0; i < symbols.length; i++){
            const loadOrders = await loadPastOrdersbySymbol(symbols[i], pool ,since);
        }
        // console.log("All Orders Has Been Loaded")
        return true;
    }catch(err){
        return console.log("loadPastOrders err", err)
    }
    
} 


export{
    loadPastOrders,
}