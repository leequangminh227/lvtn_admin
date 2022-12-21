


  const moneyFormat = ((money)=>{

    // return (money).toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,');

    return (Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money)).slice(0,-1)
  })
  
  const dateFormat = ((date)=>{
    // return new Date(date.toLocaleString("en-US", {timeZone: "Asia/Jakarta"})); 
    if(date===null){
      return ''
    }else{
      return new Date(date).toLocaleDateString("en-GB", "Asia/Jakarta") + ' ' + new Date(date).toLocaleTimeString("en-GB", "Asia/Jakarta")
    }
  })

  const exportToExcel = ((file)=>{
    console.log(file)
  })

  const checkDateBetween = ((dateFrom, dateTo, date)=>{
    return (new Date(dateFrom)<new Date(date))&&(new Date(date)<new Date(dateTo))
  })

  const isValidObjectKeyValue = ((value)=>{
    return (value !== '') && (value !== ' ') && (value !== undefined ) && (value !== null ) && (typeof value === 'string') 
  })


  const getSortedObject = (object) => {
    var sortedObject = {};
  
    var keys = Object.keys(object);
    keys.sort();
  
    for (var i = 0, size = keys.length; i < size; i++) {
      let key = keys[i];
      let value = object[key];
      sortedObject[key] = value;
    }
  
    return sortedObject;
  }

  const sortArrayOfObject = ((obj, value)=>{
    if(obj.length>0){
      if(value === 'name'){
        return obj.sort((a,b) => a[value] - b[value]);
      }else{
        return obj.sort((a,b) => b[value] - a[value]);
      }
    }else{
      return []
    }
  })

  const reverseArray = ((array)=>{
    return array.slice(0).reverse()
  })

  module.exports = {
    moneyFormat,
    dateFormat,
    exportToExcel,
    checkDateBetween,
    isValidObjectKeyValue,
    getSortedObject,
    reverseArray,
    sortArrayOfObject
  }