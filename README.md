# Project Structure 
The structure of this project has been designed to consider scalability and the probablility of having multiple modules in the future, so it has been divided into:

1- **CoreModule**: it includes

  - Core components like (header, layout).

  - Core services like (apiService, userService).

  - Interceptors like (ApiCachingInterceptor).

  - Core models like (UserModel).


2- **FeatureModule**: it includes all the modules that should be implemented in the whole app, for now we have only one module, PostsModule which includes the posts and comments components.


3- SharedModule: it includes any shared (modules, components, directives.. or pipes) and for now it has only the LimitCharactersPipe.


# Project Structure 
I have tested the performance on serveral websites and got a performance of **95 to 99**, Accessibility and Best Practices of **100**.


# Unit Testing 
Depending on implemented tests and the code coverage statistics I have covered the following: 
Navbar(100%), HomeComponent(93.75%), CommentsComponent(100%), LimitCharactersPipe(100%).
