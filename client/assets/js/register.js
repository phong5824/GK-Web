document.addEventListener('DOMContentLoaded', function () {
    var signupButton = document.querySelector('#btn-signup');
    var loginButton = document.querySelector('#btn-nav-login');

    loginButton.addEventListener('click', function () {
        // Set a flag or store information indicating the login button has been clicked
        document.cookie = 'loginButtonClicked=true; path=/'; // Example using cookie
    });


    signupButton.addEventListener('click', function () {
        var name = document.querySelector('#name').value;
        var email = document.querySelector('#email').value;
        var password = document.querySelector('#password').value;
        var confirmPassword = document.querySelector('#confirmPassword').value;

        // Kiểm tra xác nhận mật khẩu
        if (password !== confirmPassword) {
            showToast("Passwords do not match!");
            return;
        }

        // Gửi yêu cầu đăng ký
        $.ajax({
            url: "/account/register",
            method: "POST",
            data: { name: name, email: email, password: password },
            success: function (response) {
                // Xử lý phản hồi từ server
                console.log(response);
                if (response.success) {
                    showToast("Create account success!!!");

                    // Nếu đăng ký thành công, lưu token vào cookie
                    document.cookie = "token=" + response.accessToken + "; path=/;";
                    // Redirect đến trang sau khi đăng ký thành công (nếu cần)
                    window.location.href = "/home";
                } else if (response.message === "Email already registered") {
                    showToast("Email already registered. Please use a different email.");
                }
            },
            error: function (xhr, status, error) {
                console.error("Failed to register:", error);
                showToast("Failed to register. Please try again.");
            }
        });
    });
});

