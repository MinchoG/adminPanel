export const dataForDeletionSelector = (state, id) => {
    return ( state.find(v => id === v.id))};
//new array by removing the action.payload
export const removeItemFromArrayWhereId = (array, id) => (array.filter(v=>v.id!==id));