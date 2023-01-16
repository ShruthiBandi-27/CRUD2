
const base = "https://api.imgflip.com/get_memes";

let allDetails = [];

let search = document.getElementById("search");
search.addEventListener("keyup",(event) => {
    if(allDetails.length === 0) getDetails();
    const filterData = allDetails.filter((x) => {
        let filteredValue = x.name.toLowerCase().includes(event.target.value.trim().toLowerCase())
                            || x.id.toLowerCase().includes(event.target.value.trim().toLowerCase())
        return filteredValue ;
    } )

    populateDetails(filterData);
})

//function to get details
const getDetails = async () => {
    try{
    const response = await fetch(`${base}`);
    //console.log(await response.json());
    const result = await response.json();
    allDetails = [];
    allDetails = [...result.data.memes.slice(1,15)];
    console.log(result.data.memes);
    populateDetails(allDetails);
    }
    catch (err){
        console.log(err);
    }
}

//to populate date in table
const populateDetails = (data) => {
    //console.log(data);
    let tableRow = "";
    data.map((x,index) => {
        tableRow += `<tr id="${index}">
        <td class="align-middle" scope="row">${x.id}</td>
        <td class="align-middle">${x.name}</td>
        <td><img src ="${x.url}" class="img-fluid img"/></td>
        <td class="align-middle"><button type="button" class="btn btn-danger btn-md" onclick="deleteRecord(${index}, '${x.name}')">Delete</button></td>
      </tr>`
    })
    //console.log(tableRow);

    let tbody = document.getElementById("tableBody");
    tbody.innerHTML = tableRow;
}

getDetails();

//to delete record from table
function deleteRecord(index, name) {
    if(confirm(`Do you want to delete the meme: ${name}`)){
        let rowId = index;
        console.log(index);
        document.getElementById(rowId).remove();
    }
}

