#Github Code Management

1. Create a new branch named named by developer from development-environment branch.
> Developer named "John Smith" can name the branch something like "JohnSmith" or "JohnS"  
  "git branch 'Name of branch'" command will create a new branch for you  
   "git checkout 'Name of branch' command will switch from the current branch to the new one (The one you named on checkout)  
 or you can do "git checkout -b 'Name of branch'" to create a new branch with that name and go there after creating it.

2. Before development, pull latest code from the development-environment branch.
>"git pull" will download all the latest/updated code in the repository.

3. After finishing your development and testing, push your code back to the branch named by yourself. 

  >**DO NOT DO "git add ."**(on the main folder) This command will add all the folders/code which can lead to a lot of conflicts during the merging.  
Instead go to specific location of the folder you want to deploy and then you can add everything with "git add ." or you can select a single file with **"git add 'The name of the file.(extension)'"**. You can repeat the same process till you add all the components you wish to push.  
After you add all the files that you need to deploy,**"git commit -m 'message'"** will be the next command to do. Keep in mind that the message should be very descriptive so other developers can understand what are you trying to commit. Something like "Updated the Landing Page design" or "Fixed x bug" can be really helpful.  
Now the last step is to push it to the repository, with **"git push"**
4. Send a pull request to development-environment and add your advisor as reviewer.
>It is a good idea to send a message on slack as well to let everyone for this update.
