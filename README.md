> A simple deployment tool that sits on your server and keeps your repositories up to date.


![](http://i.imgur.com/3D1ou4b.jpg)

# Receiver

##Is this for me ?
- You are using github to store your code
- You have a server somewhere that hosts your project
- You would like to push to github, and see the changes live on your server

##Detailed instructions using forever

1. ssh into your box

2. `npm install -g forever`

3. `forever start yourapp.js`

4. git clone http://www.github.com/prettymuchbryce/receiver

5. Edit receiver/config.json to specify the file system location of the git directories to pull.

6. `forever start receiver/receiver.js`


7. Input receiver as a service hook in your github project. (Settings -> Service Hooks -> Webhook URLs)

	example: http://www.mywebapp.com:3617/gitpush


8. Push to github to deploy.