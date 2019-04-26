#Tardygram ToDo

## ToDo List
  * `GET /threads/:id`
    * responds with a post by id
    * should include the populated user
    * should include all comments associated with the post (populated with commenter)
    * HINT: You'll need to make two separate queries and a `Promise.all`
  * BONUS:
    * `GET /users/popular`
      * respond with the 10 users with the most total comments on their posts
    * `GET /users/prolific`
      * respond with the 10 users with the most posts
    * `GET /users/leader`
      * respond with the 10 users with the most comments
    * `GET /users/impact`
      * respond with the 10 users with the most average comments per post


## Other things?
  * Refactor tests to be pretty (Async Await)


