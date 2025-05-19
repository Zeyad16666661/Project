// Update the script.js file to include navigation to login page

// Product data
const products = [
  {
    id: 1,
    name: "Handmade Ceramic Mug",
    category: "handmade",
    creator: "Mohammed Ali",
    price: 29.99,
    originalPrice: 39.99,
    image: "../img/1.jpg",
    rating: 4.5,
    ratingCount: 128,
  },
  {
    id: 2,
    name: "Decorative Wall Art",
    category: "handmade",
    creator: "Ahmed Atteef",
    price: 89.99,
    originalPrice: 119.99,
    image: "../img/2.jpg",
    rating: 5.0,
    ratingCount: 64,
  },
  {
    id: 3,
    name: "Handwoven Basket",
    category: "handmade",
    creator: "Layla Mahfouz",
    price: 49.99,
    originalPrice: 69.99,
    image: "../img/3.jpg",
    rating: 4.8,
    ratingCount: 92,
  },
  {
    id: 4,
    name: "Pottery Vase",
    category: "handmade",
    creator: "Youssef Naffy",
    price: 69.99,
    originalPrice: 89.99,
    image: "../img/4.jpg",
    rating: 4.7,
    ratingCount: 76,
  },
  {
    id: 5,
    name: "Mandala Art Canvas",
    category: "handmade",
    creator: "Mustafa Shobban",
    price: 119.99,
    originalPrice: 149.99,
    image: "../img/5.jpg",
    rating: 4.9,
    ratingCount: 105,
  },
  {
    id: 6,
    name: "Ceramic Tea Set",
    category: "handmade",
    creator: "Fatima Abdelhamid",
    price: 79.99,
    originalPrice: 99.99,
    image: "../img/6.jpg",
    rating: 4.6,
    ratingCount: 83,
  },
  {
    id: 7,
    name: "Dreamcatcher",
    category: "handmade",
    creator: "Sarah Ahmed",
    price: 39.99,
    originalPrice: 59.99,
    image: "../img/8.jpg",
    rating: 4.8,
    ratingCount: 95,
  },
  {
    id: 8,
    name: "Handmade Parrot Toys",
    category: "handmade",
    creator: "Karim Hassan",
    price: 29.99,
    originalPrice: 49.99,
    image: "../img/8.jpg",
    rating: 4.7,
    ratingCount: 88,
  },
]

// DOM Elements
const cartIcon = document.getElementById("cart-icon")
const cartSidebar = document.getElementById("cart-sidebar")
const closeCartBtn = document.querySelector(".close-cart")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotalElement = document.getElementById("cart-total")
const cartCountElement = document.getElementById("cart-count")
const checkoutBtn = document.getElementById("checkout-btn")
const continueShoppingBtn = document.querySelector(".continue-btn")
const footerCartLink = document.getElementById("footer-cart")
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
const userIcon = document.querySelector(".action-icons a:last-child")

// go checkout

function go() {
  location.replace("../checkout/checkout.html") 
}


// Product sections
const productSections = [
  {
    id: "featured",
    container: document.getElementById("featured-products"),
    prevBtn: document.getElementById("featured-prev"),
    nextBtn: document.getElementById("featured-next"),
    scrollbarThumb: document.getElementById("featured-scrollbar-thumb"),
    products: products.slice(0, 6), // First 6 products
  },
  {
    id: "bestselling",
    container: document.getElementById("bestselling-products"),
    prevBtn: document.getElementById("bestselling-prev"),
    nextBtn: document.getElementById("bestselling-next"),
    scrollbarThumb: document.getElementById("bestselling-scrollbar-thumb"),
    products: products.slice(0, 4), // First 4 products
  },
  {
    id: "newarrival",
    container: document.getElementById("newarrival-products"),
    prevBtn: document.getElementById("newarrival-prev"),
    nextBtn: document.getElementById("newarrival-next"),
    scrollbarThumb: document.getElementById("newarrival-scrollbar-thumb"),
    products: products.slice(4, 8), // Last 4 products
  },
]

// Cart state
let cart = JSON.parse(localStorage.getItem("cart")) || []

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all product sections
  productSections.forEach((section) => {
    if (section.container) {
      displayProducts(section)
      initializeScrolling(section)
    }
  })

  updateCartUI()
  setupEventListeners()
})

