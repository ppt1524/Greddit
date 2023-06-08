# DASS Assignement 2
## Name - Pratham Priyank Thakkar
## Roll Number - 2021101077

### Assumptions : 
- For Docker Code, the submission has slight change from the specified submission format and the required docker files are also submitted.
- In Followers and Following instead of User Name the email id of the users is displayed because as we were guided email id are distinct for each user and not User Name.
- In Users in Sub Greddit Page in unblocked users simply the People array is displayed and on blocking user that user is removed from unblocked array and from people array, hence on blocking the person is removed from the subgreddit. But the user will always have an option to send join request again.
- Sorting based on joined button is done only when no other sorting is applied with it.
- Different page is shown in My Subgreddit and Subgreddit. Post functionality is given only in Subgreddit even to the moderator. 
- In Banned keywords and Tags for multiple input each input is assumed to be comma seperated.
- For frontend the following template is used for referance (instead of using anything like bootstrap or any other library for template) : `https://reactjsexample.com/whistle-blower-an-anonymous-social-media-like-reddit-where-people-can-login-and-post-any-news-related-to-world-news/`


### For Starting the app :
- Frontend : npm start (`Runs on port 3000`)
- Backend : npm run dev (`Runs on port 5000`)

- For making docker image : `docker-compose up` in parent directory
