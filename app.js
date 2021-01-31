const products = [
    {
        name: 'SWEAT-SHIRT',
        price: 800,
    },
    {
        name: '2PCS SUIT',
        price: 2000,
    },
    {
        name: 'JACKET BLAZER',
        price: 1200
    }
]

let cart = {
    items: [],
    totalPrice: 0
}

function renderAllProducts() {
    const productTable = document.getElementById('products')
    productTable.innerHTML = ''
    products.forEach((product, index) => {
        productTable.innerHTML += `
        <tr>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>
          <button class="btn btn-success" onclick="addToCart(${index})">ADD TO CART</button></td>
        </tr>
        `
    })
}

function renderAllCarts() {
    const cartTable = document.getElementById('carts')
    const totalPriceElement = document.getElementById('total-price')
    let totalPrice = 0
    cartTable.innerHTML = ''
    if (cart.items.length === 0) {
        cartTable.innerHTML = `
        <tr>
        <td colspan="5">
        There is no item in cart yet.
        </td>
        </tr>
        `
    }
    cart.items.forEach((cart, index) => {
        totalPrice += cart.total
        cartTable.innerHTML += `
        <tr>
          <td>${cart.name}</td>
          <td>${cart.price}</td>
          <td>${cart.quantity}</td>
          <td>${cart.total}</td>
          <td>
          <td><button class="btn btn-sm btn-danger" onclick="removeFromCart('${cart.name}')">Remove from CART</button></td>
        </tr>
        `
    })
    totalPriceElement.innerText = `Total : ${totalPrice}`
}

function addToCart(productIndex) {
    const product = products[productIndex]
    let isAlreadyInCart = false

    let newCartItems = cart.items.reduce((state, item) => {
        if (item.name === product.name) {
            isAlreadyInCart = true
            const newItem = {
                ...item,
                quantity: item.quantity + 1,
                total: (item.quantity + 1) * item.price
            }
            return [...state, newItem];
        }
        return [...state, item]
    }, [])

    if (!isAlreadyInCart) {
        newCartItems.push({
            ...product,
            quantity: 1,
            total: product.price,
        })
    }

    cart = {
        ...cart,
        items: newCartItems,
    }
    renderAllCarts();
}

function removeFromCart(productName) {
    let newCartItems = cart.items.reduce((state, item) => {
        if (item.name === productName) {
            const newItem = {
                ...item,
                quantity: item.quantity - 1,
                total: (item.quantity - 1) * item.price
            }
            if (newItem.quantity > 0) {
                return [...state, newItem];
            }
            return state
        }
        return [...state, item]
    }, [])
    cart = {
        ...cart,
        items: newCartItems
    }

    renderAllCarts()
}
renderAllProducts();
renderAllCarts();