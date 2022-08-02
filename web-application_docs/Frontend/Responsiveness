//http://tmpvar.com/markdown.html
# Responsiveness

## Common mistakes: 

**Width**: Making the width 100vw means that you are making the width of the component 100% of the screen width. Despite the fact that VW can be useful in certain scenarios, it can ruin the responsiveness of the component. 
> Example  
> ![alt text](image.jpg)  
 
We want the component to use the full width of the screen. If we use 100vw, the component will use all the pixels of the screen, but since the scroll bar on the right will take a certain amount of the pixels, the component will still have need all the pixels, resulting to a horizontal scrollbar in the bottom.
> ![alt text](image.jpg)    

In out case it would be better to use 100%, meaning it will take 100% of the available space.
> ![alt text](image.jpg)    

**Pixels**: Using pixels is a good way to set how big or small a component should be. But that doesn't mean we should use them all the time. The problem with pixels shows when the amount of pixels set exceeds the amount of pixels on the screen.
> ![alt text](image.jpg)    


Over here we have a mat grid list with a padding of 200px for its width, and a margin left and right for a total of 300px. In most smartphones (**NOT ALL**), 300 pixels is enough, but it can happen something like 2 mat grid lists on the same block, which leads to a 200px+200px and 50px left and right with a total of 500px, which will ruin the responsiveness of all the mobile views. So it is a good idea to use % signs.

**Naming** Setting good names for your variables, classes, ids is a must. Not only for you to understand what are you coding, but even for other developers to have an easier time reading it. In angular though, in some component it is even more important, because that component can conflict with another one. The majority of those components are the ones that are called multiple times (in different pages). 
> For example a footer or nav bar. If the page you call this components have the same naming in classes/ids or both, the first css style will overwrite the second one, leading to a lot of errors and problems.

Having good naming in this components will give you and others easier time later on. We can use an id/class for all of them with an extension that will remove the duplicate naming.
>A class named "header" can easily placed as "navheader" or "header_nav" or anything that can make it unique. 
