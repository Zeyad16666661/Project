// Checkout page JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Get form elements
  const billingForm = document.getElementById("billing-form")
  const placeOrderBtn = document.querySelector(".place-order-btn")

  // Handle form submission
  billingForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Validate form
    if (validateForm()) {
      // Show success message
      alert("Order placed successfully!")

      // In a real application, you would send the form data to a server
      // and redirect to an order confirmation page

      // For this example, we'll just redirect to the home page after a delay
      setTimeout(() => {
        window.location.href = "../Home page/Home.html"
      }, 1500)
    }
  })

  // Form validation function
  function validateForm() {
    let isValid = true

    // Get required fields
    const firstName = document.getElementById("first-name")
    const streetAddress = document.getElementById("street-address")
    const townCity = document.getElementById("town-city")
    const phoneNumber = document.getElementById("phone-number")
    const emailAddress = document.getElementById("email-address")

    // Validate First Name
    if (!firstName.value.trim()) {
      showError(firstName, "First name is required")
      isValid = false
    } else {
      removeError(firstName)
    }

    // Validate Street Address
    if (!streetAddress.value.trim()) {
      showError(streetAddress, "Street address is required")
      isValid = false
    } else {
      removeError(streetAddress)
    }

    // Validate Town/City
    if (!townCity.value.trim()) {
      showError(townCity, "Town/City is required")
      isValid = false
    } else {
      removeError(townCity)
    }

    // Validate Phone Number
    if (!phoneNumber.value.trim()) {
      showError(phoneNumber, "Phone number is required")
      isValid = false
    } else if (!isValidPhone(phoneNumber.value)) {
      showError(phoneNumber, "Please enter a valid phone number")
      isValid = false
    } else {
      removeError(phoneNumber)
    }

    // Validate Email Address
    if (!emailAddress.value.trim()) {
      showError(emailAddress, "Email address is required")
      isValid = false
    } else if (!isValidEmail(emailAddress.value)) {
      showError(emailAddress, "Please enter a valid email address")
      isValid = false
    } else {
      removeError(emailAddress)
    }

    return isValid
  }

  // Helper function to show error message
  function showError(input, message) {
    // Remove any existing error
    removeError(input)

    // Create error message element
    const errorElement = document.createElement("div")
    errorElement.className = "error-message"
    errorElement.textContent = message
    errorElement.style.color = "#db4444"
    errorElement.style.fontSize = "12px"
    errorElement.style.marginTop = "5px"

    // Add red border to input
    input.style.borderColor = "#db4444"

    // Insert error message after input
    input.parentNode.appendChild(errorElement)
  }

  // Helper function to remove error message
  function removeError(input) {
    // Reset input border
    input.style.borderColor = ""

    // Remove error message if it exists
    const errorElement = input.parentNode.querySelector(".error-message")
    if (errorElement) {
      errorElement.remove()
    }
  }

  // Helper function to validate email format
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Helper function to validate phone format
  function isValidPhone(phone) {
    // Simple validation - at least 10 digits
    const phoneRegex = /^\d{10,}$/
    return phoneRegex.test(phone.replace(/\D/g, ""))
  }

  // Add input event listeners for real-time validation
  const inputs = billingForm.querySelectorAll("input[required]")
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (input.value.trim()) {
        removeError(input)
      }
    })
  })

  // Handle payment method selection
  const paymentMethods = document.querySelectorAll('input[name="payment-method"]')
  paymentMethods.forEach((method) => {
    method.addEventListener("change", function () {
      // In a real application, you might show/hide additional fields
      // based on the selected payment method
      console.log(`Payment method changed to: ${this.value}`)
    })
  })

  // Load cart data if available
  function loadCartData() {
    const cart = JSON.parse(localStorage.getItem("cart")) || []

    // In a real application, you would update the order summary
    // with the actual cart items and totals
    console.log("Cart data loaded:", cart)
  }

  // Initialize the page
  loadCartData()
})

// Update checkout button in the main script.js to navigate to checkout page
document.addEventListener("DOMContentLoaded", () => {
  const checkoutBtn = document.getElementById("checkout-btn")
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      window.location.href = "pages/checkout.html"
    })
  }
})
