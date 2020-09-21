//Get items list service
export let getItems = async () => {
    try {
        let response = await fetch("http://localhost:3000/items", {
            method: 'GET',
        })
        const result = await response.json();
        return result;
    }
    catch (e) {
        return null
    }
}

//Add service
export let addItems = async (name, price, imgUrl) => {
    try {
        console.log("itemData", JSON.stringify({
            name: name,
            price: price,
            img: imgUrl
           }),)
        let response = await fetch("http://localhost:3000/items", {
            method: 'POST',
            body: JSON.stringify({
               name: name,
               price: price,
               img: imgUrl
              }),
        })
        const result = await response.json();
        return result;
    }
    catch (e) {
        return null
    }
}

//Delete service
export let deleteItems = async (id) => {
    try {
        let response = await fetch("http://localhost:3000/items/" + id, {
            method: 'DELETE',
        })
        const result = await response.json();
        return result;
    }
    catch (e) {
        return null
    }
}
