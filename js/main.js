var nameInput=document.getElementById("ProductName")
var priceInput=document.getElementById("ProductPrice")
var categoryInput=document.getElementById("ProductCategory")
var descInput=document.getElementById("ProductDescription")
var btnAdd=document.getElementById("btnAdd")
var searchInput=document.getElementById("searchInput")
var inputs=document.getElementsByClassName("form-control")
var currentIndex=0
var ProductList=[]

if(localStorage.getItem('list')!=null)
{
    ProductList=JSON.parse(localStorage.getItem('list'))
    displayProduct()
}
btnAdd.onclick=function()
{
    addProduct()
    displayProduct()
    reset()
}

/* start add*/ 

function addProduct()
{
        var product = 
        {
            name:nameInput.value,
           Price:priceInput.value,
          Category:categoryInput.value,
         description:descInput.value,
                
        }
        ProductList.push(product)
        localStorage.setItem('list',JSON.stringify(ProductList))
}
/* end add */ 

/* start display */ 

function displayProduct()
{
    temp=''
    for(var i=0;i<ProductList.length;i++)
    {
        temp+=`
        <tr>
        <td>${i}</td>
        <td>${ProductList[i].name}</td>
        <td>${ProductList[i].Price}</td>
        <td>${ProductList[i].Category}</td>
        <td>${ProductList[i].description}</td>
        <td>
            <button class="btn btn-outline-danger" onclick="updateProduct(`+i+`)">
            <i class="fas fa-edit"></i>
            </button>
        </td>
        <td>
         <button class="btn btn-outline-warning" onclick="deleteProduct(`+i+`)">
         <i class="fas fa-trash"></i>
         </button>
     </td>
    </tr>
        
        `
    }
    document.getElementById("tableBody").innerHTML=temp
}
/* end display*/ 

/* start reset*/ 
btnclear.onclick=function()
{
reset()
}
function reset()
{
  for(i=0;i<inputs.length;i++)
  {
  inputs[i].value=''
  }
}
/* end reset*/ 

/* start delete*/ 

function deleteProduct(index)
{
    ProductList.splice(index,1)
    localStorage.setItem('list',JSON.stringify(ProductList))
    displayProduct()
}

/* end delete*/ 

/* start update*/ 

function updateProduct(index)
{
    currentIndex=index
    nameInput.value=ProductList[index].name
    priceInput.value=ProductList[index].Price
   categoryInput.value=ProductList[index].Category
   descInput.value=ProductList[index].description
   document.getElementById("btnEdit").style.display="inline"
   document.getElementById("btnAdd").style.display="none"

}

btnEdit.onclick=function()
{
    var product = 
    {
        name:nameInput.value,
       Price:priceInput.value,
      Category:categoryInput.value,
     description:descInput.value,
            
    }
    ProductList[currentIndex]=product
    localStorage.setItem('list',JSON.stringify(ProductList))
    displayProduct()
    document.getElementById("btnEdit").style.display="none"
    document.getElementById("btnAdd").style.display="inline"
    reset()
}

/* end update*/ 

/* start search*/ 

searchInput.onkeyup=function()
{
    var CartonA =""
    for(var i=0;i<ProductList.length;i++)
    {
        if(
         ProductList[i].name.toLowerCase().includes(searchInput.value) 
        
        ||
        
        ProductList[i].Category.toLowerCase().includes(searchInput.value) 
        )
        {
 
         CartonA+=
         `
 <tr>
 <td>${i}</td> 
     <td>${ ProductList[i].name}</td> 
     <td>${ ProductList[i].Price}</td>
     <td>${ ProductList[i].Category}</td>
      <td>${ ProductList[i].description}</td>
      <td><button class="btn btn-outline-warning">update</button></td>
      <td><button class="btn btn-outline-danger">delete</button></td>
  </tr> 
       `
}
    }
    document.getElementById("tableBody").innerHTML=CartonA
}

/* end search*/ 

// validation for product name

nameInput.onkeyup=function()
{
    var nameRegex = /^[A-Z][a-z]{3,10}[0-9]?$/

    if(nameRegex.test(nameInput.value)==true)
    {
        document.getElementById("alertName").style.display="none" 
    }
    else
    {
      document.getElementById("alertName").style.display="block"
       
    }
  
}

// validation for product price

priceInput.onkeyup=function()
{
    var priceRegex = /^[1-9][0-9]{2,7}$/
    
    if(priceRegex.test(priceInput.value)==true)
    {
        
        document.getElementById("alertPrice").style.display="none"
        
    }
    else
    {
        
        document.getElementById("alertPrice").style.display="block"
      
    }
   
}

// validation for product category

categoryInput.onkeyup=function()
{
    var categoryRegex = /(mobil|tv)/

    if(categoryRegex.test(categoryInput.value)==true)
    {
        document.getElementById("alertCategory").style.display="none" 
    }
    else
    {
      document.getElementById("alertCategory").style.display="block"
       
    }
}

// validation for product description

descInput.onkeyup=function()
{
    var descRegex = /[a-z]{3,40}/

    if(descRegex.test(descInput.value)==true)
    {
        document.getElementById("alertDesc").style.display="none" 
    }
    else
    {
      document.getElementById("alertDesc").style.display="block"
       
    }
}