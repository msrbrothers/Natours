function string_sort(str) {
    let arr = str.split('');
     for (let i = 0 ; i < arr.length; i++) {
        for (let j = i + 1; j <= arr.length; j++){
           if(arr[i] > arr[j]){
             let temp = arr[i];
             arr[i] = arr[j];
             arr[j]  = temp;
           }
        }
     }
return arr.join('');
}


console.log(string_sort("dcba"));

