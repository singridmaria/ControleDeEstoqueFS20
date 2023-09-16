const data = window.localStorage.getItem('nome_singrid')

window.localStorage.setItem('token','Vfgdfifdghdfhchdfhdthdfhdosgdsdgr')

console.log(data)

let productsAux = []
let products = [
  {
    id: 1,
    nome_produto: "Tênis Nike Air Max",
    preco_venda: 19.99,
    preco_custo: 9.99,
    marca: "Nike",
    estoque: 50,
    descricao: "Tênis de corrida com tecnologia Air Max da Nike."
  },
  {
    id: 2,
    nome_produto: "Tênis Adidas Ultraboost",
    preco_venda: 29.99,
    preco_custo: 14.99,
    marca: "Adidas",
    estoque: 30,
    descricao: "Tênis esportivo com tecnologia Ultraboost da Adidas."
  },
  {
    id: 3,
    nome_produto: "Tênis Vans Old Skool",
    preco_venda: 24.99,
    preco_custo: 11.99,
    marca: "Vans",
    estoque: 40,
    descricao: "Tênis clássico da Vans com design Old Skool."
  },
  {
    id: 4,
    nome_produto: "Roupão Billabong Waves",
    preco_venda: 34.99,
    preco_custo: 16.99,
    marca: "Billabong",
    estoque: 25,
    descricao: "Roupão de banho com estampa de ondas da Billabong."
  },
  {
    id: 5,
    nome_produto: "Biquíni RipCurl Sun Kissed",
    preco_venda: 39.99,
    preco_custo: 19.99,
    marca: "RipCurl",
    estoque: 35,
    descricao: "Biquíni estiloso da RipCurl para dias de sol."
  },
  {
    id: 6,
    nome_produto: "Batom Quem disse Berenice Mate",
    preco_venda: 22.99,
    preco_custo: 10.99,
    marca: "Quem disse Berenice",
    estoque: 45,
    descricao: "Batom mate de longa duração da Quem disse Berenice."
  },
  {
    id: 7,
    nome_produto: "Perfume O Boticário Floratta",
    preco_venda: 31.99,
    preco_custo: 15.99,
    marca: "O Boticário",
    estoque: 20,
    descricao: "Perfume floral da linha Floratta do O Boticário."
  },
  {
    id: 8,
    nome_produto: "Camiseta Colcci Logo",
    preco_venda: 27.99,
    preco_custo: 13.99,
    marca: "Colcci",
    estoque: 60,
    descricao: "Camiseta com o logo da Colcci estampado."
  },
  {
    id: 9,
    nome_produto: "Tênis Nike React Infinity",
    preco_venda: 36.99,
    preco_custo: 18.99,
    marca: "Nike",
    estoque: 55,
    descricao: "Tênis de corrida com tecnologia React da Nike."
  },
  {
    id: 10,
    nome_produto: "Tênis Adidas Superstar",
    preco_venda: 49.99,
    preco_custo: 24.99,
    marca: "Adidas",
    estoque: 15,
    descricao: "Tênis clássico Adidas Superstar."
  }
];
const table = document.getElementById('list-products')
let lastId = 1

function searchWord() {
  if(productsAux.length) {
    products = productsAux
  }

  productsAux = products

  const form = document.getElementById('form-search')
  const formData = new FormData(form)
  const searchWord = formData.get('search')

  const encontrado = []

  productsAux.find(function (item) {
    if(item.nome_produto.toLocaleLowerCase().includes(searchWord.toLocaleLowerCase())) {
      encontrado.push(item)
    }
  })

  products = encontrado

  renderTable()

  console.log(encontrado)
}

/**
 * Cria um produto
 * 
 * @return void
 */
function create() {
  const form = formProduct()
  const product = getDataFromForm()
  products.push(product)
  renderTable()
  form.reset()
}

/**
 * Atualiza um produto
 * 
 * @return {void}
 */
