// Login page JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Get form elements
  const loginForm = document.getElementById("login-form")
  const emailPhoneInput = document.getElementById("email-phone")
  const passwordInput = document.getElementById("password")
  const loginBtn = document.querySelector(".login-btn")
  const forgotPasswordLink = document.querySelector(".forgot-password")

  // Handle form submission
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Validate form
    if (validateForm()) {
      // Simulate login process
      loginBtn.textContent = "Logging in..."
      loginBtn.disabled = true

      // Simulate API call with timeout
      setTimeout(() => {
        // In a real application, you would send the credentials to a server
        // and handle the response accordingly

        // For this example, we'll just redirect to the account page
        window.location.href = "account.html"
      }, 1500)
    }
  })

  // Handle forgot password link
  forgotPasswordLink.addEventListener("click", (e) => {
    e.preventDefault()

    // In a real application, you would redirect to a password reset page
    // or show a modal for password reset

    // For this example, we'll just show an alert
    alert("Password reset functionality would be implemented here.")
  })

  // Form validation function
  function validateForm() {
    let isValid = true

    // Validate email/phone
    if (!emailPhoneInput.value.trim()) {
      showError(emailPhoneInput, "Email or phone number is required")
      isValid = false
    } else {
      removeError(emailPhoneInput)
    }

    // Validate password
    if (!passwordInput.value.trim()) {
      showError(passwordInput, "Password is required")
      isValid = false
    } else if (passwordInput.value.length < 6) {
      showError(passwordInput, "Password must be at least 6 characters")
      isValid = false
    } else {
      removeError(passwordInput)
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

  // Add input event listeners for real-time validation
  emailPhoneInput.addEventListener("input", function () {
    if (this.value.trim()) {
      removeError(this)
    }
  })

  passwordInput.addEventListener("input", function () {
    if (this.value.trim() && this.value.length >= 6) {
      removeError(this)
    }
  })
})
