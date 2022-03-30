export function deleteAddress(adresses, pos){
    let tempArray = new Array(adresses.length - 1);
    let offset = 0;
    for(let i = 0; i < adresses.length - 1; i++){
        if(i >= pos){
            offset = 1;
        }
        tempArray[i] = adresses[i + offset];
    }
    return tempArray;
}