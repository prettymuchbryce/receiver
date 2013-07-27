> A simple and configurable deployment tool for github projects.


![](http://i.imgur.com/3D1ou4b.jpg)

# Receiver

##Is this for me ?
- You are using github to store your code
- You have a server somewhere that hosts your project
- You would like to push to github to deploy code to your server

##Instructions using [forever](https://github.com/nodejitsu/forever)

1. ssh into your box

2. `sudo npm install -g forever`

3. `git clone  http://www.github.com/you/yourapp`
	_note: If your repository is private, ensure you have associated your server's SSH key with your github account. See: https://help.github.com/articles/generating-ssh-keys_

4. `forever start yourapp/yourapp.js`

5. `git clone http://www.github.com/prettymuchbryce/receiver`

6. `cd receiver`

7. Edit receiver/config.json to specify the file system location of the git directories to pull.

8. `npm install`

9. `forever start receiver.js`

10. Input receiver as a service hook in your github project. (Settings -> Service Hooks -> Webhook URLs)

	example: http://www.mywebapp.com:3617/githook


11. Push to github to deploy.