// Display products in a section
function displayProducts(section) {
  section.container.innerHTML = ""

  section.products.forEach((product) => {
    // Create stars based on rating
    const fullStars = Math.floor(product.rating)
    const hasHalfStar = product.rating % 1 !== 0
    let starsHTML = ""

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        starsHTML += '<i class="fa-solid fa-star"></i>'
      } else if (i === fullStars && hasHalfStar) {
        starsHTML += '<i class="fa-solid fa-star-half-stroke"></i>'
      } else {
        starsHTML += '<i class="fa-regular fa-star"></i>'
      }
    }

    const productCard = document.createElement("div")
    productCard.className = "product-card"
    productCard.dataset.id = product.id
    productCard.innerHTML = `
          <div class="product-image">
              <img src="${product.image}" alt="${product.name}">
              <button class="add-to-cart-btn" data-id="${product.id}">
                  <i class="fa-solid fa-cart-plus"></i> Add To Cart
              </button>
          </div>
          <div class="product-info">
              <div class="product-meta">
                  <span class="product-category">${product.category}</span>
                  <span class="product-creator">${product.creator}</span>
              </div>
              <div class="product-price">
                  <span class="current-price">$${product.price.toFixed(2)}</span>
                  <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
              </div>
              <div class="product-rating">
                  <div class="stars">${starsHTML}</div>
                  <span class="rating-count">(${product.ratingCount})</span>
              </div>
          </div>
      `

    // Add click event to navigate to product detail page
    productCard.addEventListener("click", (e) => {
      // Don't navigate if clicking on the add to cart button
      if (e.target.closest(".add-to-cart-btn")) {
        return
      }
      window.location.href = `product_detail.html?id=${product.id}`
    })

    productCard.style.cursor = "pointer"
    section.container.appendChild(productCard)
  })
}

// Initialize scrolling for a product section
function initializeScrolling(section) {
  if (!section.container || !section.prevBtn || !section.nextBtn || !section.scrollbarThumb) return

  // Set initial state
  section.prevBtn.disabled = true
  updateScrollbarThumb(section)

  // Scroll event listener
  section.container.addEventListener("scroll", () => {
    updateScrollButtons(section)
    updateScrollbarThumb(section)
  })

  // Previous button click
  section.prevBtn.addEventListener("click", () => {
    section.container.scrollBy({
      left: -300,
      behavior: "smooth",
    })
  })

  // Next button click
  section.nextBtn.addEventListener("click", () => {
    section.container.scrollBy({
      left: 300,
      behavior: "smooth",
    })
  })
}

// Update scroll buttons state
function updateScrollButtons(section) {
  const { scrollLeft, scrollWidth, clientWidth } = section.container

  // Enable/disable previous button
  section.prevBtn.disabled = scrollLeft <= 0

  // Enable/disable next button
  section.nextBtn.disabled = scrollLeft >= scrollWidth - clientWidth - 5 // 5px tolerance
}

// Update scrollbar thumb position and width
function updateScrollbarThumb(section) {
  const { scrollLeft, scrollWidth, clientWidth } = section.container

  // Calculate thumb width (as percentage of visible content)
  const thumbWidthPercent = (clientWidth / scrollWidth) * 100
  section.scrollbarThumb.style.width = `${thumbWidthPercent}%`

  // Calculate thumb position
  const maxScrollLeft = scrollWidth - clientWidth
  const scrollPercent = (scrollLeft / maxScrollLeft) * 100
  const maxThumbLeft = 100 - thumbWidthPercent
  const thumbLeft = (scrollPercent / 100) * maxThumbLeft

  section.scrollbarThumb.style.left = `${thumbLeft}%`
}

// Set up event listeners
function setupEventListeners() {
  // Add to cart buttons
  document.addEventListener("click", (e) => {
    if (e.target.closest(".add-to-cart-btn")) {
      const button = e.target.closest(".add-to-cart-btn")
      const productId = Number.parseInt(button.dataset.id)
      addToCart(productId)
    }
  })

  // Cart toggle
  if (cartIcon) {
    cartIcon.addEventListener("click", (e) => {
      e.preventDefault()
      toggleCart()
    })
  }

  // Close cart
  if (closeCartBtn) {
    closeCartBtn.addEventListener("click", toggleCart)
  }

  // Cart overlay click to close
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("cart-overlay")) {
      toggleCart()
    }
  })

  // Continue shopping button
  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener("click", toggleCart)
  }

  // Footer cart link
  if (footerCartLink) {
    footerCartLink.addEventListener("click", (e) => {
      e.preventDefault()
      toggleCart()
    })
  }

  // Checkout button
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      window.location.href = "checkout.html"
    })
  }

  // User icon click - redirect to login page
  if (userIcon) {
    userIcon.addEventListener("click", (e) => {
      e.preventDefault()
      // Check if user is logged in (in a real app, you would check session/token)
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"

      if (isLoggedIn) {
        window.location.href = "pages/account.html"
      } else {
        window.location.href = "pages/login.html"
      }
    })
  }

  // Mobile menu toggle
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", toggleMobileMenu)
  }

  // Quantity buttons in cart
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("quantity-decrease")) {
      const productId = Number.parseInt(e.target.dataset.id)
      updateCartItemQuantity(productId, -1)
    } else if (e.target.classList.contains("quantity-increase")) {
      const productId = Number.parseInt(e.target.dataset.id)
      updateCartItemQuantity(productId, 1)
    }
  })

  // Remove item buttons
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-item")) {
      const productId = Number.parseInt(e.target.dataset.id)
      removeFromCart(productId)
    }
  })
}

