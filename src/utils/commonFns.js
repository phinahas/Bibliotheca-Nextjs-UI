exports.formatTheData = (dataArry) => {


    let finalArray = [];
    for (var i = 0; i < dataArry.length; i++) {
        let obj = {};
        obj.orderId = dataArry[i].orderId;
        obj.user=dataArry[i].user.name;
        obj.email=dataArry[i].user.email;
        obj.book = dataArry[i].book.name;
        obj.price = dataArry[i].book.price;
        obj.status = dataArry[i].status;
        finalArray.push(obj);
    }


    return finalArray;
}