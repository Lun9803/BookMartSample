var tableBody = document.getElementById("table-body");


// add books to the table based on js object
for(let i = 0; i<bookList.length; i++){
    addBook(bookList[i]);
}

// stores the index of books in shopping cart.
var booksInCart = [];

// provide a book object and it automatically adds a new line for the book
function addBook(book){
    tableBody.innerHTML += 
        '<tr class="book-row">' +
        `<td><input type="checkbox" name="select-book"></td>` +
        `<td><img src=${book["img"]} alt='Image Not Found' align='left'></td>` +
        `<td>${book["title"]}</td>`+
        `<td>${book["authors"]}</td>`+
        `<td>${book["year"]}</td>` +
        `<td>${book["price"]}</td>` +
        `<td>${book["publisher"]}</td>` +
        `<td class="book-cat">${book["category"]}</td>` +
        '</tr>';
}

function search(){
    let keyword = document.getElementById("search-book").value;
    let reg = new RegExp(keyword, "i");
    // to check the output
    // alert(keyword);
    var rows = tableBody.childNodes;

    // clear orignal search
    for(let i=0; i<rows.length; i++){
        let title = rows[i].childNodes[2].innerHTML;
        rows[i].childNodes[2].style.background="white";
    }

    // if no input is given, don't search
    if(keyword=="")return;

    // start new search
    let found = false;
    for(let i=0; i<rows.length; i++){
        // if the book is not even displayed(due to filter), do not process search for it
        if(rows[i].style.display=="none")continue;
        
        let title = rows[i].childNodes[2].innerHTML;
        if(title.match(reg)!=null){
            found = true;
            rows[i].childNodes[2].style.background="yellow";
            //alert("found "+i);
        }
    }

    if(!found)alert("No book found");
}

function filter(){
    // reset the filter 
    let bookRows = document.getElementsByClassName("book-row");
    for(let i=0; i<bookRows.length; i++){
        bookRows[i].style.display="table-row";
    } 

    // find the selected category
    let options = document.getElementsByTagName("option");
    let category = "";
    for(let i=0; i<options.length; i++){
        if(options[i].selected==true){
            category = options[i].value;
            break;
        }
    }

    // if not selected, no operation
    if(category=="All"){
        search();
        return;
    }
    // otherwise search through the books, if category does not match
    // then the book is hidden
    let categories = document.getElementsByClassName("book-cat");
    for(let i=0; i<categories.length; i++){
        if(categories[i].innerHTML!=category){
           categories[i].parentNode.style.display="none";
        }
    }
    search();
}

function addCart(){
    let bookRows = document.getElementsByClassName("book-row");
    // initilize cart
    booksInCart=[];
    // if a book is selected, push the index of that book to cart
    for(let i=0; i<bookRows.length; i++){
        if(bookRows[i].firstChild.firstChild.checked){
            booksInCart.push(i);
        }
    }
    // update cart number count
    let cartNum = document.getElementById("cart-number");
    cartNum.innerHTML="("+booksInCart.length+")";

    // to check that correct books are selected
    let info = "currently selected: \n\n";
    for(let i=0; i<booksInCart.length; i++){
        info+=`${bookList[booksInCart[i]]["title"]}\n\n`;
    }

    alert(info);
}

function resetCart(){
    if(confirm("Are you sure to reset the cart?")){
        booksInCart=[];
        let cartNum = document.getElementById("cart-number");
        cartNum.innerHTML="(0)";
        let checkboxes = document.getElementsByName("select-book");
        for(let i=0; i<checkboxes.length; i++){
            checkboxes[i].checked=false;
        }
    }
}