function update() {
  const form = formProduct()
  const product = getDataFromFormToEdit()
  const btnAdd = document.getElementById('btn-add')
  const btnUpdate = document.getElementById('btn-update')
  btnUpdate.classList.add('d-none')
  for(let i =0; i < products.length; i++){ 
    if(Number.parseInt(product.id) === products[i].id) {
      products[i].nome_produto = product.nome_produto
      products[i].preco_venda = product.preco_venda
      products[i].preco_custo = product.preco_custo
      products[i].marca = product.marca
      products[i].estoque = product.estoque
      products[i].descricao = product.descricao
      btnAdd.classList.remove('d-none')
      renderTable()
      form.reset()
      return
    }
  }
 
}


function editById(id) {
  const form = formProduct()
  let product = {}

  for(let i = 0; i < products.length; i++){
    if(id === products[i].id){
      product = products[i]
    }
  }
  form.querySelector('input[name="id"]').value = product.id
  form.querySelector('input[name="nome_produto"]').value = product.nome_produto
  form.querySelector('input[name="preco_venda"]').value = product.preco_venda
  form.querySelector('input[name="preco_custo"]').value = product.preco_custo
  form.querySelector('input[name="marca"]').value = product.marca
  form.querySelector('input[name="estoque"]').value = product.estoque
  form.querySelector('textarea[name="descricao"]').value = product.descricao




  console.log(id)
}

function deleteById(id) {
  let list = products
  products = []
  for(let i = 0; i < list.length; i++){
    if(id != list[i].id){
      products.push(list[i])
    }
  }

  renderTable()
}

/**
 * Renderiza tabela
 * 
 * @return void
 */
function renderTable() {
  const tbody = table.querySelector('tbody')
  tbody.textContent = ''

  for(let i = 0; i < products.length; i++){

    const tr = document.createElement('tr')

    Object.keys(products[i]).forEach((key) => {
      const td = document.createElement('td')
      td.textContent = products[i][key]
      tr.appendChild(td)
    })

    const td = document.createElement('td')
    td.classList.add('d-flex', 'justify-content-end')

    //Cria o botão para deletar um item
    const btnDelete = document.createElement('button')
    btnDelete.classList.add('btn', 'btn-danger', 'mx-3')
    //Cria o botão para editar um item
    const btnEdit = document.createElement('button')
    btnEdit.classList.add('btn', 'btn-primary')
    
    btnEdit.addEventListener('click', function() {
      const btnAdd = document.getElementById('btn-add')
      btnAdd.classList.add('d-none')
      const btnUpdate = document.getElementById('btn-update')
      btnUpdate.classList.remove('d-none')
      editById(products[i].id)
    })
    btnDelete.addEventListener('click', function() {
      deleteById(products[i].id)
    })
    const iconEdit = document.createElement('i')
    iconEdit.classList.add('fa-solid', 'fa-pen-to-square')
    btnEdit.appendChild(iconEdit)

    const iconDelete = document.createElement('i')
    iconDelete.classList.add('fa-solid', 'fa-trash-can')
    btnDelete.appendChild(iconDelete)

    td.appendChild(btnEdit)
    td.appendChild(btnDelete)
    tr.appendChild(td)

    tbody.appendChild(tr)
  }

}

/**
 * Pega os dados do formulário 
 * 
 * @return data
 */
function getDataFromForm() {

  const form = formProduct()

  const formData = new FormData(form)
  const id = createDynamicId()
  const { nome_produto, preco_venda, preco_custo, marca, estoque, descricao } = Object.fromEntries(formData)

  const data = { id, nome_produto, preco_venda, preco_custo, marca, estoque, descricao }

  return data
}

/**
 * Pega os dados do formulário 
 * 
 * @return data
 */
function getDataFromFormToEdit() {

  const form = formProduct()
  const formData = new FormData(form)
  const data = Object.fromEntries(formData)

  return data
}

function createDynamicId() {
  if(!products.length){
    return lastId
  }

  return ++lastId
}


function formProduct() {
  const form = document.getElementById('form-add')
  return form
}


renderTable()