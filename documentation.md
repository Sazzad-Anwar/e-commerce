# Login route for users

---

> Route: {{URL}}/api/v1/user/login

---

> Method: POST

---

> A successful response will have data object containing `accessToken`, `refreshToken` & `isLoggedIn` data

---

> A failed response will have failing `message` along with `status`, `code` & `isSuccess` data

# User Registration and send email while registered route

---

> Route: {{URL}}/api/v1/user/registration

---

> Method: POST

---

> A successful response will have data object containing `accessToken`, `refreshToken` & `isLoggedIn` data as shown in example response

---

> A failed response will have failing `message` along with `status`, `code` & `isSuccess` data as shown in example response

# User Details Update

This route will do the user details update and requires `JWT` access token with bearer in headers as `accesstoken (in headers) or accessToken(in cookies)` to make the request.

---

> Route: {{URL}}/api/v1/user/details

---

> Method: PUT

---

> Protected Route: Need Access Token in headers or cookies

---

> A successful response will have data object containing `accessToken`, `refreshToken` & `isLoggedIn` data as shown in example response

---

> A failed response will have failing `message` along with `status`, `code` & `isSuccess` data as shown in example response

# User Activation

After registration a user will get an activation code in his provided email to activate his account

---

> Route: {{URL}}/api/v1/user/activate/:\_id/:activationId

---

> Method: GET

---

> A successful response will have user activated `message` along with `status`, `code` & `isSuccess` data as shown in example response

---

> A failed response will have failing `message` along with `status`, `code` & `isSuccess` data as shown in example response

# Get User Details

This request will come with user's full details in response and requires `JWT` access token with bearer in headers as `accesstoken (in headers) or accessToken(in cookies)` to make the request.

---

> Route: {{URL}}/api/v1/user/details

---

> Method: GET

---

> Protected Route: Need Access Token in headers or cookies

---

> A successful response will have user activated `message` along with `status`, `code` & `isSuccess` data as shown in example response

---

> A failed response will have failing `message` along with `status`, `code` & `isSuccess` data as shown in example response

# Get Password Reset Link To Update Password

This route will generate a password reset temporary link which will be validate only for five minutes and this link will be sent to user's email.

---

> Route: {{URL}}/api/v1/user/password/reset

---

> Method: POST

---

> A successful response will have password reset link sent in email in `message`, `data` object containing `passwordResetLink`, `expiresIn` along with `status`, `code` & `isSuccess` data as shown in example response

---

> A failed response will have failing `message` along with `status`, `code` & `isSuccess` data as shown in example response

# Update Password

This route will update the user's password while taking the user's id, password reset id, password as body parameter.

---

> Route: {{URL}}/api/v1/user/password/reset

---

> Method: POST

---

> A successful response will have user activated `message` along with `status`, `code` & `isSuccess` data as shown in example response

---

> A failed response will have failing `message` along with `status`, `code` & `isSuccess` data as shown in example response

# User Logout

This route will make a user to be logged out. This api needs access `JWT` token in the header or cookies as `accesstoken (in headers) or accessToken(in cookies)`.

---

> Route: {{URL}}/api/v1/user/password/reset

---

> Method: PUT

---

> Protected Route: Need Access Token in headers or cookies

---

> A successful response will have user activated `message` along with `status`, `code` & `isSuccess` data as shown in example response

---

> A failed response will have failing `message` along with `status`, `code` & `isSuccess` data as shown in example response

# Get Refresh Token

This route will give a new `accessToken` and `refreshToken` while the `accessToken` gets expired. This api needs `JWT` `refreshToken` token in the headers as `accesstoken (in headers)`.

---

> Route: {{URL}}/api/v1/user/refresh-token

---

> Method: POST

---

> Protected Route: Need Refresh Token in headers

---

> A successful response will have data object containing `accessToken`, `refreshToken` & `isLoggedIn` data as shown in example response

---

> A failed response will have failing `message` along with `status`, `code` & `isSuccess` data as shown in example response

# Add To Cart

This route will allow an authenticated user to add product to cart only. This api needs `JWT` `refreshToken` token in the headers as `accesstoken (in headers)`.

---

> Route: {{URL}}/api/v1/orders/cart

---

> Method: POST

---

> Protected Route: Need Refresh Token in headers

---

> A successful response will have data object containing the details of product data that has been added to cart as shown in example response

---

> A failed response will have failing `message` along with `status`, `code` & `isSuccess` data as shown in example response

# Update Cart

This route will allow an authenticated user to update product to cart only. This api needs `JWT` `refreshToken` token in the headers as `accesstoken (in headers)`.

