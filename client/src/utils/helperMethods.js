export default{
    createSubArrays: (array, subArrayLength) => {
		const newArray = [];
		// Separating the returned array into smaller subarrays to make pagination easier
		// Continue splicing the original returned array until it has a length of 12 or less
		while(array.length > subArrayLength){
			// Each subarray has a length of 12
			let subArray = array.splice(0, subArrayLength);
			newArray.push(subArray);
		}
		// If the original array has any left over recipes, push it into the new array as well
		if(array.length > 0){
			newArray.push(array);
		}
		return newArray;
	}
};