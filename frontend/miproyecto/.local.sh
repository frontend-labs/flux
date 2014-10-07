#!/bin/bash

HOME_PATH="~/";
RESOURCES_PATH="resources/";
CURRENT_PATH=${PWD#*/};
VH_PATH="vhost/"
FILE_NAME="local.flux.pe";
USER=${username-`whoami`};

# Ampliando el maximo de archivos a observar
#echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p;

# creando la configuracion local
cp gulp/config.local.js.dist gulp/config.local.js;

# copiando vhost
sudo cp "/$CURRENT_PATH/$RESOURCES_PATH$VH_PATH$FILE_NAME" /etc/apache2/sites-available/$FILE_NAME;

sudo chmod 777 "/etc/apache2/sites-available/$FILE_NAME";

exit;

# cambiando el user por default
grep -rl "frontend" "/etc/apache2/sites-available/$FILE_NAME" | xargs sed -i "s/frontend/$USER/g";

# agregando el dominio en /etc/hosts
sudo echo "127.0.0.1 $FILE_NAME" >> /etc/hosts;

# habilitando el nuevo dominio
sudo a2ensite "$FILE_NAME";

# reiniciando apache
sudo service apache2 restart;



if [[ -f gulp/config.local.js ]]; then
	echo "Su configuración local se ha instalado.";
fi
