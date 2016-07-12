#Tablestorage log query#
Extremely simple utility for directly query table storage for logs and pretty printing the output


##Pre-reqs##
1. You will need node and npm installed
2. clone the Repo
3. run 
    
    npm install

I would also suggest installing Cmder (below using choco)

    @powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin
    choco install cmder

##Usage##
Reads a config file for table storage settings. If you do not have one run 

    node initconfig.js
    
Then populate the place holders in the json file. This config is seperate so you do not check in the keys to source control. The config.json file is explicity ignored in the .gitignore file.

Once config is setup you should be able to run

    node get-logs.js --color y | more
    
##Notes##
Many assumptions made for printing output based on log format