---

> Route: {{URL}}/api/v1/orders/cart

---

> Method: PUT

---

> Protected Route: Need Refresh Token in headers

---

> A successful response will have data object containing the details of product data that has been added to cart as shown in example response

---

> A failed response will have failing `message` along with `status`, `code` & `isSuccess` data as shown in example response

# Get All Cart Products

This route will allow an authenticated user to get all products cart only. This api needs `JWT` `refreshToken` token in the headers as `accesstoken (in headers)`.

---

> Route: {{URL}}/api/v1/orders/cart

---

> Method: GET

---

> Protected Route: Need Refresh Token in headers

---

> A successful response will have data array containing the details of products data that has been added to cart as shown in example response

---

> A failed response will have failing `message` along with `status`, `code` & `isSuccess` data as shown in example response

# Delete Product From Cart

This route will allow an authenticated user to remove products from cart only. This api needs `JWT` `refreshToken` token in the headers as `accesstoken (in headers)`.

---

> Route: {{URL}}/api/v1/orders/cart/:id

---

> Method: DELETE

---

> Protected Route: Need Refresh Token in headers

---

> A successful response will have product removed form cart `message` along with `status`, `code` & `isSuccess` data as shown in example response

---

> A failed response will have failing `message` along with `status`, `code` & `isSuccess` data as shown in example response

# Add Category

This route will allow an authenticated vendor to add product categories. This api needs `JWT` `refreshToken` token in the headers as `accesstoken (in headers)`.

---

> Route: {{URL}}/api/v1/category

---

> Method: POST

---

> Protected Route: Need Refresh Token in headers

---

> A successful response will have an object containing inserted category along with `status`, `code` & `isSuccess` data as shown in example response

---

> A failed response will have failing `message` along with `status`, `code` & `isSuccess` data as shown in example response

# Update Category

This route will allow an authenticated vendor to update product categories. This api needs `JWT` `refreshToken` token in the headers as `accesstoken (in headers)`.

---

> Route: {{URL}}/api/v1/category

---

> Method: PUT

---

> Protected Route: Need Refresh Token in headers

---

> A successful response will have an object containing updated category along with `status`, `code` & `isSuccess` data as shown in example response

---

> A failed response will have failing `message` along with `status`, `code` & `isSuccess` data as shown in example response

# Get Category

This route will allow all user to get product categories.

---

> Route: {{URL}}/api/v1/category

---

> Method: GET

---

> A successful response will have an array containing all categories along with `status`, `code` & `isSuccess` data as shown in example response. To get a specific category set `category` or `subCategory` or `item` or all as `query parameter` as shown in example.

---

> A failed response will have failing `message` along with `status`, `code` & `isSuccess` data as shown in example response

# Set Shipping Address to order

This route will allow an authenticated user to update the shipping address of the order. This api needs `JWT` `refreshToken` token in the headers as `accesstoken (in headers)`.

---

> Route: {{URL}}/orders/addShippingAddress/:orderId

---

> Method: PUT

---

> A successful response will have an object containing order data along with `status`, `code` & `isSuccess` data as shown in example response.

---

> A failed response will have failing `message` along with `status`, `code` & `isSuccess` data as shown in example response

# Update Payment Status

This route will allow an authenticated user to update the payment details of the order. This api needs `JWT` `refreshToken` token in the headers as `accesstoken (in headers)`.

---

> Route: {{URL}}/orders/payment/:orderId

---

> Method: PUT

---

> A successful response will have an object containing order data along with `status`, `code` & `isSuccess` data as shown in example response.

---

> A failed response will have failing `message` along with `status`, `code` & `isSuccess` data as shown in example response

# Update Shipping Status

This route will allow an authenticated vendor to update the shipping status of the order. This api needs `JWT` `refreshToken` token in the headers as `accesstoken (in headers)`.

---

> Route: {{URL}}/orders/updateShippingStatus/:orderId

---

> Method: PUT

---

> A successful response will have an object containing order data along with `status`, `code` & `isSuccess` data as shown in example response.

---

> A failed response will have failing `message` along with `status`, `code` & `isSuccess` data as shown in example response

# Ask for refund

This route will allow an authenticated user to ask for refund of a delivered product. This api needs `JWT` `refreshToken` token in the headers as `accesstoken (in headers)`.

---

> Route: {{URL}}/orders/:orderId/refund

---

> Method: PUT

---

> A successful response will have an object containing order data along with `status`, `code` & `isSuccess` data as shown in example response.

---

> A failed response will have failing `message` along with `status`, `code` & `isSuccess` data as shown in example response