// Toggle cart sidebar
function toggleCart() {
  cartSidebar.classList.toggle("open")
  document.body.style.overflow = cartSidebar.classList.contains("open") ? "hidden" : ""
}

// Toggle mobile menu
function toggleMobileMenu() {
  const mobileNav = document.querySelector(".mobile-nav")
  if (mobileNav) {
    mobileNav.classList.toggle("open")
    document.body.style.overflow = mobileNav.classList.contains("open") ? "hidden" : ""
  }
}

// Add product to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId)
  if (!product) return

  const existingItem = cart.find((item) => item.id === productId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  // Save to localStorage
  localStorage.setItem("cart", JSON.stringify(cart))

  // Update UI
  updateCartUI()

  // Show cart
  toggleCart()
}

// Update cart item quantity
function updateCartItemQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId)
  if (!item) return

  item.quantity += change

  if (item.quantity <= 0) {
    removeFromCart(productId)
    return
  }

  // Save to localStorage
  localStorage.setItem("cart", JSON.stringify(cart))

  // Update UI
  updateCartUI()
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId)

  // Save to localStorage
  localStorage.setItem("cart", JSON.stringify(cart))

  // Update UI
  updateCartUI()
}

// Update cart UI
function updateCartUI() {
  // Update cart count
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
  if (cartCountElement) {
    cartCountElement.textContent = totalItems
    cartCountElement.style.display = totalItems > 0 ? "flex" : "none"
  }

  // Update cart items
  if (cartItemsContainer) {
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>'
      document.getElementById("cart-summary").style.display = "none"
    } else {
      let cartHTML = '<ul class="cart-items-list">'

      cart.forEach((item) => {
        cartHTML += `
                    <li class="cart-item">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-details">
                            <h4 class="cart-item-title">${item.name}</h4>
                            <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
                            <div class="cart-item-quantity">
                                <button class="quantity-btn quantity-decrease" data-id="${item.id}">-</button>
                                <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                                <button class="quantity-btn quantity-increase" data-id="${item.id}">+</button>
                            </div>
                            <button class="remove-item" data-id="${item.id}">Remove</button>
                        </div>
                    </li>
                `
      })

      cartHTML += "</ul>"
      cartItemsContainer.innerHTML = cartHTML
      document.getElementById("cart-summary").style.display = "block"
    }
  }

  // Update cart total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  if (cartTotalElement) {
    cartTotalElement.textContent = `$${total.toFixed(2)}`
  }
}

// Create mobile navigation menu
function createMobileNav() {
  const mobileNav = document.createElement("div")
  mobileNav.className = "mobile-nav"
  mobileNav.innerHTML = `
        <div class="mobile-nav-header">
            <h3>Menu</h3>
            <button class="close-mobile-nav"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <ul>
            <li><a href="index.html" class="active">Home</a></li>
            <li><a href="pages/contact.html">Contact</a></li>
            <li><a href="pages/about.html">About</a></li>
            <li><a href="pages/sign-up.html">Sign Up</a></li>
            <li><a href="pages/login.html">Login</a></li>
            <li><a href="pages/account.html">My Account</a></li>
            <li><a href="pages/wishlist.html">Wishlist</a></li>
        </ul>
    `

  const mobileNavOverlay = document.createElement("div")
  mobileNavOverlay.className = "mobile-nav-overlay"

  document.body.appendChild(mobileNav)
  document.body.appendChild(mobileNavOverlay)

  // Close mobile nav when clicking the close button
  const closeBtn = mobileNav.querySelector(".close-mobile-nav")
  closeBtn.addEventListener("click", toggleMobileMenu)

  // Close mobile nav when clicking the overlay
  mobileNavOverlay.addEventListener("click", toggleMobileMenu)
}

// Create mobile nav on page load
createMobileNav()

